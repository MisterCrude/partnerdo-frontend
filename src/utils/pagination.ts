import { isNil, omitBy } from 'lodash/fp';
import { URLParams } from '@src/utils/misc';

export const countOffset = (pageNumber: number, limitPerPage: number) => (pageNumber - 1) * limitPerPage;

export const getQueryParamsString = (params: Record<string, string | undefined>) =>
    URLParams(omitBy(isNil, params) as Record<string, string>).toString();
