import Image from "next/image";

export default function Logo() {
    return (
        <div>
            <Image src={"/logo.png"} alt="logo" height={50} width={50}></Image>
        </div>
    )
}