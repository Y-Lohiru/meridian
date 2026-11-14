// Yuwan - Admin dashboard
"use server";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

interface RecentOrder {
  orderId: string;
  customerName: string;
  itemName: string;
  createdAt: string;
  status: string;
  total: number;
}

interface NewProduct {
  productName: string;
  price: number;
  quantity: number;
  category: string;
  material: string;
  color: string;
  image_url?: string;
}

// Supabase client that acts as the logged-in user (reads the session cookie)
async function getSupabase() {
  return createClient(await cookies());
}

// Throws unless the logged-in user is an admin. Used before any write.
async function requireAdmin() {
  const supabase = await getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profile?.role !== "admin") {
    throw new Error("Not an admin");
  }

  return supabase;
}

// Function to upload an image to the database
async function uploadProductImage(file: File) {
  const supabase = await requireAdmin();
  const ext = file.name.split(".").pop();
  const path = ``;
}

// Function to get all the orders

async function getOrders(): Promise<RecentOrder[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("orders")
    .select(
      "order_id, created_at, status, total, users(fname, lname), order_product(product(productName))",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((order) => {
    const user = order.users as unknown as {
      fname: string;
      lname: string;
    } | null;
    const firstItem = order.order_product[0]?.product as unknown as {
      productName: string;
    } | null;

    return {
      orderId: order.order_id,
      customerName: user ? `${user.fname} ${user.lname}` : "Unknown",
      itemName: firstItem?.productName ?? "—",
      createdAt: order.created_at,
      status: order.status,
      total: order.total,
    };
  });
}

// Function to get the recent order to show in the dashboard
async function getRecentOrders(): Promise<RecentOrder[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("orders")
    .select(
      "order_id, created_at, status, total, users(fname, lname), order_product(product(productName))",
    )
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((order) => {
    const user = order.users as unknown as {
      fname: string;
      lname: string;
    } | null;
    const firstItem = order.order_product[0]?.product as unknown as {
      productName: string;
    } | null;

    return {
      orderId: order.order_id,
      customerName: user ? `${user.fname} ${user.lname}` : "Unknown",
      itemName: firstItem?.productName ?? "—",
      createdAt: order.created_at,
      status: order.status,
      total: order.total,
    };
  });
}

// Function to get all the product details to show on the admin/ products page
async function getProducts() {
  const supabase = await getSupabase();

  const { data, error } = await supabase.from("product").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// Function to add new products to the database
async function addProduct(product: NewProduct) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from("product").insert(product);

  if (error) {
    console.error(error);
    return null;
  }

  return true;
}

// Function to remove a product from the database
async function removeProduct(id: string) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from("product").delete().eq("id", id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

// Function to get the products with low stock to show on the dashboard
async function getLowStockProducts() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .lt("quantity", 5);

  if (error) {
    console.error(error);
    return [];
  }

  console.log("Low stock: ", data);
  return data;
}

// "use server" files can only export async functions, so these stubs are async
async function getOrderStatus() {}

async function getMonthlyRevenue() {}

export {
  addProduct,
  removeProduct,
  getProducts,
  getOrders,
  getRecentOrders,
  getLowStockProducts,
  getMonthlyRevenue,
  getOrderStatus,
};
