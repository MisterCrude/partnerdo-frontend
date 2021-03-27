import { isNil, omitBy } from 'lodash/fp';
import { IFiltersData } from '@src/models/proposal';
import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { URLParams } from '@src/utils/misc';

export const countOffset = (pageNumber: number) => (pageNumber - 1) * PAGINATION_ITEMS_LIMIT;

export const getQueryParamsString = (params: Record<string, string | undefined>) =>
    URLParams(omitBy(isNil, params) as Record<string, string>).toString();

export const getQueryParams = ({ age, pageNumber, city, categories, cityAreas, gender, search }: IFiltersData) =>
    getQueryParamsString({
        limit: String(PAGINATION_ITEMS_LIMIT),
        offset: String(countOffset(pageNumber || 1)),
        city: city || undefined,
        categories: categories.length ? categories.join(',') : undefined,
        city_areas: cityAreas.length ? cityAreas.join(',') : undefined,
        age: age.length ? age.join(',') : undefined,
        gender: gender.length === 1 ? gender[0] : undefined,
        search: search || undefined,
    });
