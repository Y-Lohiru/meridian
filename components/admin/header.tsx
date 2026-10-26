export default function AdminHeader() {
  return (
    <div className="">
      <div className="flex flex-col">
        <span>Greetings</span>
        <span>date</span>
      </div>
      <div className="flex justify-end flex-row gap-3.5">
        <input className="border rounded" type="text" placeholder="search order,products..."></input>
        <select className="border rounded">
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 30 days</option>
        </select>

        <button className="bg-brand border rounded text-white p-3.5">+ Add product</button>
      </div>
    </div>
  );
}
