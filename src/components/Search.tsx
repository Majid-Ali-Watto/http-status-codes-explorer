import statusCodes from '@/assets/codes-list';
import React, { useState } from 'react';
import { StatusCodeDetails } from '@/types';

interface CodeListProps {
    setFilteredCode: (code: StatusCodeDetails[]) => void;
}

export default function Search({ setFilteredCode }: CodeListProps): React.ReactElement {
    const [query, setQuery] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setQuery(value);

        // Filter codes based on query
        const filteredCodes = statusCodes.filter((code) =>
            String(code.code).toLowerCase().includes(value) || code.title.toLowerCase().includes(value)
        );

        setFilteredCode(filteredCodes);
    };

    return (
        <input
            type="search"
            value={query}
            onChange={handleSearch}
            tabIndex={1}
            aria-label="Search HTTP Status Codes"
            placeholder="Search status codes..."
            className="outline-none rounded flex text-black px-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
    );
}
