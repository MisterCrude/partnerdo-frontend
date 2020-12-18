import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Heading, Progress, Text } from '@chakra-ui/react';
import Main from '@layouts/Main';
import StepsForm from './components/StepsForm';
import Final from './components/Final';

const STEPS = [
    {
        percentage: 33,
        title: 'Wybierz kategorię',
    },
    {
        percentage: 66,
        title: 'Wybierz lokalizację',
    },
    {
        percentage: 100,
        title: 'Opisz swoję partnerstwo',
    },
];

export const ProposalCreate: React.FC = () => {
    const history = useHistory();
    const [step, setStep] = useState(0);
    const [isProposalCreated, serIsProposalCreated] = useState(false);

    const hangleCancel = () => {
        history.goBack();
    };

    const handleStep = (dec?: boolean) => {
        setStep((prevState) => (dec ? --prevState : ++prevState));
    };

    const handleSubmitForm = () => {
        serIsProposalCreated(true);
        return null;
    };

    return (
        <Main d="flex" flexDir="column" flexGrow={1} my={20} maxW="3xl">
            <Heading align="center" mb={10}>
                Dodaj nowe partnerstwo
            </Heading>
            {isProposalCreated ? (
                <Final />
            ) : (
                <>
                    <Text align="center" mb={4} fontWeight={300} fontSize="lg">
                        {step + 1}. {STEPS[step].title}
                    </Text>

                    <Progress value={STEPS[step].percentage} colorScheme="orange" size="sm" rounded="md" />
                    <StepsForm
                        currentStep={step}
                        lastStep={STEPS.length - 1}
                        onSubmit={handleSubmitForm}
                        onCancel={hangleCancel}
                        onGo={handleStep}
                    />
                </>
            )}
        </Main>
    );
};
