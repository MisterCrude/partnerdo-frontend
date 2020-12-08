import React from 'react';

import { Container, Text } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Filters from './components/Filters';
import Results from './components/Results';

export const Browser: React.FC = () => {
    return (
        <Main>
            <Container as="section" flexGrow={1} px={8} maxW="7xl">
                <Filters />
                <Text fontSize="md">
                    Znaleziono <strong>245,667</strong> partnerstw pasujących do Ciebie
                </Text>
                <Results />
            </Container>
        </Main>
    );
};
