import Image from "next/image";
import { StatusCodeDetails } from '@/types';

interface CodeListProps {
    filteredCode: StatusCodeDetails[];
}

export default function DownloadButton({ filteredCode }: CodeListProps) {
    // Loaded on demand: jsPDF is heavy and only needed when the user downloads.
    const handleDownload = async () => {
        const { downloadPDFTable } = await import("@/utils/downloadPdf");
        downloadPDFTable(filteredCode);
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition"
            aria-label="Download HTTP Status Codes as PDF"
        >
            <Image
                src="/download.png"
                alt=""
                width={30}
                height={30}
                className="cursor-pointer"
                priority={false}
            />
        </button>
    );
}
