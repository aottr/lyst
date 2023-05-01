import Head from 'next/head';
import type {GetServerSidePropsContext} from 'next';
import initPocketBase from '@/helpers/initPocketbase';
import ListCard from "@/components/ListCard";
import {Record} from "pocketbase";

export default function Dashboard({lists, isLoggedIn, authData}: { lists: any, isLoggedIn: boolean, authData: any }) {

    return (
        <>
            <Head>
                <title>{"Lyst - Dashboard"}</title>
            </Head>

            <div className="flex flex-wrap -m-4">
                {lists.map((list: any) => (
                    <ListCard name={list.name} slug={list.slug} regions={list.regions} entries={list.entries} key={list.slug}/>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const pb = await initPocketBase(context)
    const authData = await JSON.parse(JSON.stringify(pb.authStore));
    let permissions: string[] = [];

    if (!pb.authStore.isValid)
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };

    await pb
        .collection("users")
        .getOne(authData.baseModel.id)
        .then((res) => {
            permissions = res.permissions;
        })
        .catch(() => {
            permissions = [];
        });
    if (permissions.length == 0) {
        pb.authStore.clear()
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const lists = (await pb.collection('waitinglists').getList(1, 20, {expand: 'regions'})).items

    const retrieveEntryCount = (list: any) => pb.collection('entries').getList(1,1, {
        filter: `waitinglist="${list.id}"`
    }).then((result) => {
        return result.totalItems
    })

    return {
        props: {
            lists: await Promise.all(lists.map(async (record) => {
                return {
                    name: record.name,
                    slug: record.slug,
                    regions: record.expand.regions.map((record: Record) => {
                        return {id: record.id, label: record.label}
                    }),
                    entries: await retrieveEntryCount(record)
                }
            })),
            isLoggedIn: pb.authStore.isValid,
            authData: authData.baseModel
        }
    }
}
