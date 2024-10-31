import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Contact from '../../../models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { id } = req.query;

    if (req.method === 'PUT') {
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedContact);
    } else if (req.method === 'DELETE') {
        await Contact.findByIdAndDelete(id);
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
