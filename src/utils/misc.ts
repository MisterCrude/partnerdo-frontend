import { IOption } from '@models/app';
import { camelCase, snakeCase, keys, isObject, isArray } from 'lodash/fp';

export const objCaseSwitcher = (caseSwitcher: typeof camelCase | typeof snakeCase) => {
    // TODO replace any type
    const foo: any = (data: any) =>
        keys(data).reduce(
            (acc: any, curr: any) => ({
                ...acc,
                // if property name has numbers, don't do nothing
                [curr.match(/\d/g) ? curr : caseSwitcher(curr)]: isObject(data[curr]) ? foo(data[curr]) : data[curr],
            }),
            {}
        );

    return foo;
};

export const toCamelCase = objCaseSwitcher(camelCase);

export const toSnakeCase = objCaseSwitcher(snakeCase);

export const toOptions = (valuesHolder: string[] | Record<string, string>): IOption[] => {
    return isArray(valuesHolder)
        ? valuesHolder.map((value: string) => ({ value, label: value }))
        : keys(valuesHolder).map((value: string) => ({ value, label: valuesHolder[value] }));
};

export const noopFn = () => undefined;
