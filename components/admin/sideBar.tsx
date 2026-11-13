"use client";

import LogoText from "../ui/logoText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileIcon from "./profileIcon";

import { MdOutlineDashboard } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";

export default function SideBar() {
  const pathname = usePathname();

  // Highlight the link for the page currently open
  function linkClass(href: string) {
    const active = pathname === href;
    return `flex items-center px-3 py-2 text-sm rounded-md gap-3 transition-colors ${
      active ? "bg-white text-brand font-semibold" : "text-white/85 hover:bg-white/10"
    }`;
  }

  return (
    <aside className="flex flex-col px-3 py-6 sticky top-0 shrink-0 bg-brand w-56 h-dvh">
      <LogoText />

      <div className="text-white font-display">
        <span className="block px-3 mt-8 mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">Store</span>
        <ul className="flex flex-col gap-1">
          <li>
            <Link href={"/admin"} className={linkClass("/admin")}>
              <MdOutlineDashboard className="size-4" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={"/admin/orders"} className={linkClass("/admin/orders")}>
              <IoBagOutline className="size-4" />
              Orders
            </Link>
          </li>
          <li>
            <Link href={"/admin/products"} className={linkClass("/admin/products")}>
              <BsBoxSeam className="size-4" />
              Products
            </Link>
          </li>
        </ul>
        {/* <span>Site</span>
        <ul className="flex flex-col gap-3">
          <li>Pages and content</li>
          <li>Settings</li>
        </ul> */}
      </div>

      <div className="mt-auto border-t border-white/15 pt-4">
        <ProfileIcon />
      </div>


    </aside>
  );
}
