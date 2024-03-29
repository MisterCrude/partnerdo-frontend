import { createArray } from '@utils/misc';
import { ROUTES } from '@consts/routes';

import { Link as RouterLink } from 'react-router-dom';
import { Button, Flex, Grid, Heading } from '@chakra-ui/react';
import Card from '@components/Card';

export const NewOffers = () => (
    <Flex as="section" align="center" flexDir="column" justify="center" mb={{ base: 14, md: 24 }}>
        <Heading align="center" px={8} mb={{ base: 8, md: 10 }} lineHeight={1.2}>
            Najnowsze oferty
        </Heading>

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 8 }}>
            {createArray(3).map((_, i) => (
                <Card
                    key={i}
                    address="Warszawa, Bemowo"
                    content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                    categoryName="Sport"
                    publishDate="01.10.2020"
                    title="Poszukuję partnera do głębokiego lenistwa"
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    shortUserDesc="Jak w tytule, szukam partnera do głęboki..."
                    onTitleClick={() => {
                        return null;
                    }}
                />
            ))}
        </Grid>

        <Button as={RouterLink} colorScheme="orange" size="lg" mt={{ base: 14, lg: 20 }} to={ROUTES.PROPOSALS}>
            Zobacz wszystkie
        </Button>
    </Flex>
);

export default NewOffers;
