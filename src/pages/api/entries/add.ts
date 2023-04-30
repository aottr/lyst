import type { NextApiRequest, NextApiResponse } from 'next'
import PocketBase from "pocketbase";

type Data = {
    text?: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>) {

    try{
        const {email, list, region} = req.body;

        if (!email) return res.status(400).json({text: 'Please enter an email address!'});
        if (!list) return res.status(400).json({text: 'The list is missing!'});
        if (!region) return res.status(400).json({text: 'The region is missing!'});

        const pb = new PocketBase(process.env.POCKETBASE_HOST);
        const authData = await pb.admins.authWithPassword(
            process.env.POCKETBASE_EMAIL || '',
            process.env.POCKETBASE_PASSWORD || ''
        );
        // check for duplicate
        try {
            const entry = await pb.collection('entries').getFirstListItem(
                `waitinglist="${list}" && email="${email}"`
            )
            return res.status(409).json({});
        } catch (e) {}

        const entry = await pb.collection('entries').create({
            email: email,
            waitinglist: list,
            region: region,
        });
        pb.authStore.clear();

        return res.status(201).json({});
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({})
    }
}
