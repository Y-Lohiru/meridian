import LogoText from "../ui/logoText";
import Link from "next/link";
import ProfileIcon from "./profileIcon";

import { MdOutlineDashboard } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";

export default function SideBar() {
  return (
    <div className="flex flex-col sticky top-0 shrink-0 bg-brand w-56 h-dvh pl-3">
      <LogoText />

      <div className="ml-1.5 text-white font-semibold font-display">
        <span>Store</span>
        <ul className="flex flex-col gap-3">
          <li>
            <Link href={"/admin"} className="flex hover:bg-white/20">
              <MdOutlineDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={"/admin/orders"} className="flex hover:bg-white/20">
              {" "}
              <IoBagOutline />
              Orders
            </Link>
          </li>
          <li>
            <Link href={"/admin/products"} className="flex hover:bg-white/20">
              <BsBoxSeam />
              Products
            </Link>
          </li>
          <li>
            <Link href={"/admin/customers"} className="flex">Customers</Link>
          </li>
          <li>
            <Link href={"/admin/discounts"} className="flex">Discouts</Link>
          </li>
        </ul>
        <span>Site</span>
        <ul className="flex flex-col gap-3">
          <li>Pages and content</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className="mt-auto">
        <ProfileIcon />
      </div>
    </div>
  );
}
