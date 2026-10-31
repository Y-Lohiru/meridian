import Image from "next/image";

export default function LowStockList() {
  const lowStock = [
    { image: "/a.png", name: "Grand Piano", remaining: "3" },
    { image: "/b.png", name: "The grand bed", remaining: "1" },
    { image: "/c.png", name: "Table premium", remaining: "5" },
    { image: "/d.png", name: "Table premium", remaining: "5" }
  ];

  return (
    <div className="m-2.5">
      <div className="border w-80 h-auto bg-on-brand rounded-2xl p-3">
        <span>Low Stock</span>
        <hr />

        {lowStock.map((item) => (
            <div key={item.name} className="flex flex-row gap-6 m-1.5"> 
                <Image src={item.image} alt="product image" width={50} height={80}></Image>
                
                <div className="flex flex-col ">
                    <span>{item.name}</span>
                    <span>{item.remaining}</span>
                </div>
                
                <button className="border w-20 h-12 text-brand rounded ">Restock</button>
            </div>
        ))}
      </div>
    </div>
  );
}
