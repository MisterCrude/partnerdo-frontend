import React from 'react';

import { Box, Button, HStack } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

interface IProps {
    currentStep: number;
    lastStep: number;
    onCancel: () => void;
    onGo: (dec?: boolean) => void;
    // onSubmit: (formData: Record<string, unknown>) => void;
    onSubmit: () => void;
}

export const StepsForm: React.FC<IProps> = ({ currentStep, lastStep, onSubmit, onCancel, onGo }) => {
    return (
        <>
            <Box as="form" alignItems="center" d="flex" my={{ base: 16 }} minH={{ base: 0, md: 260 }}>
                {currentStep === 0 && <StepOne />}
                {currentStep === 1 && <StepTwo />}
                {currentStep === 2 && <StepThree />}
            </Box>

            <HStack spacing={8} justify="space-between">
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
                    <Button colorScheme="orange" onClick={onSubmit}>
                        Utwórz
                    </Button>
                ) : (
                    <Button
                        backgroundColor="gray.800"
                        color="white"
                        variant="outline"
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
