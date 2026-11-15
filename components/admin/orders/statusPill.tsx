export default function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();

  let colorClass = "border-warning text-warning";
  if (s === "to ship")
    colorClass = "bg-status-toship border-status-toship text-on-brand";
  if (s === "shipped") colorClass = "border-status-shipped text-brand";
  if (s === "delivered")
    colorClass = "bg-status-delivered border-status-delivered text-ink";

  return (
    <div
      className={`flex border px-2.5 py-0.5 text-xs font-semibold items-center justify-center ${colorClass} rounded-2xl w-24 h-8`}
    >
      {status}
    </div>
  );
}
