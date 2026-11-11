"use client";

import { usecart } from "@/components/checkout/CartContent";

export default function TestCartPage() {
  // Extract the function to open the cart, and the items to see if state is working
  const { setIsCartOpen, cartItems } = usecart();

  return (
    <div
      style={{
        padding: "50px",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>Cart Debugger</h1>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>Cart Status:</strong>
        </p>
        <p>You currently have {cartItems?.length || 0} items in your cart.</p>
      </div>

      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          padding: "12px 24px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Click to Open Cart
      </button>
    </div>
  );
}
