import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Box, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import PasswordField from '@components/PasswordField';

interface IInputs {
    password1: string;
    password2: string;
}

interface IProps {
    onSubmit: (formData: Record<string, unknown>) => void;
    isFetching?: boolean;
}

const validationSchema = yup.object().shape({
    password1: yup.string().required('To pole jest wymagane').max(128, 'Za długie hasło').min(8, 'Za krótkie hasło'),
    password2: yup
        .string()
        .required('To pole jest wymagane')
        .oneOf([yup.ref('password1')], 'Hasło się nie zgadza'),
});

const SetPasswordForm: React.FC<IProps> = ({ onSubmit, isFetching = false }) => {
    const { register, errors, handleSubmit } = useForm<IInputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
                    <Text color="tomato" fontSize={15} mt={1}>
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

export default SetPasswordForm;
