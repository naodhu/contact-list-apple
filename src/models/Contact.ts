import mongoose, { Schema, Document } from 'mongoose';

interface IContact extends Document {
    name: string;
    email: string;
    phone: string;
}

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);