"use client";
import { addProduct, uploadProductImage } from "@/app/utils/queries/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Same colors the products table has swatches for
const colors = [
  "Black",
  "Brass",
  "Burgundy",
  "Charcoal",
  "Chestnut",
  "Cognac",
  "Emerald",
  "Gold",
  "Natural",
  "Navy",
  "Oak",
  "Off-white",
  "Sand",
  "Smoked",
  "Tobacco",
];

export default function AddProductsForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [image_file, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const isComplete =
    productName.trim() !== "" &&
    material.trim() !== "" &&
    category !== "" &&
    color !== "" &&
    price > 0 &&
    quantity >= 0 &&
    image_file !== null;

  async function handleAdd() {
    if (!isComplete) return;

    setSaving(true);
    setError("");

    try {
      const image_url = image_file
        ? ((await uploadProductImage(image_file)) ?? undefined)
        : undefined;

      const added = await addProduct({
        productName,
        price,
        quantity,
        category,
        material,
        color,
        image_url,
      });

      if (added) {
        router.push("/admin/products");
      } else {
        setError("Could not add the product");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const cardClass =
    "flex flex-col gap-4 rounded-lg border border-line bg-on-brand p-5 sm:p-6";
  const labelClass = "text-sm font-medium text-ink";
  const inputClass =
    "h-11 w-full rounded-md border border-line-strong bg-white px-3 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-brand/30";
  const helpClass = "text-xs text-ink-muted";

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">
          Add product
        </h1>
        <p className={helpClass}>
          Fill in the details, then save to add it to the store
        </p>
      </div>

      <section className={cardClass}>
        <h2 className="text-base font-semibold text-ink">Details</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Product name
          </label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            id="name"
            type="text"
            placeholder="e.g. Leather chelsea boot"
            className={inputClass}
          ></input>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className={labelClass}>
            Quantity
          </label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            id="quantity"
            type="number"
            min={0}
            className={inputClass}
          ></input>
          <p className={helpClass}>How many you have ready to sell.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className={labelClass}>
            Price
          </label>
          <div className="flex h-11 overflow-hidden rounded-md border border-line-strong bg-white focus-within:ring-2 focus-within:ring-brand/30">
            <span className="flex items-center border-r border-line-strong bg-surface-admin px-3 text-sm text-ink-muted">
              $
            </span>
            <input
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              id="price"
              type="number"
              min={0}
              step="0.01"
              className="w-full px-3 text-sm text-ink focus:outline-none"
            ></input>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="material" className={labelClass}>
            Material
          </label>
          <input
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            id="material"
            type="text"
            placeholder="e.g. Full-grain leather"
            className={inputClass}
          ></input>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="color" className={labelClass}>
            Color
          </label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            id="color"
            name="color"
            required
            className={inputClass}
          >
            <option value="">Select a color</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            name="category"
            required
            className={inputClass}
          >
            <option value="">Select a category</option>
            <option value="Formal">Formal</option>
            <option value="Boots">Boots</option>
            <option value="Loafers">Loafers</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Heels">Heels</option>
            <option value="Sandals">Sandals</option>
          </select>
        </div>
      </section>

      <div className={cardClass}>
        <label htmlFor="image" className={labelClass}>
          Product image
        </label>
        <input
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          id="image"
          type="file"
          accept="image/*"
          className="text-sm text-ink-muted file:mr-3 file:h-10 file:cursor-pointer file:rounded-md file:border file:border-dashed file:border-line-strong file:bg-surface-admin file:px-4 file:text-sm file:font-medium file:text-ink hover:file:bg-surface-hover"
        ></input>
        <p className={helpClass}>
          JPG or PNG, at least 1600 px on the long side.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-3 rounded-lg border border-line bg-on-brand p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className={helpClass}>
          It goes live on the store as soon as you add it.
        </p>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button
          disabled={saving || !isComplete}
          onClick={handleAdd}
          className="h-11 rounded-md bg-brand px-6 text-sm font-semibold text-on-brand hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
