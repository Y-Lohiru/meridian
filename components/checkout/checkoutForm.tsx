// components/checkout/checkoutform.tsx
"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import Button from "./Button";
import { usecart } from "./CartContent";
import { placeOrder } from "./orderActions";

interface CheckoutFormProps {
  deliveryMethod: string;
  setDeliveryMethod: (method: string) => void;
  grandTotal: number;
}

export default function CheckoutForm({
  deliveryMethod,
  setDeliveryMethod,
  grandTotal,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    emailUpdates: true,
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Sri Lanka",
    postcode: "",
    phone: "",
    deliveryMethod: "standard",
    giftWrap: false,
    paymentMethod: "cod",
  });

  //formh
  const router = useRouter();

  const { cartItems, isCartLoading, refreshCart } = usecart();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitError(null);

    if (isCartLoading) {
      return;
    }

    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send checkout form information
      // to the frontend order function

      const result = await placeOrder({
        email: formData.email,

        firstName: formData.firstName,

        lastName: formData.lastName,

        address: formData.address,

        apartment: formData.apartment,

        city: formData.city,

        country: formData.country,

        postcode: formData.postcode,

        phone: formData.phone,

        deliveryMethod: deliveryMethod,

        paymentMethod: formData.paymentMethod,

        giftWrap: formData.giftWrap,
      });

      console.log("Order successfully created:", result.orderId);

      // Refresh React cart state
      // The database trigger has cleared the cart.

      await refreshCart().catch((error) => {
        console.error("Cart refresh failed:", error);
      });

      // Navigate to success page
      router.push(
        `/order-success?orderId=${encodeURIComponent(result.orderId)}`,
      );
    } catch (error) {
      console.error("Checkout error:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while placing your order.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 text-ink">
      {submitError && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 p-4 text-sm"
          role="alert"
        >
          {submitError}
        </div>
      )}
      {/* 01 Contact */}
      <section className="space-y-4">
        <h2 className="text-lg font-display border-b border-line pb-3">
          <span className="text-xs font-sans tracking-eyebrow text-ink-subtle block mb-1">
            01
          </span>
          Contact
        </h2>
        <div>
          <label className="block eyebrow text-ink-subtle mb-2">
            Email address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
          />
        </div>
        <div className="flex items-center space-x-3 pt-1">
          <input
            type="checkbox"
            name="emailUpdates"
            id="emailUpdates"
            checked={formData.emailUpdates}
            onChange={handleChange}
            className="w-4 h-4 accent-brand"
          />
          <label htmlFor="emailUpdates" className="text-sm text-ink-muted">
            Email me about new collections and private sales
          </label>
        </div>
      </section>

      {/* 02 Delivery Address */}
      <section className="space-y-4">
        <h2 className="text-lg font-display border-b border-line pb-3">
          <span className="text-xs font-sans tracking-widest text-ink-subtle block mb-1">
            02
          </span>
          Delivery address
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block eyebrow text-ink-subtle mb-2">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="block eyebrow text-ink-subtle mb-2">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div>
          <label className="block eyebrow text-ink-subtle mb-2">Address</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="Street and house number"
            className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
          />
        </div>

        <div>
          <label className="block eyebrow text-ink-subtle mb-2">
            Apartment, suite (optional)
          </label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block eyebrow text-ink-subtle mb-2">City</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="block eyebrow text-ink-subtle mb-2">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
            >
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Singapore">Singapore</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          <div>
            <label className="block eyebrow text-ink-subtle mb-2">
              Postcode
            </label>
            <input
              type="text"
              name="postcode"
              required
              value={formData.postcode}
              onChange={handleChange}
              className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div>
          <label className="block eyebrow text-ink-subtle mb-2">
            Phone, for delivery updates
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+94 77 123 4567"
            className="w-full bg-transparent border border-line p-3 text-sm focus:outline-none focus:border-brand"
          />
        </div>
      </section>

      {/* 03 Delivery Method */}
      <section className="space-y-4">
        <h2 className="text-lg font-display border-b border-line pb-3">
          <span className="text-xs font-sans tracking-widest text-ink-subtle block mb-1">
            03
          </span>
          Delivery method
        </h2>
        <div className="space-y-3">
          {[
            {
              id: "standard",
              name: "Standard (3-5 working days)",
              price: "Complimentary",
            },
            {
              id: "express",
              name: "Express (Next working day, order by 2pm)",
              price: "$25",
            },
            {
              id: "white-glove",
              name: "White-glove (Two-person, unpacked and placed)",
              price: "$95",
            },
          ].map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                deliveryMethod === method.id
                  ? "border-brand bg-surface-selected"
                  : "border-line"
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={method.id}
                  checked={deliveryMethod === method.id}
                  onChange={() => setDeliveryMethod(method.id)}
                  className="accent-brand"
                />
                <span className="text-sm font-medium">{method.name}</span>
              </div>
              <span className="text-sm text-ink-subtle">{method.price}</span>
            </label>
          ))}
        </div>

        {/* Gift-wrap option */}
        <div className="flex items-center space-x-3 pt-2">
          <input
            type="checkbox"
            name="giftWrap"
            id="giftWrap"
            checked={formData.giftWrap}
            onChange={handleChange}
            className="w-4 h-4 accent-brand"
          />
          <label htmlFor="giftWrap" className="text-sm text-ink-muted">
            Gift-wrap this order in the Meridian black box — complimentary
          </label>
        </div>
      </section>

      {/* 04 Payment */}
      <section className="space-y-4">
        <h2 className="text-lg font-display border-b border-line pb-3">
          <span className="text-xs font-sans tracking-widest text-ink-subtle block mb-1">
            04
          </span>
          Payment
        </h2>
        <div className="space-y-3">
          {[
            {
              id: "cod",
              title: "Cash on delivery",
              desc: "Pay the courier in cash when your order arrives",
            },
            {
              id: "bank",
              title: "Bank transfer",
              desc: "Transfer to our account, then upload your receipt",
            },
          ].map((pay) => (
            <label
              key={pay.id}
              className={`block p-4 border cursor-pointer transition-all ${
                formData.paymentMethod === pay.id
                  ? "border-brand bg-surface-selected"
                  : "border-line"
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={pay.id}
                  checked={formData.paymentMethod === pay.id}
                  onChange={handleChange}
                  className="accent-brand"
                />
                <span className="text-sm font-medium">{pay.title}</span>
              </div>
              <p className="text-xs text-ink-subtle mt-1 ml-7">{pay.desc}</p>
            </label>
          ))}
        </div>

        {(formData.paymentMethod === "cod" && (
          <div className="bg-surface-selected p-4 text-xs text-ink-muted space-y-1">
            <p>
              • We&apos;ll call or text the phone number above to confirm your
              order before we dispatch it.
            </p>
            <p>
              • Pay the courier in cash when your order arrives. Please have the
              exact amount ready.
            </p>
          </div>
        )) ||
          (formData.paymentMethod === "bank" && (
            <div className="bg-surface-selected p-4 text-xs text-ink-muted space-y-1">
              <p>Uplaod the recipt of the bank transfer</p>
              <p>Bank Names-***********</p>
              <p>Bank Accounts NUmbers-***********</p>
              {/* Hidden native file input tied to useRef */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf"
              />

              {/* Custo Button that triggers the hidden input */}
              <Button
                type="button"
                variant="secondary"
                onClick={handleButtonClick}
                fullWidth
              >
                {receiptFile
                  ? `Selected: ${receiptFile.name}`
                  : "Upload Receipt"}
              </Button>
            </div>
          ))}
      </section>

      {/* Submit CTA */}
      <div className="pt-4">
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting || isCartLoading || cartItems.length === 0}
        >
          {isSubmitting ? "Placing Order..." : `Place Order — $${grandTotal}`}
        </Button>
        <p className="text-xs text-center text-ink-subtle mt-3">
          By placing your order you agree to our Terms of Sale and Privacy
          Policy
        </p>
      </div>
    </form>
  );
}
