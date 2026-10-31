"use client"
import { useState, useEffect } from "react";
import { addProduct } from "@/app/utils/queries/admin";

export default function AdminHeader() {

  const [days, setDays] = useState(0);

  function addProduct() {

  }


  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <span className="text-brand text-4xl">Greetings</span>
        <span>date</span>
      </div>
      <div className="flex justify-end flex-row gap-3.5">
        <input className="border rounded h-9" type="text" placeholder="search order,products..."></input>
        <select className="border rounded h-9">
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 30 days</option>
        </select>

        <button onClick={addProduct} className="bg-brand rounded border h-9 w-40 text-white">+ Add product</button>
      </div>
    </div>
  );
}
