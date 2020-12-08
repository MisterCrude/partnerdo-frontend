import React from 'react';

import { Container } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Filters from './components/Filters';
import Results from './components/Results';

export const Browser: React.FC = () => {
    return (
        <Main>
            <Container as="section" flexGrow={1} px={8} maxW="7xl">
                <Filters />
                <Results />
            </Container>
        </Main>
    );
};
