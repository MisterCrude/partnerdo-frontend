import { STATIC_FILTES_URL } from '@consts/api';

export const URLParams = (params: Record<string, string>) => new URLSearchParams(params);

export const scrollTop = () => {
    window.scrollTo({ top: 0 });
};

export const createArray = (items: number): undefined[] => Array(items).fill(undefined);

export const truncateStringByWords = (str: string, maxWords: number): string =>
    str.split(' ').length <= maxWords ? str : `${str.split(' ').slice(0, maxWords).join(' ').trim()}...`;

export const getStaticURL = (path: string) => `${STATIC_FILTES_URL}${path}`;
