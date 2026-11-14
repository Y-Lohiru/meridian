"use client";

import { removeProduct } from "@/app/utils/queries/admin";
import { refresh } from "next/cache";
import { FiTrash2 } from "react-icons/fi";

export default function RemoveButton({ id }: { id: string }) {
  async function remove() {
    if (!confirm("Are you sure you want to remove this product?")) return;
    const status = await removeProduct(id);

    if (!status) {
      alert("Could not remove product.")
    }

    refresh();
    return true;
  }

  return (
    <button
      onClick={remove}
      aria-label="Remove product"
      className="text-red-700 hover:text-red-900"
    >
      <FiTrash2 className="size-4" />
    </button>
  );
}
