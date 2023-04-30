import MainNav from "@/components/nav/MainNav";
import Link from "next/link";
import {IconAlignBoxBottomRight} from "@tabler/icons-react";
export default function Header() {
    return (
        <header>
            <div className="my-6 rounded-2xl flex flex-wrap p-5 flex-col md:flex-row items-center bg-base-200">
                <Link href="/" className="btn btn-ghost flex title-font font-medium items-center mb-4 md:mb-0">
                    <IconAlignBoxBottomRight />
                    <span className="ml-2 text-xl">Lyst</span>
                </Link>
            <MainNav />
            </div>
        </header>
    );
}
