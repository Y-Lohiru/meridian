// app/shop/[id]/actions.ts
"use server";

import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitProductReview(formData: FormData) {
  const productId = formData.get("productId") as string;
  const authorName = (formData.get("authorName") as string)?.trim();
  const rating = Number(formData.get("rating"));
  const title = (formData.get("title") as string)?.trim();
  const comment = (formData.get("comment") as string)?.trim();

  if (!productId || !authorName || !title || !comment || rating < 1 || rating > 5) {
    return { error: "Please fill out all fields and choose a star rating." };
  }

  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.from("reviews").insert({
      product_id: productId,
      author_name: authorName,
      rating,
      title,
      comment,
      verified: true,
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath(`/shop/${productId}`);
    return { success: true };
  } catch (err) {
    console.error("Failed to submit review:", err);
    return { error: "An unexpected error occurred while submitting your review." };
  }
}