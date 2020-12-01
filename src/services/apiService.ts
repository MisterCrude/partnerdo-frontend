import axios, { AxiosRequestConfig } from 'axios';

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
    transformResponse: (resp) => {
        const payload = JSON.parse(resp);

        return toCamelCase(payload);
    },
});

instace.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) config.headers.Authorization = `token ${token}`;

    return config;
});

export default instace;
