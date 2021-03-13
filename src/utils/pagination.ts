import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { URLParams } from '@src/utils/misc';

export const countOffset = (pageNumber: number) => (pageNumber - 1) * PAGINATION_ITEMS_LIMIT;

export const getQueryParams = (params: Record<string, string>) => URLParams(params).toString();
