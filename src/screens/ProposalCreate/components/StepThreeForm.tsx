import React from 'react';
import { FormErrorMessage } from '@components/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequestStatus } from '@typing/api';
import { useMount } from 'react-use';
import * as yup from 'yup';

import { Input, Textarea, HStack, Box, Button } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export interface IInputs {
    title: string;
    description: string;
}

interface IProps {
    defaultData: Record<string, string>;
    requestStatus: RequestStatus;
    onSubmit: (fieldsData: Record<string, string>) => void;
    onBack: (nextStep: number) => void;
}

const validationSchema = yup.object().shape({
    title: yup.string().max(100, 'Maksymalna ilość znaków 100').required('To pole jest wymagane'),
    description: yup.string().max(800, 'Maksymalna ilość znaków 800').required('To pole jest wymagane'),
});

export const StepTwo: React.FC<IProps> = ({ requestStatus, defaultData, onSubmit, onBack }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty },
    } = useForm<IInputs>({
        resolver: yupResolver(validationSchema),
    });

    const handleSubmitForm = (formData: Record<string, string>) => onSubmit(formData);
    const handleBack = () => onBack(1);

    const disableSubmitButton = !isDirty;
    const isLoading = requestStatus === RequestStatus.FETCHING;

    useMount(() => {
        defaultData.title && setValue('title', defaultData.title);
        defaultData.description && setValue('description', defaultData.description);
    });

    return (
        <Box as="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <Box alignItems="center" d="flex" my={{ base: 16 }} minH={{ base: 0, md: 260 }}>
                <Box flexGrow={1}>
                    <Box mb={{ base: 4, md: 8 }}>
                        <Input
                            borderColor={errors.title ? 'tomato' : 'gray.200'}
                            name="title"
                            placeholder="Tytuł partnerstwa"
                            ref={register}
                            size="lg"
                            type="text"
                        />
                        <FormErrorMessage name="title" errors={errors} />
                    </Box>
                    <Box>
                        <Textarea
                            borderColor={errors.description ? 'tomato' : 'gray.200'}
                            h={40}
                            name="description"
                            placeholder="Opis partnerstwa"
                            ref={register}
                            resize="none"
                            size="lg"
                            type="text"
                        />
                        <FormErrorMessage name="description" errors={errors} />
                    </Box>
                </Box>
            </Box>

            <HStack spacing={8} justify="space-between">
                <Button
                    flexGrow={{ base: 1, md: 0 }}
                    leftIcon={<ChevronLeftIcon />}
                    onClick={handleBack}
                    variant="ghost"
                >
                    Wstecz
                </Button>

                <Button
                    isLoading={isLoading}
                    color="white"
                    colorScheme="orange"
                    type={disableSubmitButton ? 'button' : 'submit'}
                    disabled={disableSubmitButton}
                >
                    Utwórz
                </Button>
            </HStack>
        </Box>
    );
};

export default StepTwo;
