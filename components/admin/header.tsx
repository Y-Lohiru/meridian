"use client"
import { useState, useEffect } from "react";
import { addProduct } from "@/app/utils/queries/admin";
import Link from "next/link";

export default function AdminHeader() {

  const [days, setDays] = useState(0);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
      <div className="flex flex-col">
        <span className="text-brand text-3xl sm:text-4xl">Greetings</span>
        <span>date</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3.5">
        <input className="border rounded h-9 px-3 w-full sm:w-auto" type="text" placeholder="search order,products..."></input>
        <select className="border rounded h-9 px-2 w-full sm:w-auto">
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 30 days</option>
        </select>

        <Link href={"/admin/products/new"} className="bg-brand rounded border h-9 w-full sm:w-40 shrink-0 text-white text-center p-1.5 items-center">+ Add product</Link>
      </div>
    </div>
  );
}
