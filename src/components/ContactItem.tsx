import React from 'react';
import { Contact } from '@/types/contact'; // Import the Contact type
import { MdDelete, MdEdit } from 'react-icons/md'; // Icons for delete/edit

interface ContactItemProps {
    contact: Contact;
    onDelete: (id: string) => void;
    onEdit: (contact: Contact) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onDelete, onEdit }) => {
    // Generate initials if no profile picture is available
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 mb-4 hover:shadow-lg transition-shadow">
            <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg">
                {getInitials(contact.name)}
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{contact.name}</h3>
                <p className="text-gray-500 text-sm">{contact.email}</p>
                <p className="text-gray-500 text-sm">{contact.phone}</p>
            </div>
            <div className="flex space-x-2">
                <button onClick={() => onEdit(contact)} className="text-blue-500">
                    <MdEdit size={20} />
                </button>
                <button onClick={() => onDelete(contact._id)} className="text-red-500">
                    <MdDelete size={20} />
                </button>
            </div>
        </div>
    );
};

export default ContactItem;
