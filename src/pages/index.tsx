import {Inter} from 'next/font/google'
import Head from 'next/head';
import type {ReactElement} from "react";
import initPocketBase from "@/helpers/initPocketbase";
import {GetServerSidePropsContext} from "next";
import ListItem from "@/components/ListItem";
import Layout from '@/components/layout';

export default function Home({lists, isLoggedIn}: { lists: any, isLoggedIn: boolean }) {

    return (
        <>
            <Head>
                <title>Lyst</title>
            </Head>
            <div className="flex">
                {lists.map((list: any) => (
                    <ListItem name={list.name} slug={list.slug} key={list.slug}/>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const pb = await initPocketBase(context);
    const authData = JSON.parse(JSON.stringify(pb.authStore));
    const lists = (await pb.collection('waitinglists').getList()).items

    return {
        props: {
            isLoggedIn: pb.authStore.isValid,
            authData: authData.baseModel,
            lists: lists.map((record) => {
                return {name: record.name, slug: record.slug}
            }),
        }
    }
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
