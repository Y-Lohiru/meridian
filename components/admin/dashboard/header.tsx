"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminHeader() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-1 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-2">
        <span className="font-display text-ink text-4xl sm:text-5xl leading-none">
          Greetings
        </span>
        <span className="min-h-5 text-sm text-ink-muted">{today}</span>
      </div>
      <div className="hidden sm:flex sm:flex-row sm:justify-end gap-3">
        <Link
          href={"/admin/products/new"}
          className="flex items-center justify-center bg-brand rounded-lg h-11 px-5 shrink-0 text-on-brand text-sm font-semibold hover:opacity-90"
        >
          + Add product
        </Link>
      </div>
    </div>
  );
}
