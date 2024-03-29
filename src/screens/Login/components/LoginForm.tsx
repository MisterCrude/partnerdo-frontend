import { RequestStatus } from '@typing/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Box, Input } from '@chakra-ui/react';
import { FormErrorMessage } from '@components/Form';
import PasswordField from '@components/PasswordField';

export interface IInputs {
    username: string;
    password: string;
}

interface IProps {
    requestStatus: RequestStatus;
    onSubmit: (formData: IInputs) => void;
}

const validationSchema = yup.object().shape({
    username: yup.string().required('To pole jest wymagane'),
    password: yup.string().required('To pole jest wymagane'),
});

const LoginForm = ({ onSubmit, requestStatus }: IProps) => {
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
                    bgColor="white"
                    type="text"
                    size="lg"
                    placeholder="Nazwa użytkownika"
                    {...register('username')}
                />
                <FormErrorMessage name="username" errors={errors} />
            </Box>

            <Box mb={{ base: 4, md: 8 }}>
                <PasswordField
                    borderColor={errors.username ? 'tomato' : 'gray.200'}
                    size="lg"
                    placeholder="Hasło"
                    {...register('password')}
                />
                <FormErrorMessage name="password" errors={errors} />
            </Box>

            <Button
                bgColor="gray.800"
                color="white"
                type="submit"
                variant="solid"
                width="100%"
                size="lg"
                mb={4}
                isLoading={isFetching}
                _active={{ bgColor: 'gray.800' }}
                _hover={{ bgColor: 'gray.600' }}
            >
                Zaloguj się
            </Button>
        </Box>
    );
};

export default LoginForm;
