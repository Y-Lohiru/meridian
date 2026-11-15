
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoText from "./logoText";
import { createClient } from "@/app/utils/supabase/client";
import { usecart } from "@/components/checkout/CartContent";


const navigation = [
  { name: "All Shoes", href: "/shop" },
  { name: "Boots", href: "/shop?category=Boots" },
  { name: "Loafers", href: "/shop?category=Loafers" },
  { name: "Formal", href: "/shop?category=Formal" },
  { name: "Sneakers", href: "/shop?category=Sneakers" },
  { name: "Heels", href: "/shop?category=Heels" },
  { name: "Sandals", href: "/shop?category=Sandals" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);

  const router = useRouter();
  const { setIsCartOpen, cartItems } = usecart();


  // Check login status when Account is clicked
  const handleAccountClick = async () => {
    if (checkingAuth) return;

    setCheckingAuth(true);
    setMenuOpen(false);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      router.push("/login");
    } finally {
      setCheckingAuth(false);
    }
  };

  return (
    <header className="w-full bg-brand text-white">
      {/* Announcement bar */}
      {/* <div className="bg-brand-deep px-4 py-2.5 text-center text-2xs tracking-button text-on-brand-soft">
        Complimentary delivery on orders over [AMOUNT]
        <span className="mx-2">·</span>
        Free returns within 30 days
      </div> */}

      {/* Navigation */}
      <div className="mx-auto flex max-w-[85rem] items-center justify-between border-b border-white/20 px-4 py-5 md:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="wordmark text-2xl text-white"
        >
          <LogoText />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs text-white/80 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right navigation */}
        <div className="flex items-center gap-5">

          {/* Account button */}
          <button
            type="button"
            onClick={handleAccountClick}
            disabled={checkingAuth}
            className="hidden text-xs text-white/80 transition-colors hover:text-white disabled:opacity-50 sm:block"
          >
            Account
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            
            className="text-xs text-white/80 transition-colors hover:text-white"
          >
            Bag (0)
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl text-white lg:hidden"
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="border-b border-white/20 bg-brand px-4 py-6 md:px-10 lg:hidden"
        >
          <div className="flex flex-col gap-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/20 pb-3 text-sm text-white/80 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            {/* Account button for small screens */}
            <button
              type="button"
              onClick={handleAccountClick}
              disabled={checkingAuth}
              className="text-left text-sm text-white/80 transition-colors hover:text-white disabled:opacity-50 sm:hidden"
            >
              Account
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
