import axios, { AxiosRequestConfig } from 'axios';

import { each, keys } from 'lodash/fp';
import { BACKENTD_BASE_URL } from '@consts/api';
import { toCamelCase, toSnakeCase } from '@utils/convert';

const instace = axios.create({
    baseURL: BACKENTD_BASE_URL,
    transformRequest: (data: Record<string, unknown>) => {
        /**
         * Disable deep converting for toSnakeCase
         * in request body for sending object data
         * like File or FileList
         */
        const payloadFormData: FormData = new FormData();
        const normalizedData = toSnakeCase(data);
        const dataKeys = keys(normalizedData);

        each((key: string) => payloadFormData.set(key, normalizedData[key]), dataKeys);

        return payloadFormData;
    },
    transformResponse: (resp) => {
        if (resp) {
            const payloadJSON = JSON.parse(resp);

            return toCamelCase(payloadJSON);
        }
    },
});

instace.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) config.headers.Authorization = `token ${token}`;

    return config;
});

export default instace;
