import React from 'react';

import { ROUTES } from '@config/app';

import { Link as RouterLink } from 'react-router-dom';
import { Button, Flex, Grid, Heading } from '@chakra-ui/react';
import Card from '@components/Card';

export const NewOffers: React.FC = () => (
    <Flex as="section" align="center" flexDir="column" justify="center" mb={24}>
        <Heading align="center" px={8} mb={{ base: 8, md: 10 }} lineHeight={1.2}>
            Najnowsze oferty
        </Heading>

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 8 }}>
            {Array(3)
                .fill('')
                .map((_, i) => (
                    <Card key={i} />
                ))}
        </Grid>

        <Button as={RouterLink} colorScheme="orange" size="lg" mt={{ base: 14, lg: 20 }} to={ROUTES.PROPOSALS}>
            Zobacz wszystkie
        </Button>
    </Flex>
);

export default NewOffers;
