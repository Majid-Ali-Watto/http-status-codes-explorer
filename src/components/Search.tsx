import statusCodes from '@/assets/codes-list';
import React, { useState } from 'react';
import { StatusCodeDetails } from '@/types';
import Head from 'next/head';

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
        <>
            {/* SEO Head Component */}
            <Head>
                <title>Search HTTP Status Codes - {query || 'Explore HTTP Status Codes'}</title>
                <meta
                    name="description"
                    content={
                        query
                            ? `Search results for "${query}" in HTTP Status Codes. Explore status codes with descriptions and examples.`
                            : 'Explore HTTP Status Codes with descriptions and examples. Search and filter status codes.'
                    }
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={`Search HTTP Status Codes - ${query || 'Explore HTTP Status Codes'}`} />
                <meta
                    property="og:description"
                    content={
                        query
                            ? `Search results for "${query}" in HTTP Status Codes.`
                            : 'Explore HTTP Status Codes with descriptions and examples.'
                    }
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://httpstatuscodesexplorer.vercel.app/" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SearchAction",
                            "target": `https://httpstatuscodesexplorer.vercel.app/?query={search_term_string}`,
                            "query-input": "required name=search_term_string",
                        }),
                    }}
                />
            </Head>

            <input
                type="search"
                value={query}
                onChange={handleSearch}
                tabIndex={1}
                aria-label="Search HTTP Status Codes"
                placeholder="Search status codes..."
                className="outline-none rounded flex text-black px-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
        </>
    );
}
