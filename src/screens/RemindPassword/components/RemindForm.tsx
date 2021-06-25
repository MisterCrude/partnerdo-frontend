import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Box, Input } from '@chakra-ui/react';
import { FormErrorMessage } from '@components/Form';

interface IInputs {
    email: string;
}

interface IProps {
    onSubmit: (formData: Record<string, string>) => void;
    isFetching?: boolean;
}

const validationSchema = yup.object().shape({
    email: yup.string().email('Nie prawidłowy adres email').required('To pole jest wymagane'),
});

const RemindForm = ({ onSubmit, isFetching = false }: IProps) => {
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
                <Input
                    borderColor={errors.email ? 'tomato' : 'gray.200'}
                    bgColor="white"
                    name="email"
                    ref={register}
                    type="text"
                    size="lg"
                    placeholder="Email"
                />
                <FormErrorMessage name="email" errors={errors} />
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
