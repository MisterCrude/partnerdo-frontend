import { isNil, omitBy } from 'lodash/fp';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { URLParams } from '@src/utils/misc';

export const countOffset = (pageNumber: number) => (pageNumber - 1) * PAGINATION_ITEMS_LIMIT;

export const getQueryParamsString = (params: Record<string, string | undefined>) =>
    URLParams(omitBy(isNil, params) as Record<string, string>).toString();
