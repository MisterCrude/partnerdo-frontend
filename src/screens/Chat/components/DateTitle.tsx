import { DEFAULT_LOCALE } from '@consts/app';
import { toLocaleWithDayNameString } from '@utils/convert';

import { Text } from '@chakra-ui/react';

interface IProps {
    currentCreatedDate: string;
    prevCreatedDate: string;
}

const DateTitle = ({ currentCreatedDate, prevCreatedDate }: IProps) => {
    const newTitle = toLocaleWithDayNameString(currentCreatedDate, DEFAULT_LOCALE);
    const prevTitle = toLocaleWithDayNameString(prevCreatedDate || '', DEFAULT_LOCALE);

    return newTitle !== prevTitle ? (
        <Text color="gray.500" fontSize="sm" fontWeight="bold">
            {newTitle}
        </Text>
    ) : null;
};

export default DateTitle;
