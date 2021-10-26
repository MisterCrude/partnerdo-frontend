import axios, { AxiosRequestConfig } from 'axios';

import { each, keys } from 'lodash/fp';
import { BASE_URL } from '@consts/api';
import { toCamelCase, toSnakeCase } from '@utils/convert';

const instace = axios.create({
    baseURL: BASE_URL,
    transformRequest: (data: Record<string, unknown>) => {
        /**
         * Disable deep converting for @toSnakeCase
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
    let newConfig = { ...config };

    if (token) {
        newConfig = {
            ...newConfig,
            headers: {
                ...newConfig.headers,
                Authorization: `token ${token}`,
            },
        };
    }

    return newConfig;
});

export default instace;
