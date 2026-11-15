"use-client";
import { createClient } from "../../app/utils/supabase/client";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({
    length: false,
    uppercase: false,
    number: false,
  });
  React.useEffect(() => {
    if (password.length >= 8) {
      setErrors((prev) => ({ ...prev, length: false }));
    } else {
      setErrors((prev) => ({ ...prev, length: true }));
    }
    if (/[A-Z]/.test(password)) {
      setErrors((prev) => ({ ...prev, uppercase: false }));
    } else {
      setErrors((prev) => ({ ...prev, uppercase: true }));
    }
    if (/\d/.test(password)) {
      setErrors((prev) => ({ ...prev, number: false }));
    } else {
      setErrors((prev) => ({ ...prev, number: true }));
    }
  }, [password]);

  const supabase = createClient();
  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user) {
      console.log("User is  logged in");
      return redirect(`/profile/`);
    } else {
      console.log("Logged in user details:", user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.length || errors.uppercase || errors.number) {
      console.error("Password does not meet the requirements");
      return;
    }
    const supabase = createClient();
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error("Error logging in:", error);
    } else {
      const { data: usercreationData, error: usercreationError } =
        await supabase
          .from("users")
          .insert([
            {
              user_id: data.user?.id,
              email: email,
              role: "user",
              fname: fname,
              lname: lname,
            },
          ]);
      if (usercreationError) {
        console.error("Error creating user:", usercreationError);
      } else {
        console.log("User created successfully:", usercreationData);
      }
      console.log("User logged in successfully");
      return redirect(`/profile/`);
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        <div
          className={`w-1/2 lg:px-16 p-4  ${`bg-brand text-on-brand`} flex flex-col justify-between items-center`}
        >
          <h2 className="text-2xl text-left font-bold mb-4 inline-flex items-center gap-2">
            <img src="/logo.png" className="w-12"></img>MERIDIAN
          </h2>
          <div>
            <p className="font-sans">MERIDIAN MEMBERS</p>
            <br />
            <h1 className="font-display text-6xl italic ">
              A house for everything you love. <br />
            </h1>
            <br />
            <p className="font-sans">
              Membership is free. Create an account in under a minute and enjoy
              the benefits from your first order.
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
          <h3 className="text-2xl font-bold mb-4 font-display">Sign Up</h3>
          <p className="font-sans mb-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-bold font-sans  text-brand underline"
            >
              Log in
            </a>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-">
            <div className="flex gap-4 w-full my-4">
              <div className="flex flex-col">
                <label className="font-sans mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-box p-2"
                  required
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-sans mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-box p-2"
                  required
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-sans mb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input-box p-2"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4 ">
              <label className="font-sans mb-2">Password</label>

              <input
                type="password"
                placeholder="Password"
                className="input-box p-2"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {/* password indicator */}
              <div className="w-full h-1 bg-gray-200 rounded mt-2">
                <div className="flex justify-between w-full h-1 bg-white-500 rounded ">
                  <div className="h-1 bg-white w-2"></div>
                  <div className="h-1 bg-white w-2"></div>
                  <div className="h-1 bg-white w-2"></div>
                  <div className="h-1 bg-white w-2"></div>
                </div>
                <div
                  className={`flex justify-between pwprg  h-1 bg-brand/70 rounded -mt-1`}
                  style={{
                    width: `${((Number(!errors.length) + Number(!errors.uppercase) + Number(!errors.number)) / 3) * 100}%`,
                  }}
                ></div>
              </div>

              <ol className="list-inside px-2">
                {errors.length && (
                  <li className="font-sans text-sm">At least 8 characters</li>
                )}
                {errors.uppercase && (
                  <li className="font-sans text-sm">
                    At least 1 uppercase letter
                  </li>
                )}
                {errors.number && (
                  <li className="font-sans text-sm">At least 1 number</li>
                )}
              </ol>
            </div>
            <div>
              <input required type="checkbox" className="mt-4" />{" "}
              <span className="font-sans">
                I agree to the{" "}
                <a
                  href="/Policies/terms"
                  className="text-bold font-sans  text-brand underline"
                >
                  Terms and Conditions
                </a>
              </span>
              <br /> <input type="checkbox" className="mt-4" />{" "}
              <span className="font-sans">
                Send me news of new collections and private sales. `Unsubscribe
                any time.
              </span>
            </div>

            <button
              disabled={
                errors.length ||
                errors.uppercase ||
                errors.number ||
                !email ||
                !password
              }
              type="submit"
              className="disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer text-sm bg-brand text-on-brand py-4 px-4 mt-4 hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              SIGN UP{" "}
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
