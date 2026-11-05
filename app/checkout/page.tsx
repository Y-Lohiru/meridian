// app/checkout/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { CartProvider } from "@/components/checkout/CartContent";
import CartDrawer from "@/components/checkout/CartDrawer";
import { usecart } from "@/components/checkout/CartContent";

export default function CheckoutPage() {
  const { setIsCartOpen } = usecart();
  const [promo, setPromo] = useState("");
  const {
    cartItems,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = usecart();

  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const deliveryCost =
    deliveryMethod === "express"
      ? 25
      : deliveryMethod === "white-glove"
        ? 95
        : 0;
  const grandTotal = subtotal + deliveryCost;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#332218] font-sans">
      {/* Top Bar / Header */}
      <header className="border-b border-[#E5E0D8] px-8 py-6 flex justify-between items-center bg-[#FBF9F5]">
        <Link href="/" className="font-serif tracking-widest text-xl uppercase">
          MERIDIAN
        </Link>

        <span className="text-xs uppercase tracking-wider text-[#77665B]">
          Secure Checkout
        </span>
      </header>

      {/* Main Checkout Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 lg:px-12 py-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            grandTotal={grandTotal}
          />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-[#F2EFE9] p-8 h-fit border border-[#E5E0D8] space-y-6">
          <div className="flex justify-between items-center border-b border-[#E5E0D8] pb-4">
            <h3 className="font-serif text-lg">Your bag</h3>
            <span className="text-xs tracking-wider uppercase text-[#77665B]">
              {totalItemsCount} items
            </span>
          </div>

          {/* Cart Item List */}
          <div className="divide-y divide-[#E5E0D8]">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="py-4 flex justify-between items-start"
              >
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-[#77665B] mt-0.5">
                    {item.variant}
                  </p>
                  <div className="flex items-center space-x-3 mt-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-6 h-6 border border-[#DCD6CE] bg-white flex items-center justify-center text-xs hover:border-[#332218] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-6 h-6 border border-[#DCD6CE] bg-white flex items-center justify-center text-xs hover:border-[#332218] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">${item.price}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="block text-xs text-[#885544] hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code Input */}
          <div className="flex space-x-2 pt-2">
            <input
              type="text"
              placeholder="Promo or gift card"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="flex-1 bg-white border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
            />
            <button className="bg-[#332218] text-white px-5 text-xs uppercase tracking-wider">
              Apply
            </button>
          </div>

          {/* Cost Totals */}
          <div className="space-y-3 pt-4 border-t border-[#E5E0D8] text-sm">
            <div className="flex justify-between">
              <span className="text-[#77665B]">Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77665B]">Delivery</span>
              <span>
                {deliveryCost === 0 ? "Complimentary" : `$${deliveryCost}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77665B]">Tax</span>
              <span className="text-xs text-[#77665B]">
                Calculated with address
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t border-[#E5E0D8] font-serif text-lg">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>

          {/* Footer Info inside Summary */}
          <div className="pt-6 border-t border-[#E5E0D8] text-xs text-[#77665B] space-y-2">
            <p>↺ Free returns within 30 days</p>
            <p>📞 Questions? Our concierge is on-call 7 days a week</p>
          </div>
        </div>
      </main>
    </div>
  );
}
