"use-client";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { createClient } from "../../app/utils/supabase/client";
import { redirect } from "next/dist/client/components/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error logging in:", error);
    } else {
      console.log("User logged in successfully");
      return redirect(`/profile/`);
    }
  };
  return (
    <div>
      <div className="flex h-screen">
        <div
          className={`w-1/2 p-4 ${`bg-brand text-on-brand`} flex flex-col justify-between items-center`}
        >
          <h2 className="text-2xl text-left font-bold mb-4 inline-flex items-center gap-2">
            <img src="/logo.png" className="w-12"></img>MERIDIAN
          </h2>
          <div>
            <p className="font-sans">MERIDIAN MEMBERS</p>
            <br />
            <h1 className="font-display text-6xl italic ">
              Welcome Back. <br />
            </h1>
            <br />
            <p className="font-sans">
              Sign in to pick up where you left off — your bag, your wishlist
              and every order in one place.
            </p>
            <br />
            <p className="font-sans inline-flex items-center gap-2">
              <Check size={14} />
              Early access to new collections
            </p>
            <br />
            <p className="font-sans inline-flex items-center gap-2">
              <Check size={14} />
              Order tracking and one-click returns
            </p>
            <br />
            <p className="font-sans inline-flex items-center gap-2">
              <Check size={14} />
              Wishlists saved across devices
            </p>
          </div>
          <p className="text-left font-sans">&copy; 2026 Meridian</p>
        </div>

        <div className="max-w-2xl min-w-lg mx-auto p-4 flex flex-col justify-center font-sans ">
          <h3 className="text-2xl font-bold mb-4 font-display">Sign In</h3>
          <p className="font-sans mb-4">
            New to Meridian?{" "}
            <a
              href="/signup"
              className="text-bold font-sans  text-brand underline"
            >
              Sign up
            </a>
          </p>
          <form className="flex flex-col gap-" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="font-sans mb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input-box p-2"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mt-4 ">
              <label className="font-sans mb-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="input-box p-2"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <input type="checkbox" className="mt-4" required />{" "}
              <span className="font-sans">
                I agree to the{" "}
                <a
                  href="/Policies/terms"
                  className="text-bold font-sans  text-brand underline"
                >
                  Terms and Conditions
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="cursor-pointer text-sm bg-brand text-on-brand py-4 px-4 mt-4 hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              SIGN IN{" "}
            </button>
          </form>
          <p className="font-sans mt-6 text-sm text-center">
            Staff member?{" "}
            <a
              href="/admin"
              className="text-bold font-sans  text-brand underline"
            >
              Admin login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
