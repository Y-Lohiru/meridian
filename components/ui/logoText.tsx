import Image from "next/image";

export default function LogoText() {
    return (
        <div className="flex flex-row gap-1 p-1">
            <Image src={"/logo.png"} alt="logo" width={50} height={50}></Image>
            <span className="text-white font-display text-2xl pt-2.5">MERIDIAN</span>
        </div>
    )
}