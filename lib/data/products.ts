import { Product, ProductFilters } from "@/components/product detail/types/product";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { ProductReview } from "@/components/product detail/types/product";

export async function getProducts(filters: ProductFilters): Promise<Product[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase.from("product").select("*");

    // Category filter
    if (filters.category) {
      const cats = filters.category.split(",").map((c) => c.trim());
      if (cats.length === 1) {
        query = query.ilike("category", cats[0]);
      } else if (cats.length > 1) {
        query = query.in("category", cats);
      }
    }

    // Material filter
    if (filters.material) {
      const mats = filters.material.split(",").map((m) => m.trim());
      if (mats.length === 1) {
        query = query.ilike("material", mats[0]);
      } else if (mats.length > 1) {
        query = query.in("material", mats);
      }
    }

    // Color filter (targeting 'color' column)
    if (filters.color) {
      query = query.ilike("color", filters.color);
    }

    // Price filter
    if (filters.maxPrice) {
      query = query.lte("price", filters.maxPrice);
    }

    //Search
    if (filters.search && filters.search.trim() !== "") {
      const term = filters.search.trim();
      query = query.or(
        `"productName".ilike.%${term}%,category.ilike.%${term}%,material.ilike.%${term}%`
      );
    }

    // Sorting
    if (filters.sort === "price-low") {
      query = query.order("price", { ascending: true });
    } else if (filters.sort === "price-high") {
      query = query.order("price", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }


    const { data, error } = await query;

    let resultList: Product[] = data ?? [];

    // Fallback filtering if DB is empty or disconnected
    if (!data || data.length === 0) {
      if (filters.category) {
        const cats = filters.category.split(",").map((c) => c.toLowerCase());
        resultList = resultList.filter((p) =>
          cats.includes(p.category.toLowerCase())
        );
      }
      if (filters.material) {
        const mats = filters.material.split(",").map((m) => m.toLowerCase());
        resultList = resultList.filter(
          (p) => p.material && mats.includes(p.material.toLowerCase())
        );
      }
      if (filters.color) {
        resultList = resultList.filter(
          (p) => p.color?.toLowerCase() === filters.color?.toLowerCase()
        );
      }
      if (filters.maxPrice) {
        resultList = resultList.filter((p) => p.price <= filters.maxPrice!);
      }
      if (filters.search && filters.search.trim() !== "") {
        const term = filters.search.trim().toLowerCase();
        resultList = resultList.filter(
          (p) =>
            p.productName.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            (p.material && p.material.toLowerCase().includes(term))
        );
      }
    }

    
    return resultList.filter((p): p is Product => Boolean(p) && Boolean(p.id));
  } catch (err) {
    console.error("Database query error, returning mock products:", err);
    return [];
  }
}


export async function getProductById(id: string): Promise<Product | null> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("product")
      .select('id, created_at, "productName", price, category, material, color, quantity, image_url, images, variants, details')
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn(`Product ${id} not found in DB:`, error?.message);
      return null;
    }

    return data as Product;
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    return null;
  }
}

export async function getProductReviews(productId: string): Promise<ProductReview[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as ProductReview[];
  } catch (err) {
    console.error(`Error fetching reviews for ${productId}:`, err);
    return [];
  }
}
