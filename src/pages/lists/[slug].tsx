import initPocketBase from "@/helpers/initPocketbase";
import type {GetServerSidePropsContext} from "next";
import Head from "next/head";
import Link from "next/link";
import {Record} from "pocketbase";
import {useState} from "react";
import {IconSend} from "@tabler/icons-react";
import SuccessAlert from "@/components/alerts/success";
import WarningAlert from "@/components/alerts/warning";
import InfoAlert from "@/components/alerts/info";
import ErrorAlert from "@/components/alerts/error";

type RegionObject = {
    id: string;
    label: string;
}

type ListObject = {
    id: string;
    name: string;
    slug: string;
    regions: [RegionObject];
}

export default function ListView({list}: { list: ListObject }) {

    const [selectedRegion, setRegion] = useState(list.regions[0].id);
    const [isSuccess, setSuccess] = useState(false);
    const [isError, setError] = useState(false);
    const [isWarning, setWarning] = useState({active: false, text: ''});
    const [isDuplicate, setDuplicate] = useState(false);

    const handleSubmit = async (event: any) => {

        event.preventDefault();
        // reset states
        setSuccess(false);
        setError(false);
        setDuplicate(false);
        setWarning({active: false, text: ''})

        try {
            const data = JSON.stringify({
                email: event.target.email.value,
                region: selectedRegion,
                list: list.id
            });

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }

            const response = await fetch('/api/entries/add', options);
            if (response.status == 201) {
                setSuccess(true);
            } else if (response.status == 400) {
                const text = (await response.json()).text
                setWarning({active: true, text: text});
            } else if (response.status == 409) {
                setDuplicate(true);
            } else if (response.status >= 500) {
                setError(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Head>
                <title>{`Lyst - ${list.name}`}</title>
            </Head>

            <div>
                {
                    isSuccess && <SuccessAlert text={`Your mail address has been added to the waitinglist!`}/>
                }
                {
                    isWarning.active && <WarningAlert text={isWarning.text}/>
                }
                {
                    isDuplicate && <InfoAlert text={`The entered mail address has been added to the list already.`}/>
                }
                {
                    isError && <ErrorAlert
                        text={`There has been an unhandled error. Please contact the admin: alex@tailbyte.org`}/>
                }
                <form onSubmit={handleSubmit}>
                    <div className="form-control max-w-md mx-auto">
                        <h1 className="text-3xl my-4">{list.name}</h1>

                        <div className="form-control my-2">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Your email address</span>
                            </label>
                            <input
                                type="email"
                                placeholder="awesome@aottr.dev"
                                name="email"
                                className="input input-bordered border-primary"
                            />
                        </div>
                        <div className="form-control my-2">
                            <label className="label">
                                <span className="label-text">Your preferred warehouse region</span>
                            </label>
                            <div className="btn-group btn-group-vertical">
                                {list.regions.map((region: RegionObject) => (
                                    <span className={`btn ${selectedRegion == region.id ? 'btn-active' : ''}`}
                                          key={region.id} onClick={() => {
                                        setRegion(region.id)
                                    }}>
                                    {region.label}
                                </span>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success my-2">
                            Put me on the list ! <IconSend className="ml-2"/>
                        </button>
                    </div>
                </form>
                <Link href="/" className="btn mt-10">Back</Link>
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const pb = await initPocketBase(context);
    const {slug} = context.query
    try {
        const list = await pb.collection('waitinglists').getFirstListItem(`slug="${slug}"`, {
            expand: 'regions'
        })
        const ret = list ? {
            id: list.id,
            name: list.name,
            slug: list.slug,
            regions: list.expand.regions.map((record: Record) => {
                return {id: record.id, label: record.label}
            }),

        } as ListObject : null

        return {
            props: {
                list: ret
            }
        }
    } catch (error) {
        const {res} = context
        res.writeHead(301, {Location: '/'})
        res.end()
        return true
    }
}
