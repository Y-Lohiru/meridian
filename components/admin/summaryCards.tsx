interface Details {
  title: string;
  value: string;
  colorClass: string;
}

export default function SummaryCard({ title, value, colorClass }: Details) {
  return (
    <div
      className={`flex flex-col gap-2 border rounded-2xl w-64 h-32 bg-${colorClass} ${colorClass === "brand" ? "bg-brand text-on-brand" : "bg-on-brand text-ink"} font-sans font-semibold p-2.5`}
    >
      <span>{title}</span>
      <span className="text-3xl">{value}</span>
      <span>Date</span>
    </div>
  );
}
