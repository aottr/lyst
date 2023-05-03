import Link from "next/link";
import {IconAlignBoxBottomRight} from "@tabler/icons-react";
export default function Header() {
    return (
        <header>
            <div className="mb-6 sm:my-6 sm:rounded-2xl flex flex-wrap p-5 flex-col md:flex-row items-center bg-base-200">
                <Link href="/" className="btn btn-ghost flex title-font font-medium items-center">
                    <IconAlignBoxBottomRight />
                    <span className="ml-2 text-xl">Lyst</span>
                </Link>
            </div>
        </header>
    );
}
