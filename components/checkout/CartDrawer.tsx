"use client";
import React from "react";
import Link from "next/link";
import { usecart } from "./CartContent";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    totalItemCount,
    subtotal,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = usecart();

  if (!isCartOpen) return null;

  return (
    // FIX: Changed z-0 to z-50 so the cart sits on top of your layout
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/*overlay*/}
      <div
        className="absolute inset-0 bg-black/30 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/*slide over*/}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* FIX: Removed premature </div> closing tag and fixed typo border-l */}
        <div className="w-screen max-w-md bg-surface text-link shadow-xl flex flex-col border-l border-line">
          {/*header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-line">
            <h2 className="font-serif text-lg uppercase tracking-wider">
              Your Bag {totalItemCount}
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-xs uppercase tracking-wider text-ink-muted hover:text-ink cursor-pointer border-r-4"
            >
              close
            </button>
          </div>

          {/*list */}
          {/* FIX: Changed felx-1 to flex-1 and over-flow-y-auto to overflow-y-auto */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-line-soft">
            {cartItems.length === 0 ? (
              <p className="text-sm text-ink-muted text-center py-12">
                Your Bag is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex justify-between items-start"
                >
                  <div>
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {item.variant}
                    </p>
                    {/*controllers */}
                    <div className="flex items-center space-x-3 mt-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-6 h-6 border border-field bg-surface flex items-center justify-center text-xs hover:border-brand cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-6 h-6 border border-field bg-surface flex items-center justify-center text-xs hover:border-brand cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-medium">
                      ${item.quantity * item.price}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="block text-sm text-[#885544] hover:underline mt-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/*bottom */}
          {cartItems.length > 0 && (
            <div className="border-t border-line p-6 bg-surface-cream space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-ink-muted">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <p className="text-xs text-ink-muted">
                Shipping and Tax calculated at the checkout
              </p>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full bg-brand text-white py-4 text-center text-xs uppercase tracking-widest hover:bg-[#3D2615] transition-colors"
              >
                Proceed to checkout-${subtotal}
              </Link>
            </div>
          )}
        </div>{" "}
        {/* FIX: The main drawer background div properly closes here now */}
      </div>
    </div>
  );
}
