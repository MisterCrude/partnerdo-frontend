import React from 'react';

import { Button, Box, Input, Text } from '@chakra-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import PasswordField from '@components/PasswordField';

type Inputs = {
    username: string;
    password: string;
};

interface IProps {
    onSubmit: (formData: Record<string, unknown>) => void;
}

const validationSchema = yup.object().shape({
    username: yup.string().required('To pole jest wymagane'),
    password: yup.string().required('To pole jest wymagane'),
});

export const LoginForm: React.FC<IProps> = ({ onSubmit }) => {
    const { register, errors, handleSubmit } = useForm<Inputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={{ base: 4, md: 8 }}>
                <Input
                    borderColor={errors.username ? 'tomato' : 'gray.200'}
                    name="username"
                    mb={1}
                    ref={register({ required: true })}
                    size="lg"
                    placeholder="username"
                />
                {errors.username && (
                    <Text color="tomato" fontSize={15}>
                        {errors.username.message}
                    </Text>
                )}
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <PasswordField
                    borderColor={errors.password ? 'tomato' : 'gray.200'}
                    name="password"
                    mb={1}
                    ref={register({ required: true })}
                    size="lg"
                    placeholder="hasło"
                />
                {errors.password && (
                    <Text color="tomato" fontSize={15}>
                        {errors.password.message}
                    </Text>
                )}
            </Box>

            <Button
                backgroundColor="gray.800"
                color="white"
                type="submit"
                variant="solid"
                width="100%"
                size="lg"
                mb={4}
                _active={{ backgroundColor: 'gray.900' }}
                _hover={{ backgroundColor: 'gray.600' }}
            >
                Zaloguj się
            </Button>
        </Box>
    );
};

export default LoginForm;
