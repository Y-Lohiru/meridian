// Yuwan - Admin dashboard

import { createClient } from "@supabase/supabase-js";

interface RecentOrder {
  id: number;
  customerName: string;
  itemName: string;
  createdAt: Date;
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
function getRecentOrders() {}

// Function to get all the product details to show on the admin/ products page
async function getProducts() {
  const supabase = getSupabase();

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// Function to add new products to the database
async function addProduct(product: NewProduct) {
  const supabase = getSupabase();

  const { error } = await supabase.from("products").insert(product);

  if (error) {
    console.error(error);
    return null;
  }

  return true;
}

// Function to remove a product from the database
async function removeProduct(id: number) {
  const supabase = getSupabase();

  const { error } = await supabase.from("products").delete().eq("id", id);

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
    .from("products")
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
