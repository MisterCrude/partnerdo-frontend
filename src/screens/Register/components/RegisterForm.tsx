import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { RequestStatus } from '@typing/api';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Box, Input } from '@chakra-ui/react';
import { FormErrorMessage } from '@components/Form';
import PasswordField from '@components/PasswordField';

export interface IInputs {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

interface IProps {
    onSubmit: (formData: IInputs) => void;
    requestStatus?: RequestStatus;
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

export const LoginForm: React.FC<IProps> = ({ onSubmit, requestStatus }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IInputs>({
        resolver: yupResolver(validationSchema),
    });

    const isFetching = requestStatus === RequestStatus.FETCHING;

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={{ base: 4, md: 8 }}>
                <Input
                    borderColor={errors.username ? 'tomato' : 'gray.200'}
                    name="username"
                    ref={register}
                    type="text"
                    placeholder="Nazwa użytkownika"
                    size="lg"
                />
                <FormErrorMessage name="username" errors={errors} />
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <Input
                    borderColor={errors.email ? 'tomato' : 'gray.200'}
                    name="email"
                    ref={register}
                    type="text"
                    placeholder="Email"
                    size="lg"
                />
                <FormErrorMessage name="email" errors={errors} />
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <PasswordField
                    borderColor={errors.password1 ? 'tomato' : 'gray.200'}
                    name="password1"
                    ref={register}
                    placeholder="Hasło"
                    size="lg"
                />
                <FormErrorMessage name="password1" errors={errors} />
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <PasswordField
                    borderColor={errors.password2 ? 'tomato' : 'gray.200'}
                    name="password2"
                    ref={register}
                    placeholder="Powtórz hasło"
                    size="lg"
                />
                <FormErrorMessage name="password2" errors={errors} />
            </Box>

            <Button
                bgColor="gray.800"
                color="white"
                mb={{ base: 4, md: 8 }}
                size="lg"
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
