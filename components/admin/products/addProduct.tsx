"use client";
import { addProduct, uploadProductImage } from "@/app/utils/queries/admin";
import { useState } from "react";

export default function AddProductsForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [image_file, setImageFile] = useState<File | null>(null);

  async function handleAdd() {
    const image_url = image_file
      ? ((await uploadProductImage(image_file)) ?? undefined)
      : undefined;

    await addProduct({
      productName,
      price,
      quantity,
      category,
      material,
      color,
      image_url,
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <label htmlFor="">Enter product name: </label>
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          id="name"
          type="text"
          placeholder="product name"
        ></input>
      </div>

      <div className="flex flex-row">
        <label htmlFor="">Quantity</label>
        <input
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          id="quantity"
          type="number"
        ></input>
      </div>

      <div className="flex flex-row">
        <label htmlFor="color">Enter color</label>
        <input id="color" type="text"></input>
      </div>

      <div className="flex flex-row">
        <label htmlFor="">Enter category: </label>
        <select id="category" name="category" required>
          <option value="Formal">Formal</option>
          <option value="Boots">Boots</option>
          <option value="Loafers">Loafers</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Heels">Heels</option>
          <option value="Sandals">Sandals</option>
        </select>
      </div>

      <div>
        <label htmlFor="image">Upload product image: </label>
        <input
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          id="image"
          type="file"
          accept="image/*"
        ></input>
      </div>

      <div>
        <button onClick={handleAdd} className="bg-brand text-on-brand">
          Add
        </button>
      </div>
    </div>
  );
}
