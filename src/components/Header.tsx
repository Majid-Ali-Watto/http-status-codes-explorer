import React from "react";
import DownloadButton from "./DownloadButton";
import Search from "./Search";
import { StatusCodeDetails } from '@/types';

interface HeaderProps {
    query: string;
    onQueryChange: (query: string) => void;
    filteredCode: StatusCodeDetails[];
}

const Header: React.FC<HeaderProps> = ({ query, onQueryChange, filteredCode }) => {
    return (
        <header
            className="z-50 fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-wrap justify-between items-center gap-3"
            role="banner" // Added role for semantic purpose
        >
            <h1 className="lg:text-2xl md:text-xl sm:text-base font-bold text-center" aria-label="HTTP Status Codes Explorer">
                HTTP Status Codes Explorer
            </h1>
            <div className="flex flex-wrap justify-between items-center gap-3">
                <Search query={query} onQueryChange={onQueryChange} />
                {filteredCode?.length > 0 ? (
                    <DownloadButton filteredCode={filteredCode} />
                ) : (
                    <p className="text-gray-400 text-sm" role="status">No data to download</p> // Added role=status for screen readers
                )}
            </div>
        </header>
    );
};

export default Header;
