import SideBar from "@/components/admin/sideBar";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-dvh bg-surface-admin">
      <SideBar />
      <main className="flex-1 p-gutter">{children}</main>
    </div>
  );
}
