import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import CartDrawer from "@/components/checkout/CartDrawer";

// Shop pages get the header, footer and cart. Admin pages don't use this layout.
export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CartDrawer />
    </>
  );
}
