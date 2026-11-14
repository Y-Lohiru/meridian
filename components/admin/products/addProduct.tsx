"use client";
import { addProduct } from "@/app/utils/queries/admin";
import { useState } from "react";

export default function AddProductsForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [category, setCategary] = useState("");

  function add() {
    //addProduct();
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <label htmlFor="">Enter product name: </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <label htmlFor=""></label>
        <input type="text"></input>
      </div>

      <div>
        <button onClick={add} className="bg-brand text-on-brand">
          Add
        </button>
      </div>
    </div>
  );
}
