import { Product, ProductFilters } from "@/types/product";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    productName: "Alabaster table lamp",
    category: "Lighting",
    price: 540,
    color: "Brass",
    material: "Brass",
    image_url:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    productName: "Travertine side table",
    category: "Furniture",
    price: 1200,
    color: "Natural",
    material: "Travertine",
    image_url:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    productName: "Stoneware vessel",
    category: "Ceramics",
    price: 280,
    color: "Charcoal",
    material: "Stoneware",
    image_url:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
  },
];

export async function getProducts(filters: ProductFilters): Promise<Product[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Target the singular 'product' table from your schema
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

    // Sorting
    if (filters.sort === "price-low") {
      query = query.order("price", { ascending: true });
    } else if (filters.sort === "price-high") {
      query = query.order("price", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    let resultList: Product[] = data && data.length > 0 ? data : MOCK_PRODUCTS;

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
    }

    return resultList.filter((p): p is Product => Boolean(p) && Boolean(p.id));
  } catch (err) {
    console.error("Database query error, returning mock products:", err);
    return MOCK_PRODUCTS;
  }
}