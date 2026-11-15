interface Details {
  title: string;
  value: string;
  colorClass: string;
}

export default function SummaryCard({ title, value, colorClass }: Details) {
  return (
    <div
      className={`flex flex-col gap-3 border rounded-xl w-full p-4 sm:p-6 min-h-28 sm:min-h-36 ${colorClass === "brand" ? "bg-brand border-brand text-on-brand" : "bg-on-brand border-line text-ink"} font-sans`}
    >
      <span className="text-xs sm:text-sm opacity-80">{title}</span>
      <span className="font-display text-3xl sm:text-4xl leading-none tabular-nums">{value}</span>
    </div>
  );
}
