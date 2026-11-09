import LogoText from "../ui/logoText";
import Link from "next/link";
import ProfileIcon from "./profileIcon";

import { MdOutlineDashboard } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";

export default function SideBar() {
  return (
    <aside className="flex flex-col px-3 py-6 sticky top-0 shrink-0 bg-brand w-56 h-dvh pl-3">
      <LogoText />

      <div className="text-white font-display">
        <span className="block px-3 mt-8 mb-2 font-medium uppercase">Store</span>
        <ul className="flex flex-col gap-1">
          <li>
            <Link href={"/admin"} className="flex items-center px-3 py-2 text-sm rounded-md gap-3 hover:bg-white/20">
              <MdOutlineDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={"/admin/orders"} className="flex items-center px-3 py-2 text-sm rounded-md gap-3 hover:bg-white/20">
              <IoBagOutline />
              Orders
            </Link>
          </li>
          <li>
            <Link href={"/admin/products"} className="flex items-center px-3 py-2 text-sm rounded-md gap-3 hover:bg-white/20">
              <BsBoxSeam />
              Products
            </Link>
          </li>
        </ul>
        <span>Site</span>
        <ul className="flex flex-col gap-3">
          <li>Pages and content</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className="mt-auto border-t border-white/15 pt-4">
        <ProfileIcon />
      </div>


    </aside>
  );
}
