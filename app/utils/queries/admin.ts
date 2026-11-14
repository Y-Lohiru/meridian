// Yuwan - Admin dashboard
"use server";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";

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
    .from("roles")
    .select("role")
    .eq("userid", user.id)
    .single();

  if (profile?.role !== "admin") {
    throw new Error("Not an admin");
  }

  return supabase;
}

// Signout the user
// Ends the session and sends the user to the admin login page
async function signOut() {
  const supabase = await getSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// Function to upload an image to the database
async function uploadProductImage(file: File) {
  if (file.size === 0) return null;

  if (!file.type.startsWith("image/")) return null;

  if (file.size > 5 * 1024 * 1024) return null;

  const supabase = await requireAdmin();
  const ext = file.name.split(".").pop();
  const path = `products/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("thumbnails")
    .upload(path, file, { contentType: file.type });

  if (error) {
    throw new Error("Image upload failed!");
  }

  const { data } = supabase.storage.from("thumbnails").getPublicUrl(path);

  return data.publicUrl;
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

async function getPendingOrders() : Promise<number> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("orders")
    .select("order_id")
    .eq("status", "pending");

  if (error) {
    console.error(error);
    return 0;
  }

  return data.length;
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

  const { data, error } = await supabase
    .from("product")
    .select("*")
    .order("created_at", { ascending: false });
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

  const { data, error } = await supabase
    .from("product")
    .delete()
    .eq("id", id)
    .select();

  if (error || data.length === 0) {
    console.error(error);
    return false;
  }

  refresh();
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

// Monthly revenue for the graph
async function getMonthlyRevenue() {
  const supabase = await getSupabase();

  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  start.setMonth(start.getMonth() - 5);

  const { data, error } = await supabase
    .from("orders")
    .select("created_at, total")
    .gte("created_at", start.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  // Initialize a months array with zero revenue
  const months = [];

  for (let i = 0; i < 6; i++) {
    const date = new Date(start);
    date.setMonth(start.getMonth() + i);
    months.push({
      month: date.toLocaleDateString("en-US", { month: "short" }),
      revenue: 0,
    });
  }

  // Add the order's total to its month
  for (const order of data) {
    const label = new Date(order.created_at).toLocaleDateString("en-US", {
      month: "short",
    });

    const month = months.find((m) => m.month === label);

    if (month) {
      month.revenue += order.total ?? 0;
    }
  }

  return months;
}


export {
  uploadProductImage,
  signOut,
  addProduct,
  removeProduct,
  getProducts,
  getOrders,
  getRecentOrders,
  getLowStockProducts,
  getMonthlyRevenue,
  getOrderStatus,
  getPendingOrders,
};
