export const CATEGORIES = [
    { id: 1, name: 'Informational' },
    { id: 2, name: 'Success' },
    { id: 3, name: 'Redirection' },
    { id: 4, name: 'Client Error' },
    { id: 5, name: 'Server Error' },
] as const;

export const categoryOf = (code: number) => Math.floor(code / 100);
