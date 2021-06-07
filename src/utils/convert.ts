import { IOption } from '@models/app';
import { RecordNamedItem } from '@models/misc';
import { camelCase, snakeCase, keys, isObject, isArray } from 'lodash/fp';

export const objCaseSwitcher = (caseSwitcher: typeof camelCase | typeof snakeCase, isDeep = true) => {
    // TODO replace any type
    const changeDictCase: any = (data: Record<string, unknown>) =>
        keys(data).reduce((acc: any, curr: any) => {
            // Check if key isn't number
            const normalizedKey = curr.match(/\d/g) ? curr : caseSwitcher(curr);

            return {
                ...acc,
                [normalizedKey]:
                    isArray(data[curr]) && isDeep
                        ? goThroughArray(data[curr])
                        : isObject(data[curr]) && isDeep
                        ? changeDictCase(data[curr])
                        : data[curr],
            };
        }, {});

    const goThroughArray = (arr: any) => arr.map((item: any) => (isObject(item) ? changeDictCase(item) : item));

    return changeDictCase;
};

export const toCamelCase = objCaseSwitcher(camelCase);
export const toSnakeCase = objCaseSwitcher(snakeCase, false);

export const toDict = <T extends Record<string, any>>(dict: Array<T>, keyField: string) =>
    dict.reduce((acc: Record<string, T>, curr: T) => ({ ...acc, [curr[keyField]]: curr }), {} as Record<string, T>);

export const toLocaleDateString = (date: string, locale: string) => new Date(date).toLocaleDateString(locale);

export const toLocaleTimeString = (date: string, locale: string) =>
    new Date(date).toLocaleString(locale, {
        minute: '2-digit',
        hour: '2-digit',
    });

export const toLocaleWithDayNameString = (date: string, locale: string) => {
    const secPerDay = 1000 * 24 * 60 * 60;
    const timeDifference = new Date().getTime() - new Date(date).getTime();

    const localeString = new Date(date).toLocaleString(locale, {
        day: '2-digit',
        month: '2-digit',
        weekday: 'long',
        year: '2-digit',
    });

    if (timeDifference <= secPerDay) {
        return `Dzisiaj, ${localeString.split(', ')[1]}`;
    }

    if (timeDifference <= secPerDay * 2 && timeDifference > secPerDay) {
        return `Wczoraj, ${localeString.split(', ')[1]}`;
    }

    if (timeDifference / secPerDay > 7) {
        return localeString.split(', ')[1];
    }

    return localeString[0].toUpperCase() + localeString.slice(1);
};

export const toOptions = (records: RecordNamedItem[]): IOption[] =>
    records.map(({ id, name }) => ({ value: id, label: name }));
