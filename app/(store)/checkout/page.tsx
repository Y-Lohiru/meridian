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
    <div className="min-h-screen bg-surface text-[#332218] font-sans">
      <header className="border-b border-line px-8 py-6 flex justify-between items-center bg-surface">
        <Link
          href="/"
          className="font-display tracking-widest text-xl uppercase"
        >
          MERIDIAN
        </Link>

        <span className="text-xs uppercase tracking-button text-ink-subtle">
          Secure Checkout
        </span>
      </header>

      <main className="max-w[85rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 lg:px-12 py-12">
        {/* Left */}
        <div className="lg:col-span-7">
          <CheckoutForm
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            grandTotal={grandTotal}
          />
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-surface-cream p-8 h-fit border border-line space-y-6">
          <div className="flex justify-between items-center border-b border-line pb-4">
            <h3 className="font-display text-lg">Your bag</h3>
            <span className="text-xs tracking-button uppercase text-ink-subtle">
              {totalItemsCount} items
            </span>
          </div>

          {/* Cartitms */}
          <div className="divide-y divide-line">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="py-4 flex justify-between items-start"
              >
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-ink-subtle mt-0.5">
                    {item.variant}
                  </p>
                  <div className="flex items-center space-x-3 mt-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-6 h-6 border border-line bg-surface flex items-center justify-center text-xs hover:border-brand cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-6 h-6 border border-line bg-surface flex items-center justify-center text-xs hover:border-brand cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">${item.price}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="block text-xs text-warning hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 
          <div className="flex space-x-2 pt-2">
            <input
              type="text"
              placeholder="Promo or gift card"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="flex-1 bg-surface border border-line p-3 text-sm focus:outline-none focus:border-brand"
            />
            <button className="bg-brand text-on-brand px-5 text-xs uppercase tracking-button">
              Apply
            </button>
          </div> */}

          {/* Totals */}
          <div className="space-y-3 pt-4 border-t border-line text-sm">
            <div className="flex justify-between">
              <span className="text-ink-subtle">Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-subtle">Delivery</span>
              <span>
                {deliveryCost === 0 ? "Complimentary" : `$${deliveryCost}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-subtle">Tax</span>
              <span className="text-xs text-ink-subtle">
                Calculated with address
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t border-line font-display text-lg">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-line text-xs text-ink-subtle space-y-2">
            <p>↺ Free returns within 30 days</p>
            <p>📞 Questions? Our concierge is on-call 7 days a week</p>
          </div>
        </div>
      </main>
    </div>
  );
}
