"use client";

import { useState } from "react";
import { restockProduct } from "@/app/utils/queries/admin";

export default function RestockButton({ id }: { id: string }) {
  const [restockAmount, setRestockAmount] = useState(1);
  const [restocking, setRestocking] = useState(false);

  async function handleRestock() {
    setRestocking(true);

    try {
      const ok = await restockProduct(id, restockAmount);
      if (!ok) {
        alert("Could not restock the product");
      } else {
        setRestockAmount(1);
      }
    } catch {
      alert("You don't have permission to restock products.");
    } finally {
      setRestocking(false);
    }
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="flex items-center h-9 shrink-0 rounded-lg border border-line-strong overflow-hidden">
        <button
          disabled={restocking}
          onClick={() => setRestockAmount((prev) => Math.max(1, prev - 1))}
          aria-label="Decrease amount"
          className="flex items-center justify-center w-7 h-full shrink-0 text-ink enabled:hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="w-7 text-center text-sm tabular-nums text-ink">
          {restockAmount}
        </span>
        <button
          disabled={restocking}
          onClick={() => setRestockAmount((prev) => prev + 1)}
          aria-label="Increase amount"
          className="flex items-center justify-center w-7 h-full shrink-0 text-ink enabled:hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      <button
        disabled={restocking}
        onClick={handleRestock}
        className="shrink-0 h-9 px-4 border border-line-strong text-sm text-ink rounded-lg enabled:hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {restocking ? "Restocking…" : "Restock"}
      </button>
    </div>
  );
}
