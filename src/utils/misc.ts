import { camelCase, snakeCase, keys, isObject } from 'lodash/fp';

export const objCaseSwitcher = (caseSwitcher: typeof camelCase | typeof snakeCase) => {
    const foo: any = (data: any) =>
        keys(data).reduce(
            (acc: any, curr: any) => ({
                ...acc,
                [caseSwitcher(curr)]: isObject(data[curr]) ? foo(data[curr]) : data[curr],
            }),
            {}
        );

    return foo;
};

// TODO add types here
export const toCamelCase: any = objCaseSwitcher(camelCase);
export const toSnakeCase: any = objCaseSwitcher(snakeCase);
