import SideBar from "@/components/admin/sideBar";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

// The layout itself does no data access, it only wraps the admin shell in
// Suspense, so Next.js can prerender the background and stream the rest
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense
      fallback={<div className="min-h-dvh bg-surface-admin" aria-busy="true" />}
    >
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}

// Checks the user is a logged-in admin, then renders the sidebar and page
async function AdminShell({ children }: { children: React.ReactNode }) {
  // Supabase's auth check uses Date.now(), so wait for a real request first
  await connection();
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("roles")
    .select("role")
    .eq("userid", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  const { data: userInfo } = await supabase
    .from("users")
    .select("fname")
    .eq("user_id", user.id)
    .single();

  const name = userInfo?.fname || "Admin";

  return (
    <div className="flex flex-col md:flex-row min-h-dvh bg-surface-admin">
      <SideBar name={name} />
      <main className="flex-1 min-w-0 px-gutter-mobile pt-5 pb-10 md:p-gutter">
        {children}
      </main>
    </div>
  );
}
