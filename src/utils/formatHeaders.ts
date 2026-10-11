import { StatusCodeDetails } from '@/types';

// Status line followed by the example response headers, as they appear on the wire.
export const formatResponseHeaders = ({ code, title, headers }: StatusCodeDetails) =>
    [`HTTP/1.1 ${code} ${title}`, ...Object.entries(headers).map(([name, value]) => `${name}: ${value}`)].join('\n');
