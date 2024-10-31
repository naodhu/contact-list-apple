import { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from '../components/ContactForm';
import ContactItem from '../components/ContactItem';
import SearchBar from '../components/SearchBar';
import { Contact } from '@/types/contact';

const IndexPage = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const response = await axios.get('/api/contacts');
        setContacts(response.data);
    };

    const addContact = async (contact: Omit<Contact, '_id'>) => {
        const response = await axios.post('/api/contacts', contact);
        setContacts([...contacts, response.data]);
    };

    const updateContact = async (updatedContact: Contact) => {
        const response = await axios.put(`/api/contacts/${updatedContact._id}`, updatedContact);
        setContacts(contacts.map((c) => (c._id === updatedContact._id ? response.data : c)));
    };

    const deleteContact = async (id: string) => {
        await axios.delete(`/api/contacts/${id}`);
        setContacts(contacts.filter((c) => c._id !== id));
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
    );

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Contacts</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            </div>


            {/* Contact Form */}
            <ContactForm
                onSubmit={(contact) => {
                    if (isEditing && editingContact) {
                        updateContact({ ...editingContact, ...contact });
                        setIsEditing(false);
                        setEditingContact(null);
                    } else {
                        addContact(contact);
                    }
                }}
                initialData={editingContact}
            />

            {/* Filtered Contact List */}
            <div className="mt-6">
                {filteredContacts.map((contact) => (
                    <ContactItem
                        key={contact._id}
                        contact={contact}
                        onDelete={deleteContact}
                        onEdit={(contact) => {
                            setIsEditing(true);
                            setEditingContact(contact);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default IndexPage;
