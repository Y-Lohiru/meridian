import Link from "next/link";

export default function ProfileIcon() {
  const letter = "A";
  const name = "Name";

  return (
    <div className="flex flex-col gap-4 px-3 text-white">
      <Link
        href={"/profile"}
        className="flex flex-row items-center gap-3 rounded-md hover:opacity-90"
      >
        <div className="flex items-center justify-center size-9 shrink-0 rounded-full bg-on-brand text-brand text-sm font-semibold">
          {letter}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate">{name}</span>
          <span className="text-xs text-white/60">Store admin</span>
        </div>
        
      </Link>
    </div>
  );
}
