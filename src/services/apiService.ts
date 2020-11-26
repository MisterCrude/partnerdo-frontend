import axios from 'axios';

import { compose, each, toPairs } from 'lodash/fp';
import { BACKENTD_BASE_URL } from '@config/api';
import { toCamelCase, toSnakeCase } from '@utils/misc';

const instace = axios.create({
    baseURL: BACKENTD_BASE_URL,
    transformRequest: (data: Record<string, unknown>) => {
        const payload: FormData = new FormData();

        each((item: string[]) => payload.set(item[0], item[1]), compose(toPairs, toSnakeCase)(data));

        return payload;
    },
    transformResponse: (data) => toCamelCase(data),
});

export default instace;
