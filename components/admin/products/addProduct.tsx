import { useState } from "react";

export default function AddProductsForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [category, setCategary] = useState("");

  return (
    <div>
      <label htmlFor="">Enter product name: </label>
      <input id="name" type="text" placeholder="product name"></input>

      <label htmlFor="">Quantitty</label>
      <input id="quantity" type="number"></input>

      <label htmlFor="color">Enter color</label>
      <input id="color" type="text"></input>

      <label htmlFor="">Enter category: </label>
      <input type="dro"></input>

      <label htmlFor=""></label>
      <input type="text"></input>
    </div>
  );
}
