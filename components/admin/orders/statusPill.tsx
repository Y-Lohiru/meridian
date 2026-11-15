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
      className={`inline-flex w-fit h-7 items-center justify-center whitespace-nowrap rounded-full border px-3 text-xs font-semibold ${colorClass}`}
    >
      {status}
    </div>
  );
}
