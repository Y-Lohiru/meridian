"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { createClient } from "@/app/utils/supabase/client";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface AddCartItem {
  productId: string;
  variant: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isCartLoading: boolean;
  totalItemCount: number;
  subtotal: number;

  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: AddCartItem) => Promise<void>;
  increaseQuantity: (id: string) => Promise<void>;
  decreaseQuantity: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  // Load cart rows from Supabase
  const refreshCart = useCallback(async () => {
    setIsCartLoading(true);

    try {
      const { data: rows, error: cartError } = await supabase
        .from("cart")
        .select("id, product_id, variant, quantity")
        .order("created_at", { ascending: true });

      if (cartError) throw cartError;

      if (!rows || rows.length === 0) {
        setCartItems([]);
        return;
      }

      // Get the corresponding product IDs
      const productIds = [...new Set(rows.map((row) => row.product_id))];

      // Fetch current product information
      const { data: products, error: productError } = await supabase
        .from("product")
        .select('id, "productName", price, image_url, variants')
        .in("id", productIds);

      if (productError) throw productError;

      const productMap = new Map(
        (products ?? []).map((product) => [product.id, product]),
      );

      // Combine cart data with product information
      const mappedItems: CartItem[] = rows.flatMap((row) => {
        const product = productMap.get(row.product_id);

        if (!product) return [];

        const variants = Array.isArray(product.variants)
          ? product.variants
          : [];

        const selectedVariant = variants.find(
          (variant) => variant.label === row.variant,
        );

        // Use the selected variant's price when available
        const price = Number(selectedVariant?.price ?? product.price);

        return [
          {
            id: row.id,
            productId: row.product_id,
            name: product.productName,
            variant: row.variant || "Default",
            price,
            quantity: row.quantity,
            imageUrl: product.image_url ?? "",
          },
        ];
      });

      setCartItems(mappedItems);
    } finally {
      setIsCartLoading(false);
    }
  }, [supabase]);

  // Load cart when the provider starts.
  // Also reload when the user signs in or out.
  useEffect(() => {
    refreshCart().catch((error) => {
      console.error("Failed to load cart:", error);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refreshCart().catch((error) => {
        console.error("Failed to refresh cart:", error);
      });
    });

    return () => subscription.unsubscribe();
  }, [supabase, refreshCart]);

  // Add product using PostgreSQL function
  const addToCart = async (item: AddCartItem) => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Please log in before adding products to your cart.");
    }

    const { error } = await supabase.rpc("add_to_cart", {
      p_product_id: item.productId,
      p_variant: item.variant,
      p_quantity: item.quantity,
    });

    if (error) throw error;

    await refreshCart();
    setIsCartOpen(true);
  };

  // Increase quantity
  const increaseQuantity = async (id: string) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;

    const { error } = await supabase
      .from("cart")
      .update({
        quantity: item.quantity + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Could not update cart quantity.");
      return;
    }

    await refreshCart();
  };

  // Decrease quantity
  const decreaseQuantity = async (id: string) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item || item.quantity <= 1) return;

    const { error } = await supabase
      .from("cart")
      .update({
        quantity: item.quantity - 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Could not update cart quantity.");
      return;
    }

    await refreshCart();
  };

  // Remove item
  const removeItem = async (id: string) => {
    const { error } = await supabase.from("cart").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Could not remove this product.");
      return;
    }

    await refreshCart();
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
        refreshCart,
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
