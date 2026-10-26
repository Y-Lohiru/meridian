import LogoText from "../UI/logoText";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="bg-brand w-56 min-h-dvh">
      <LogoText />

      <div className="ml-1.5 text-white font-display">
        <span>STORE</span>
        <ul className="">
          <li><Link href={"/admin"}>Dashboard</Link></li>
          <li><Link href={"/admin/orders"}>Orders</Link></li>
          <li><Link href={"/admin/products"}>Products</Link></li>
          <li><Link href={"/admin/customers"}>Customers</Link></li>
          <li><Link href={"/admin/discounts"}>Discouts</Link></li>
        </ul>
        <span>Site</span>
        <ul>
          <li>Pages and content</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
}
