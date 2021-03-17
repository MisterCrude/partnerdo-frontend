export const URLParams = (params: Record<string, string>) => new URLSearchParams(params);

export const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const createArray = (items: number): undefined[] => Array(items).fill(undefined);

export const truncateStringByWords = (str: string, length: number): string =>
    `${str.split(' ').slice(0, length).join(' ').trim()}...`;
