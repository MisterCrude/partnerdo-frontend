import { PAGINATION_ITEMS_LIMIT } from '@consts/app';
import { URLParams } from '@src/utils/misc';

export const getQueryParams = (pageNumber: number) => {
    const countOffset = (pageNumber: number) => (pageNumber - 1) * PAGINATION_ITEMS_LIMIT;

    return URLParams({
        limit: String(PAGINATION_ITEMS_LIMIT),
        offset: String(countOffset(pageNumber)),
    });
};
