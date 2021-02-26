import { IOption } from '@models/app';
import { camelCase, snakeCase, keys, isObject, isArray } from 'lodash/fp';

export const objCaseSwitcher = (caseSwitcher: typeof camelCase | typeof snakeCase) => {
    // TODO replace any type
    const changeDictCase: any = (data: any) =>
        keys(data).reduce((acc: any, curr: any) => {
            const isNeedsToChenge = isObject(data[curr]) && !isArray(data[curr]);

            return {
                ...acc,
                // if property name has numbers, don't do nothing
                [curr.match(/\d/g) ? curr : caseSwitcher(curr)]: isNeedsToChenge
                    ? changeDictCase(data[curr])
                    : data[curr],
            };
        }, {});

    return changeDictCase;
};

export const toCamelCase = objCaseSwitcher(camelCase);

export const toSnakeCase = objCaseSwitcher(snakeCase);

export const toOptions = (valuesHolder: string[] | Record<string, string>): IOption[] => {
    return isArray(valuesHolder)
        ? valuesHolder.map((value: string) => ({ value, label: value }))
        : keys(valuesHolder).map((value: string) => ({ value, label: valuesHolder[value] }));
};

export const noopFn = () => undefined;

export const arrayToDict = <T extends Record<string, any>>(dict: Array<T>, keyField: string) =>
    dict.reduce((acc: Record<string, T>, curr: T) => ({ ...acc, [curr[keyField]]: curr }), {} as Record<string, T>);
