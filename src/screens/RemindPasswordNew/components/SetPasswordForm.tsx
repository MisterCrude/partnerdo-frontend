import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Box } from '@chakra-ui/react';
import { FormErrorMessage } from '@components/Form';
import PasswordField from '@components/PasswordField';

interface IInputs {
    password1: string;
    password2: string;
}

interface IProps {
    onSubmit: (formData: Record<string, string>) => void;
    isFetching?: boolean;
}

const validationSchema = yup.object().shape({
    password1: yup.string().required('To pole jest wymagane').max(128, 'Za długie hasło').min(8, 'Za krótkie hasło'),
    password2: yup
        .string()
        .required('To pole jest wymagane')
        .oneOf([yup.ref('password1')], 'Hasło się nie zgadza'),
});

const SetPasswordForm = ({ onSubmit, isFetching = false }: IProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IInputs>({
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
                <FormErrorMessage name="password1" errors={errors} />
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
                <FormErrorMessage name="password2" errors={errors} />
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
