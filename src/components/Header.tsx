import React from "react";
import DownloadButton from "./DownloadButton";
import Search from "./Search";
import { StatusCodeDetails } from '@/types';

interface CodeListProps {
    setFilteredCode: React.Dispatch<React.SetStateAction<StatusCodeDetails[]>>;
    filteredCode: StatusCodeDetails[];
}

const Header: React.FC<CodeListProps> = ({ setFilteredCode, filteredCode }) => {
    return (
        <header className="z-50 fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-wrap justify-between items-center gap-3">
            <h1 className="lg:text-2xl md:text-xl sm:text-base font-bold text-center" aria-label="HTTP Status Codes">
                HTTP Status Codes Explorer
            </h1>
            <div className="flex flex-wrap justify-between items-center gap-3">
                <Search setFilteredCode={setFilteredCode} />
                {filteredCode?.length > 0 ? (
                    <DownloadButton filteredCode={filteredCode} />
                ) : (
                    <p className="text-gray-400 text-sm">No data to download</p>
                )}
            </div>
        </header>
    );
};

export default Header;
