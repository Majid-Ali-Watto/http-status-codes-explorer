export interface StatusCodeDetails {
    code: number;
    title: string;
    description: string;
    example: string;
    /** Example request body, when the request has one. */
    payload?: string;
    /** Example response headers (the status line is derived from code and title). */
    headers: Record<string, string>;
    /** Example response body, when there is one. */
    response?: string;
}
