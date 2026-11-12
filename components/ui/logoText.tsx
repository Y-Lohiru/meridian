import Image from "next/image";

export default function LogoText() {
    return (
        <div className="flex flex-row items-center gap-2">
            <Image src={"/logo.png"} alt="logo" width={32} height={32}></Image>
            <span className="text-white font-display text-xl tracking-[0.2em]">MERIDIAN</span>
        </div>
    )
}