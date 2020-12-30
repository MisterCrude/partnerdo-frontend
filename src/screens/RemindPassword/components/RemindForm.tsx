import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Box, Input, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

interface IInputs {
    email: string;
}

interface IProps {
    onSubmit: (formData: Record<string, unknown>) => void;
    isFetching?: boolean;
}

const validationSchema = yup.object().shape({
    email: yup.string().email('Nie prawidłowy adres email').required('To pole jest wymagane'),
});

const RemindForm: React.FC<IProps> = ({ onSubmit, isFetching = false }) => {
    const { register, errors, handleSubmit } = useForm<IInputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={{ base: 4, md: 8 }}>
                <Input
                    borderColor={errors.email ? 'tomato' : 'gray.200'}
                    borderWidth={errors.email ? 1 : 0}
                    bgColor="white"
                    name="email"
                    ref={register}
                    type="text"
                    size="lg"
                    shadow="base"
                    placeholder="Email"
                />
                {errors.email && (
                    <Text color="tomato" fontSize={15} mt={1}>
                        {errors.email.message}
                    </Text>
                )}
            </Box>

            <Button
                bgColor="gray.800"
                color="white"
                type="submit"
                variant="solid"
                width="100%"
                size="lg"
                shadow="base"
                mb={4}
                isLoading={isFetching}
                _active={{ bgColor: 'gray.800' }}
                _hover={{ bgColor: 'gray.600' }}
            >
                Wyślij
            </Button>
        </Box>
    );
};

export default RemindForm;
