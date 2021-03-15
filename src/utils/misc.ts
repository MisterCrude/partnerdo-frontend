import { IOption } from '@models/app';
import { RecordNamedItem } from '@models/misc';
import { camelCase, snakeCase, keys, isObject, isArray } from 'lodash/fp';

// TODO split this file to separate files grouped by category
export const objCaseSwitcher = (caseSwitcher: typeof camelCase | typeof snakeCase) => {
    // TODO replace any type
    const changeDictCase: any = (data: any) =>
        keys(data).reduce((acc: any, curr: any) => {
            // Dict key is number, not a string
            const normalizedKey = curr.match(/\d/g) ? curr : caseSwitcher(curr);

            return {
                ...acc,
                [normalizedKey]: isArray(data[curr])
                    ? goThroughArray(data[curr])
                    : isObject(data[curr])
                    ? changeDictCase(data[curr])
                    : data[curr],
            };
        }, {});

    const goThroughArray = (arr: any) => arr.map((item: any) => (isObject(item) ? changeDictCase(item) : item));

    return changeDictCase;
};

export const toCamelCase = objCaseSwitcher(camelCase);

export const toSnakeCase = objCaseSwitcher(snakeCase);

export const noopFn = () => undefined;

export const arrayToDict = <T extends Record<string, any>>(dict: Array<T>, keyField: string) =>
    dict.reduce((acc: Record<string, T>, curr: T) => ({ ...acc, [curr[keyField]]: curr }), {} as Record<string, T>);

export const URLParams = (params: Record<string, string>) => new URLSearchParams(params);

export const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const createArray = (items: number): undefined[] => Array(items).fill(undefined);

export const truncateStringByWords = (str: string, length: number): string =>
    `${str.split(' ').slice(0, length).join(' ').trim()}...`;

export const toLocaleDateString = (date: string, locale: string) => new Date(date).toLocaleDateString(locale);

export const recordToOptions = (records: RecordNamedItem[]): IOption[] =>
    records.map(({ id, name }) => ({ value: id, label: name }));
