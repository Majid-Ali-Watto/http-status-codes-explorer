import { StatusCodeDetails } from '@/types';
import Head from 'next/head';

interface CodeListProps {
    filteredCode: StatusCodeDetails[];
}

export default function CodeList({ filteredCode }: CodeListProps) {
    return (
        <div className="container mx-auto px-4 py-20 xs">

            <div className="grid grid-cols-1 gap-6">
                {filteredCode.length > 0 ? filteredCode.map((code, index) => (

                    StatusCode(code, index)
                )) : <h1 className="text-gray-700">No status code details found</h1>}
            </div>
        </div>
    );
}
function StatusCode(code: StatusCodeDetails, index: number) {
    return <details
        key={code.code}
        tabIndex={index + 3}
        className="code-container group bg-white transition-all overflow-hidden"
    >
        <summary
            className="-z-50 cursor-pointer flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors">
            <h2 className="lg:text-xl md:text-base sm:text-sm font-bold text-gray-700">
                {code.code} {code.title}
            </h2>
            <span className="text-gray-500 transition-transform group-open:rotate-90">
                ▶
            </span>
        </summary>
        <Head>
            {/* <title>{code.code} - {code.title}</title> */}
            <meta name="description" content={code.description} />
            <meta property="og:title" content={`${code.code} - ${code.title}`} />
            <meta property="og:description" content={code.description} />
            <meta property="og:url" content={`https://httpstatuscodes.vercel.app`} />
        </Head>
        <div className="p-4 border toggle">
            <p className="text-gray-600 mt-2">
                {code.description}
            </p>
            <p className="text-gray-500 mt-2">
                <span className="font-semibold">Example:</span>
                {code.example}
            </p>
        </div>
    </details>;
}

