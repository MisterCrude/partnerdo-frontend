import { camelCase, keys, isObject } from 'lodash/fp';

export const camelCaseResponce: any = (resp: any) => {
    return keys(resp).reduce(
        (acc: any, curr: any) => ({
            ...acc,
            [camelCase(curr)]: isObject(resp[curr]) ? camelCaseResponce(resp[curr]) : resp[curr],
        }),
        {}
    );
};
