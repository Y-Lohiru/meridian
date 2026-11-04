// Yuwan - Admin dashboard

import { createClient } from "@supabase/supabase-js";

interface RecentOrder {
  orderId: string;
  customerName: string;
  itemName: string;
  createdAt: string;
  status: string;
  total: number;
}

interface NewProduct {
  name: string;
  quantity: number;
  price: number;
  image_url?: string;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

// Function to get the recent order to show in the dashboard
async function getRecentOrders(): Promise<RecentOrder[]> {
  const supabase = getSupabase();

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
    const user = order.users as unknown as { fname: string; lname: string } | null;
    const firstItem = order.order_product[0]?.product as unknown as { productName: string } | null;

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
  const supabase = getSupabase();

  const { data, error } = await supabase.from("product").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// Function to add new products to the database
async function addProduct(product: NewProduct) {
  const supabase = getSupabase();

  const { error } = await supabase.from("product").insert(product);

  if (error) {
    console.error(error);
    return null;
  }

  return true;
}

// Function to remove a product from the database
async function removeProduct(id: string) {
  const supabase = getSupabase();

  const { error } = await supabase.from("product").delete().eq("id", id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

// Function to get the products with low stock to show on the dashboard
async function getLowStockProducts() {
  const supabase = getSupabase();
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

function getOrderStatus() {}

function getMonthlyRevenue() {}

export {
  addProduct,
  removeProduct,
  getProducts,
  getRecentOrders,
  getLowStockProducts,
  getMonthlyRevenue,
  getOrderStatus,
};
