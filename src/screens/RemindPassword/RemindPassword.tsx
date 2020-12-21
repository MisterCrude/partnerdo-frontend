import React, { useState } from 'react';

import { Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Main from '@layouts/Main';
import RemindForm from './components/RemindForm';

export const RemindPassword: React.FC = () => {
    const [isSent, setIsSent] = useState(false);
    const isFetching = false;

    const handleSubmitForm = () => {
        setIsSent(true);
        return null;
    };

    return (
        <Main flexGrow={1} maxW="xl">
            <Heading align="center" mb={10}>
                Przypomnij hasło
            </Heading>

            {isSent ? (
                <Text align="center" lineHeight={8}>
                    <CheckCircleIcon color="green.500" fontSize={20} mr={3} pos="relative" top="-2px" />
                    Na adres mailowy <strong>somemail@mail.com</strong> został wysłany link do generowania nowego hasła,
                    sprawdź.
                </Text>
            ) : (
                <RemindForm onSubmit={handleSubmitForm} isFetching={isFetching} />
            )}
        </Main>
    );
};
