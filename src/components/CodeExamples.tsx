import { StatusCodeDetails } from '@/types';
import { formatResponseHeaders } from '@/utils/formatHeaders';

function Block({ label, children }: { label: string; children?: string }) {
    return (
        <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">{label}</h4>
            {children ? (
                <pre className="bg-gray-900 text-gray-100 text-xs rounded p-3 overflow-x-auto whitespace-pre-wrap break-words">{children}</pre>
            ) : (
                <p className="text-xs text-gray-400 italic">None</p>
            )}
        </div>
    );
}

export default function CodeExamples({ code }: { code: StatusCodeDetails }) {
    return (
        <div>
            <Block label="Request payload">{code.payload}</Block>
            <Block label="Response headers">{formatResponseHeaders(code)}</Block>
            <Block label="Response body">{code.response}</Block>
        </div>
    );
}
