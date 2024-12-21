import { downloadPDFTable } from "@/utils/downloadPdf";
import Image from "next/image";
import { StatusCodeDetails } from '@/types';

interface CodeListProps {
    filteredCode: StatusCodeDetails[];
}

export default function DownloadButton({ filteredCode }: CodeListProps) {
    const handleDownload = () => {
        downloadPDFTable(filteredCode);
    };

    return (
        <button
            type="button"
            tabIndex={2}
            onClick={handleDownload}
            className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition"
            aria-label="Download HTTP Status Codes as PDF"
            role="button" // Added role="button" for better semantic structure
        >
            <Image
                src="/download.png"
                alt="Download HTTP Status Codes PDF" // Updated alt text for clarity
                width={30}
                height={30}
                className="cursor-pointer"
            />
        </button>
    );
}
