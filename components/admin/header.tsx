"use client"
import { useState, useEffect } from "react";
import { addProduct } from "@/app/utils/queries/admin";
import Link from "next/link";

export default function AdminHeader() {

  const [days, setDays] = useState(0);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-1">
        <span className="font-display text-ink text-3xl sm:text-4xl">Greetings</span>
        <span className="text-xs text-ink-muted">date</span>
      </div>
      <div className="hidden sm:flex sm:flex-row sm:justify-end gap-3">
        <input className="border border-line-admin bg-on-brand rounded-md h-9 px-3 text-sm sm:w-56" type="text" placeholder="search order,products..."></input>
        <select className="border border-line-admin bg-on-brand rounded-md h-9 px-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 30 days</option>
        </select>

        <Link href={"/admin/products/new"} className="flex items-center justify-center bg-brand rounded-md h-9 px-4 shrink-0 text-on-brand text-sm font-semibold">+ Add product</Link>
      </div>
    </div>
  );
}
