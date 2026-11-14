interface Details {
  title: string;
  value: string;
  colorClass: string;
}

export default function SummaryCard({ title, value, colorClass }: Details) {
  return (
    <div
      className={`flex flex-col gap-1.5 border rounded-lg w-full p-4 ${colorClass === "brand" ? "bg-brand border-brand text-on-brand" : "bg-on-brand border-line text-ink"} font-sans`}
    >
      <span className="text-xs opacity-80">{title}</span>
      <span className="font-display text-2xl sm:text-3xl tabular-nums">{value}</span>
      <span className="hidden sm:block text-xs opacity-60">Date</span>
    </div>
  );
}
