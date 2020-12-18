import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Box, Input, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import PasswordField from '@components/PasswordField';

type Inputs = {
    username: string;
    password: string;
};

interface IProps {
    isFetching: boolean;
    onSubmit: (formData: Record<string, unknown>) => void;
}

const validationSchema = yup.object().shape({
    username: yup.string().required('To pole jest wymagane'),
    password: yup.string().required('To pole jest wymagane'),
});

export const LoginForm: React.FC<IProps> = ({ onSubmit, isFetching }) => {
    const { register, errors, handleSubmit } = useForm<Inputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={{ base: 4, md: 8 }}>
                <Input
                    borderColor={errors.username ? 'tomato' : 'gray.200'}
                    borderWidth={errors.username ? 1 : 0}
                    backgroundColor="white"
                    name="username"
                    ref={register}
                    type="text"
                    size="lg"
                    shadow="base"
                    placeholder="Nazwa użytkownika"
                />
                {errors.username && (
                    <Text color="tomato" fontSize={15} mt={1}>
                        {errors.username.message}
                    </Text>
                )}
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <PasswordField
                    borderColor={errors.username ? 'tomato' : 'gray.200'}
                    borderWidth={errors.username ? 1 : 0}
                    name="password"
                    ref={register}
                    size="lg"
                    shadow="base"
                    placeholder="Hasło"
                />
                {errors.password && (
                    <Text color="tomato" fontSize={15} mt={1}>
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
                shadow="base"
                mb={4}
                isLoading={isFetching}
                _active={{ backgroundColor: 'gray.800' }}
                _hover={{ backgroundColor: 'gray.600' }}
            >
                Zaloguj się
            </Button>
        </Box>
    );
};

export default LoginForm;
