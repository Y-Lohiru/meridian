
import { createClient } from "@/app/utils/supabase/client";

export interface AddCartItem {
  productId: string;
  variant: string;
  quantity: number;
}

export async function addProductToCart(
  item: AddCartItem
): Promise<void> {

  const supabase = createClient();

  // 1. Get the logged-in customer
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(authError.message);
  }

  if (!user) {
    throw new Error("Please log in before adding to your cart.");
  }

  // 2. Validate input
  if (
    !item.productId ||
    !Number.isInteger(item.quantity) ||
    item.quantity < 1
  ) {
    throw new Error("Invalid product or quantity.");
  }

  const variant = item.variant.trim();

  // 3. Check whether this product and variant
  // already exist in this customer's cart
  const { data: existingItem, error: selectError } =
    await supabase
      .from("cart")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", item.productId)
      .eq("variant", variant)
      .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }

  // 4. If item exists, increase its quantity
  if (existingItem) {

    const { error: updateError } = await supabase
      .from("cart")
      .update({
        quantity: existingItem.quantity + item.quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingItem.id)
      .eq("user_id", user.id);

    if (updateError) {
      throw new Error(updateError.message);
    }

  } else {

    // 5. Otherwise insert a new cart record
    const { error: insertError } = await supabase
      .from("cart")
      .insert({
        user_id: user.id,
        product_id: item.productId,
        variant: variant,
        quantity: item.quantity,
      });

    if (insertError) {
      throw new Error(insertError.message);
    }
  }
}
