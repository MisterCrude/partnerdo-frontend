import React from 'react';

import { ROUTES } from '@config/app';

import { Link as RouterLink } from 'react-router-dom';
import { Link, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const Final = () => (
    <>
        <Heading align="center" size="md" fontWeight="300" mb={6}>
            <CheckCircleIcon color="green.500" fontSize={20} mr={3} />
            Twoje partnerstwo zostało stworzone...
        </Heading>
        <Text align="center" lineHeight={8}>
            i za chwiłę pojawinsię na naszej
            <Link as={RouterLink} color="orange.500" colorScheme="orange" fontWeight="800" ml={2} to={ROUTES.BROWSER}>
                tablicę ogłoszeniowej
            </Link>
            <br />
            Ale pamętaj że zawsze możesz weidytować lub usunąć go w swoim
            <Link as={RouterLink} color="orange.500" colorScheme="orange" fontWeight="800" ml={2} to={ROUTES.PROFILE}>
                profilu użytkownika
            </Link>
            , zakaładka <strong>moje partnerstwa</strong>
        </Text>
    </>
);

export default Final;
