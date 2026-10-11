import React from 'react';

interface SearchProps {
    query: string;
    onQueryChange: (query: string) => void;
}

export default function Search({ query, onQueryChange }: SearchProps): React.ReactElement {
    return (
        <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Search HTTP Status Codes"
            placeholder="Search status codes..."
            className="outline-none rounded flex text-black px-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
    );
}
