import Link from "next/link"

export default function Header() {
    return (
        <div className="m-2.5 flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <span className="text-brand text-4xl">Products</span>
                <span className="text-sm text-black/50">Manage your store's products and stock</span>
            </div>
            <Link
                href={"/admin/products/new"}
                className="flex items-center h-9 px-4 rounded bg-brand text-white text-sm font-medium hover:opacity-90"
            >
                + Add product
            </Link>
        </div>
    )
}
