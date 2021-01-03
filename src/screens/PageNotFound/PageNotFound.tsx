import React from 'react';

import { ROUTES } from '@config/app';

import { Link as RouterLink } from 'react-router-dom';
import { SearchIcon } from '@theme/customIcons';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Main from '@layouts/Main';

interface IProps {
    isAuth?: boolean;
}

export const PageNotFound: React.FC<IProps> = ({ isAuth = false }) => (
    <Main alignItems="center" d="flex" justifyContent="center" flexGrow={1} maxW="xl">
        <Box align="center">
            <Heading color="gray.300" mb={8} size="4xl">
                4<SearchIcon color="gray.900" fontSize={60} top="-8px" pos="relative" />4
            </Heading>
            <Text>Wygłąda na to że taka strona nie istnieje.</Text>
            <Button as={RouterLink} colorScheme="orange" mt={12} to={isAuth ? ROUTES.PROPOSALS : ROUTES.HOME}>
                {isAuth ? 'Wróć do wyszukiwarki' : 'Wróć do strony głownej'}
            </Button>
        </Box>
    </Main>
);
