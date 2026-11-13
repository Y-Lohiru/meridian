import { updateSession } from "./app/utils/supabase/middleware";
import type { NextRequest } from "next/server";

// Runs on the server before any matching page is rendered
export default async function proxy(request: NextRequest) {
  return updateSession(request);
}

// Only run the proxy for the admin area
export const config = {
  matcher: ["/admin/:path*"],
};
