import css from "./Header.module.css";
import Link from "next/link";
import { useThemeStore } from "@/store/useThemeStore";


export default function Header() { 
    return (
        <div>
            <Link href="/signup">SignUp</Link>
    </div>
)
}