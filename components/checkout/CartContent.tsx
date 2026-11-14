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

  const cartDirty = useRef(true);

  const changeVersion = useRef(0);

  useEffect(() => {
    let active = true;
    let currentKey: string | null = null;

    const loadLocalCart = (userId?: string) => {
      const key = userId ? `meridian-cart-${userId}` : "meridian-cart-guest";

      if (currentKey === key) return;

      currentKey = key;

      try {
        let saved = localStorage.getItem(key);

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

  useEffect(() => {
    if (!cartReady || !storageKey) return;

    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, cartReady, storageKey]);

  const markCartDirty = () => {
    changeVersion.current += 1;
    cartDirty.current = true;
  };

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

  const increaseQuantity = (id: string) => {
    markCartDirty();

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

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

  const removeItem = (id: string) => {
    markCartDirty();

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const syncCartToDatabase = async () => {
    if (!cartReady) {
      throw new Error("Cart is still loading.");
    }

    if (!cartDirty.current) return;

    const versionAtStart = changeVersion.current;

    const snapshot: CartSyncItem[] = cartItems.map((item) => ({
      productId: item.productId,
      variant: item.variant,
      quantity: item.quantity,
    }));

    await saveCartSnapshot(snapshot);

    if (changeVersion.current === versionAtStart) {
      cartDirty.current = false;
    }
  };

  const clearCartAfterOrder = () => {
    changeVersion.current += 1;

    cartDirty.current = false;

    setCartItems([]);
  };

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
