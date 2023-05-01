import Link from "next/link";
import {IconArrowNarrowRight, IconMail} from '@tabler/icons-react'

type Props = {
    name: string;
    slug: string;
    regions: any;
    entries: number;
}
export default function ListCard(
    {name, slug, regions, entries}: Props,
) {
    return (
        <>
        <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="title-font text-2xl font-medium mb-3">{`${name}`}</h1>
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Regions</h2>
                    <div className="flex flex-wrap mt-1 mb-8">
                        {
                            regions.map((region: any) => (
                                <div className="badge badge-primary mr-2" key={region.id}>{region.label}</div>
                            ))
                        }
                    </div>
                    <div className="flex items-center flex-wrap ">
                        <Link href={`/dashboard/${slug}`} className="btn btn-accent btn-sm inline-flex items-center md:mb-2 lg:mb-0">
                            Open detailed view
                            <IconArrowNarrowRight />
                        </Link>
                        <span
                            className="mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1"></span>
                        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                <IconMail className="mr-1" />{entries}
              </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
