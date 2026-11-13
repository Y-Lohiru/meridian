import SideBar from "@/components/admin/sideBar";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-dvh bg-surface-admin">
      <SideBar />
      <main className="flex-1 p-gutter">{children}</main>
    </div>
  );
}
