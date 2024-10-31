import React, { useState, useEffect } from 'react';

interface ContactFormProps {
    onSubmit: (contact: { name: string; email: string; phone: string }) => void;
    initialData?: { name: string; email: string; phone: string };
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialData }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [email, setEmail] = useState(initialData?.email || "");
    const [phone, setPhone] = useState(initialData?.phone || "");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setPhone(initialData.phone);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, phone });
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-400"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-400"
                required
            />
            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-400"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-lg px-6 py-2 w-full hover:bg-blue-600 transition">
                Save Contact
            </button>
        </form>
    );
};

export default ContactForm;
