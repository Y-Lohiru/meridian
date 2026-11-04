"use client";

import { removeProduct } from "@/app/utils/queries/admin";
import { refresh } from "next/cache";

export default function RemoveButton({ id }: { id: string }) {
  async function remove() {
    if (!confirm("Are you sure you want to remove this product?")) return;
    await removeProduct(id);
  }

  return (
    <button onClick={remove} className="border text-red-500 bg-red-200">
      Remove
    </button>
  );
}
