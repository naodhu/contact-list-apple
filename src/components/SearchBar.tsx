import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

interface SearchBarProps {
    searchTerm: string;
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
    const handleClear = () => {
        onSearch('');
    };

    return (
        <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <AiOutlineSearch className="text-gray-500" size={20} />
            </div>
            <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 outline-none transition duration-200 text-gray-700"
            />
            {searchTerm && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-red-500 transition"
                >
                    <AiOutlineClose size={20} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
