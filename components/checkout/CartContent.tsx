"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { createClient } from "@/app/utils/supabase/client";

import {
  syncCartToDatabase as saveCartSnapshot,
  type CartSyncItem,
} from "./cartActions";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface AddCartItem {
  productId: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isCartLoading: boolean;
  totalItemCount: number;
  subtotal: number;

  setIsCartOpen: (open: boolean) => void;

  addToCart: (item: AddCartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;

  syncCartToDatabase: () => Promise<void>;
  clearCartAfterOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cartReady, setCartReady] = useState(false);

  const [storageKey, setStorageKey] = useState<string | null>(null);

  // Tracks whether local cart differs from the database
  const cartDirty = useRef(true);

  // Tracks changes during a database synchronization
  const changeVersion = useRef(0);

  // ----------------------------------
  // 1. Load cart from localStorage
  // ----------------------------------

  useEffect(() => {
    let active = true;
    let currentKey: string | null = null;

    const loadLocalCart = (userId?: string) => {
      const key = userId ? `meridian-cart-${userId}` : "meridian-cart-guest";

      if (currentKey === key) return;

      currentKey = key;

      try {
        let saved = localStorage.getItem(key);

        // Move a guest cart into the account's local cart
        // when the customer signs in for the first time.
        if (userId && saved === null) {
          const guestCart = localStorage.getItem("meridian-cart-guest");

          if (guestCart !== null) {
            saved = guestCart;
            localStorage.setItem(key, guestCart);
            localStorage.removeItem("meridian-cart-guest");
          }
        }

        const parsed = saved ? JSON.parse(saved) : [];

        if (active) {
          setCartItems(Array.isArray(parsed) ? parsed : []);

          setStorageKey(key);

          // Initial local snapshot must be synchronized
          // when the customer proceeds to checkout.
          cartDirty.current = true;
          changeVersion.current += 1;

          setCartReady(true);
          setIsCartLoading(false);
        }
      } catch (error) {
        console.error("Could not load local cart:", error);

        if (active) {
          setCartItems([]);
          setStorageKey(key);
          cartDirty.current = true;
          setCartReady(true);
          setIsCartLoading(false);
        }
      }
    };

    // Read existing authentication session.
    // No cart database query is performed here.

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active) {
          loadLocalCart(data.session?.user.id);
        }
      })
      .catch((error) => {
        console.error(error);

        if (active) {
          loadLocalCart();
        }
      });

    // Switch local cart when customer logs in or out.

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      loadLocalCart(session?.user.id);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // ----------------------------------
  // 2. Save local cart to localStorage
  // ----------------------------------

  useEffect(() => {
    if (!cartReady || !storageKey) return;

    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, cartReady, storageKey]);

  // ----------------------------------
  // 3. Mark cart as changed
  // ----------------------------------

  const markCartDirty = () => {
    changeVersion.current += 1;
    cartDirty.current = true;
  };

  // ----------------------------------
  // 4. Add product locally
  // ----------------------------------

  const addToCart = (item: AddCartItem) => {
    if (
      !item.productId ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      return;
    }

    const variant = item.variant || "";

    const cartId = `${item.productId}::${variant}`;

    markCartDirty();

    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === cartId);

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === cartId
            ? {
                ...cartItem,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem,
        );
      }

      return [
        ...prev,
        {
          id: cartId,
          productId: item.productId,
          name: item.name,
          variant,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        },
      ];
    });

    setIsCartOpen(true);
  };

  // ----------------------------------
  // 5. Increase quantity locally
  // ----------------------------------

  const increaseQuantity = (id: string) => {
    markCartDirty();

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // ----------------------------------
  // 6. Decrease quantity locally
  // ----------------------------------

  const decreaseQuantity = (id: string) => {
    const existing = cartItems.find((item) => item.id === id);

    if (!existing || existing.quantity <= 1) return;

    markCartDirty();

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  // ----------------------------------
  // 7. Remove product locally
  // ----------------------------------

  const removeItem = (id: string) => {
    markCartDirty();

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ----------------------------------
  // 8. Synchronize cart with Supabase
  // ----------------------------------

  const syncCartToDatabase = async () => {
    if (!cartReady) {
      throw new Error("Cart is still loading.");
    }

    // Avoid unnecessary database requests
    if (!cartDirty.current) return;

    const versionAtStart = changeVersion.current;

    // Take a snapshot of current cart
    const snapshot: CartSyncItem[] = cartItems.map((item) => ({
      productId: item.productId,
      variant: item.variant,
      quantity: item.quantity,
    }));

    // Save snapshot to Supabase
    await saveCartSnapshot(snapshot);

    // Mark clean only when no changes happened
    // while the database operation was running.

    if (changeVersion.current === versionAtStart) {
      cartDirty.current = false;
    }
  };

  // ----------------------------------
  // 9. Clear cart after successful order
  // ----------------------------------

  const clearCartAfterOrder = () => {
    changeVersion.current += 1;

    // The database cart is already cleared
    // by the existing order_product trigger.

    cartDirty.current = false;

    setCartItems([]);
  };

  // ----------------------------------
  // 10. Cart calculations
  // ----------------------------------

  const totalItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        isCartLoading,
        setIsCartOpen,

        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,

        syncCartToDatabase,
        clearCartAfterOrder,

        totalItemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function usecart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("usecart must be inside CartProvider");
  }

  return context;
}
