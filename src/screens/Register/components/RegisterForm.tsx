import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Box, Input, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import PasswordField from '@components/PasswordField';

interface IInputs {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

interface IProps {
    onSubmit: (formData: Record<string, unknown>) => void;
    isFetching?: boolean;
}

const validationSchema = yup.object().shape({
    username: yup.string().required('To pole jest wymagane').max(30, 'Za długi username'),
    email: yup.string().email('Nie prawidłowy adres email').required('To pole jest wymagane'),
    password1: yup.string().required('To pole jest wymagane').max(128, 'Za długie hasło').min(8, 'Za krótkie hasło'),
    password2: yup
        .string()
        .required('To pole jest wymagane')
        .oneOf([yup.ref('password1')], 'Hasło się nie zgadza'),
});

export const LoginForm: React.FC<IProps> = ({ onSubmit, isFetching = false }) => {
    const { register, errors, handleSubmit } = useForm<IInputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={{ base: 4, md: 8 }}>
                <Input
                    borderColor={errors.username ? 'tomato' : 'gray.200'}
                    borderWidth={errors.username ? 1 : 0}
                    name="username"
                    ref={register}
                    type="text"
                    placeholder="Nazwa użytkownika"
                    size="lg"
                    shadow="base"
                />
                {errors.username && (
                    <Text color="tomato" fontSize="sm" mt={1}>
                        {errors.username.message}
                    </Text>
                )}
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <Input
                    borderColor={errors.email ? 'tomato' : 'gray.200'}
                    borderWidth={errors.email ? 1 : 0}
                    name="email"
                    ref={register}
                    type="text"
                    placeholder="Email"
                    size="lg"
                    shadow="base"
                />
                {errors.email && (
                    <Text color="tomato" fontSize="sm" mt={1}>
                        {errors.email.message}
                    </Text>
                )}
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <PasswordField
                    borderColor={errors.password1 ? 'tomato' : 'gray.200'}
                    borderWidth={errors.password1 ? 1 : 0}
                    name="password1"
                    ref={register}
                    placeholder="Hasło"
                    size="lg"
                    shadow="base"
                />
                {errors.password1 && (
                    <Text color="tomato" fontSize="sm" mt={1}>
                        {errors.password1.message}
                    </Text>
                )}
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <PasswordField
                    borderColor={errors.password2 ? 'tomato' : 'gray.200'}
                    borderWidth={errors.password2 ? 1 : 0}
                    name="password2"
                    ref={register}
                    placeholder="Powtórz hasło"
                    size="lg"
                    shadow="base"
                />
                {errors.password2 && (
                    <Text color="tomato" fontSize="sm" mt={1}>
                        {errors.password2.message}
                    </Text>
                )}
            </Box>

            <Button
                bgColor="gray.800"
                color="white"
                mb={{ base: 4, md: 8 }}
                size="lg"
                shadow="base"
                type="submit"
                variant="solid"
                w="100%"
                isLoading={isFetching}
                _active={{ bgColor: 'gray.800' }}
                _hover={{ bgColor: 'gray.600' }}
            >
                Zarejestruj się
            </Button>
        </Box>
    );
};

export default LoginForm;
