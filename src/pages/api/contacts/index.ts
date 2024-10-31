import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb'
import Contact from '../../../models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } else if (req.method === 'POST') {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
