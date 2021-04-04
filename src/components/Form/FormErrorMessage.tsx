import { FC } from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import { Text } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

interface IProps {
    errors: DeepMap<Record<string, any>, FieldError> | undefined;
    name: string;
}

export const FormErrorMessage: FC<IProps> = ({ name, errors }) => (
    <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
            <Text color="tomato" fontSize="sm">
                {message}
            </Text>
        )}
    />
);
