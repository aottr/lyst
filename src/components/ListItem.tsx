import Link from "next/link";

type Props = {
    name: string;
    slug: string;
}

export default function ListItem(
    {name, slug}: Props,
) {
    return (
        <Link href={`/lists/${slug}`} className={`btn btn-lg btn-block mb-4 max-w-3xl mx-auto`}>
            {name}
        </Link>
    );
}
