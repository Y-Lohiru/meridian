import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Fetch cookieStore first to pass into your custom createClient
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: products, error, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .limit(5);

    if (error) {
      return NextResponse.json(
        {
          status: "ERROR",
          message: "Database query failed",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "CONNECTED",
      database: "Supabase",
      targetUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      totalProductsFound: count ?? 0,
      sampleData: products,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "DISCONNECTED",
        message: "Failed to initialize Supabase client.",
        error: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}