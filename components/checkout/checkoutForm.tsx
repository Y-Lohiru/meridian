// components/checkout/checkoutform.tsx
"use client";
import React, { useState, useRef } from "react";
import Button from "./Button";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully with Meridian!Total: $${grandTotal}");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 text-[#332218]">
      {/* 01 Contact */}
      <section className="space-y-4">
        <h2 className="text-lg font-serif border-b border-[#E5E0D8] pb-3">
          <span className="text-xs font-sans tracking-widest text-[#77665B] block mb-1">
            01
          </span>
          Contact
        </h2>
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
            Email address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
          />
        </div>
        <div className="flex items-center space-x-3 pt-1">
          <input
            type="checkbox"
            name="emailUpdates"
            id="emailUpdates"
            checked={formData.emailUpdates}
            onChange={handleChange}
            className="w-4 h-4 accent-[#332218]"
          />
          <label htmlFor="emailUpdates" className="text-sm text-[#55443B]">
            Email me about new collections and private sales
          </label>
        </div>
      </section>

      {/* 02 Delivery Address */}
      <section className="space-y-4">
        <h2 className="text-lg font-serif border-b border-[#E5E0D8] pb-3">
          <span className="text-xs font-sans tracking-widest text-[#77665B] block mb-1">
            02
          </span>
          Delivery address
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="Street and house number"
            className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
            Apartment, suite (optional)
          </label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
            >
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Singapore">Singapore</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
              Postcode
            </label>
            <input
              type="text"
              name="postcode"
              required
              value={formData.postcode}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#77665B] mb-2">
            Phone, for delivery updates
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+94 77 123 4567"
            className="w-full bg-transparent border border-[#DCD6CE] p-3 text-sm focus:outline-none focus:border-[#332218]"
          />
        </div>
      </section>

      {/* 03 Delivery Method */}
      <section className="space-y-4">
        <h2 className="text-lg font-serif border-b border-[#E5E0D8] pb-3">
          <span className="text-xs font-sans tracking-widest text-[#77665B] block mb-1">
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
                  ? "border-[#332218] bg-[#F4F1EA]"
                  : "border-[#DCD6CE]"
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={method.id}
                  checked={deliveryMethod === method.id}
                  onChange={() => setDeliveryMethod(method.id)}
                  className="accent-[#332218]"
                />
                <span className="text-sm font-medium">{method.name}</span>
              </div>
              <span className="text-sm text-[#77665B]">{method.price}</span>
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
            className="w-4 h-4 accent-[#332218]"
          />
          <label htmlFor="giftWrap" className="text-sm text-[#55443B]">
            Gift-wrap this order in the Meridian black box — complimentary
          </label>
        </div>
      </section>

      {/* 04 Payment */}
      <section className="space-y-4">
        <h2 className="text-lg font-serif border-b border-[#E5E0D8] pb-3">
          <span className="text-xs font-sans tracking-widest text-[#77665B] block mb-1">
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
                  ? "border-[#332218] bg-[#F4F1EA]"
                  : "border-[#DCD6CE]"
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={pay.id}
                  checked={formData.paymentMethod === pay.id}
                  onChange={handleChange}
                  className="accent-[#332218]"
                />
                <span className="text-sm font-medium">{pay.title}</span>
              </div>
              <p className="text-xs text-[#77665B] mt-1 ml-7">{pay.desc}</p>
            </label>
          ))}
        </div>

        {(formData.paymentMethod === "cod" && (
          <div className="bg-[#F4F1EA] p-4 text-xs text-[#66554A] space-y-1">
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
            <div className="bg-[#F4F1EA] p-4 text-xs text-[#66554A] space-y-1">
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
        <Button type="submit" fullWidth>
          Place Order — ${grandTotal}
        </Button>
        <p className="text-xs text-center text-[#77665B] mt-3">
          By placing your order you agree to our Terms of Sale and Privacy
          Policy
        </p>
      </div>
    </form>
  );
}
