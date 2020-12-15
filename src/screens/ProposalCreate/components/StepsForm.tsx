import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { CITIES } from '@config/app';
import { IOption } from '@models/app';
import { toOptions } from '@utils/misc';

import { Box, Button, VStack, Input, Textarea, HStack } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import MenuSelect from '@components/MenuSelect';
import Categories from './Categories';

type Inputs = {
    username: string;
    password: string;
};

interface IProps {
    currentStep: number;
    lastStep: number;
    onCancel: () => void;
    onGo: (dec?: boolean) => void;
    onSubmit: (formData: Record<string, unknown>) => void;
}

const validationSchema = yup.object().shape({
    username: yup.string().required('To pole jest wymagane'),
    password: yup.string().required('To pole jest wymagane'),
});

const cities: IOption[] = toOptions(CITIES);

export const StepsForm: React.FC<IProps> = ({ currentStep, lastStep, onSubmit, onCancel, onGo }) => {
    const { register, errors, handleSubmit } = useForm<Inputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <>
            <Box
                as="form"
                alignItems="center"
                d="flex"
                onSubmit={handleSubmit(onSubmit)}
                my={{ base: 16 }}
                minH={{ base: 0, md: 260 }}
            >
                {currentStep === 0 && <Categories />}
                {currentStep === 1 && (
                    <VStack align="stretch" spacing={{ base: 6, md: 8 }} w="100%">
                        <MenuSelect isRadio options={cities} palceholder="Miasto" />
                        <MenuSelect isRadio options={cities} palceholder="Dzielnica" />
                    </VStack>
                )}
                {currentStep === 2 && (
                    <VStack align="stretch" spacing={{ base: 6, md: 8 }} w="100%">
                        <Input
                            // borderColor={errors.username ? 'tomato' : 'gray.200'}
                            // borderWidth={errors.username ? 1 : 0}
                            borderWidth={0}
                            name="name"
                            // ref={register}
                            type="text"
                            placeholder="Tytuł partnerstwa"
                            size="lg"
                            shadow="base"
                        />
                        <Textarea
                            // borderColor={errors.username ? 'tomato' : 'gray.200'}
                            // borderWidth={errors.username ? 1 : 0}
                            borderWidth={0}
                            h={40}
                            name="surname"
                            // ref={register}
                            resize="none"
                            type="text"
                            placeholder="Opis partnerstwa"
                            size="lg"
                            shadow="base"
                        />
                    </VStack>
                )}
            </Box>

            <HStack spacing={3} justify="space-between">
                {currentStep < 1 ? (
                    <Button onClick={onCancel} flexGrow={{ base: 1, md: 0 }}>
                        Anuluj
                    </Button>
                ) : (
                    <Button flexGrow={{ base: 1, md: 0 }} onClick={() => onGo(true)} leftIcon={<ChevronLeftIcon />}>
                        Wstecz
                    </Button>
                )}

                {currentStep === lastStep ? (
                    <Button colorScheme="orange">Utwórz partnerstwo</Button>
                ) : (
                    <Button
                        backgroundColor="gray.800"
                        color="white"
                        variant="solid"
                        flexGrow={{ base: 1, md: 0 }}
                        onClick={() => onGo()}
                        rightIcon={<ChevronRightIcon />}
                        _active={{ backgroundColor: 'gray.800' }}
                        _hover={{ backgroundColor: 'gray.600' }}
                    >
                        Dalej
                    </Button>
                )}
            </HStack>
        </>
    );
};

export default StepsForm;
