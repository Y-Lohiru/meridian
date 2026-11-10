"use client";
import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
}
interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  totalItemCount: number;
  subtotal: number;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false); //
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Alabaster table lamp",
      variant: "Natural alabaster · Small",
      price: 540,
      quantity: 1,
    },
    {
      id: 2,
      name: "Merino herringbone throw",
      variant: "Charcoal · 130x180 cm",
      price: 280,
      quantity: 1,
    },
  ]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };
  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );
  };
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id != id));
  };
  const totalItemCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
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
  if (!context) throw new Error("put inside a<Cartprovider>");
  return context;
}
