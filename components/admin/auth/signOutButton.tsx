"use client";

import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "@/app/utils/queries/admin";

export default function SignOutButton() {
    return (
        <button onClick={signOut} className="flex items-center gap-3 ml-3 px-3 py-3 mt-2 text-white/85 text-sm rounded-md hover:bg-white/10"><FiLogOut className="size-4" />Sign out</button>
    )
}