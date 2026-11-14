import { createClient } from "@/app/utils/supabase/client";

export interface CartSyncItem {
  productId: string;
  variant: string;
  quantity: number;
}

// Synchronize the complete local cart with Supabase
export async function syncCartToDatabase(
  items: CartSyncItem[]
): Promise<void> {

  const supabase = createClient();

  // 1. Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Please log in before proceeding to checkout.");
  }

  // 2. Validate cart items
  for (const item of items) {
    if (
      !item.productId ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      throw new Error("Invalid cart item.");
    }
  }

  // 3. Get existing database cart
  const { data: existingRows, error: fetchError } = await supabase
    .from("cart")
    .select("id, product_id, variant")
    .eq("user_id", user.id);

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  // 4. Prepare local cart for Supabase
  const rows = items.map((item) => ({
    user_id: user.id,
    product_id: item.productId,
    variant: item.variant || "",
    quantity: item.quantity,
    updated_at: new Date().toISOString(),
  }));

  // 5. Insert new records or update existing records
  if (rows.length > 0) {

    const { error: upsertError } = await supabase
      .from("cart")
      .upsert(rows, {
        onConflict: "user_id,product_id,variant",
      });

    if (upsertError) {
      throw new Error(upsertError.message);
    }
  }

  // 6. Identify items removed from the local cart
  const localKeys = new Set(
    items.map(
      (item) => `${item.productId}::${item.variant || ""}`
    )
  );

  const staleIds = (existingRows ?? [])
    .filter(
      (row) =>
        !localKeys.has(
          `${row.product_id}::${row.variant || ""}`
        )
    )
    .map((row) => row.id);

  // 7. Delete removed items from Supabase
  if (staleIds.length > 0) {

    const { error: deleteError } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .in("id", staleIds);

    if (deleteError) {
      throw new Error(deleteError.message);
    }
  }
}