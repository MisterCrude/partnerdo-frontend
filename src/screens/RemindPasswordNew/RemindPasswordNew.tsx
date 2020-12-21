import React, { useState } from 'react';

import { ROUTES } from '@config/app';

import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Main from '@layouts/Main';
import SetPasswordForm from './components/SetPasswordForm';

export const RemindPasswordNew: React.FC = () => {
    const [isSent, setIsSent] = useState(false);
    const isFetching = false;

    const handleSubmitForm = () => {
        setIsSent(true);
        return null;
    };
    return (
        <Main flexGrow={1} my={20} maxW="xl">
            <Heading align="center" mb={10}>
                Podaj nowe hasło
            </Heading>

            {isSent ? (
                <Box align="center">
                    <Text align="center" lineHeight={8}>
                        Nowe hasło zostało zapisane.
                    </Text>
                    <Button as={RouterLink} to={ROUTES.LOGIN} mt={5}>
                        Zaloguj się
                    </Button>
                </Box>
            ) : (
                <SetPasswordForm onSubmit={handleSubmitForm} isFetching={isFetching} />
            )}
        </Main>
    );
};
