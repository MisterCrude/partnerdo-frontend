import React from 'react';

import { ROUTES } from '@config/app';

import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Divider, Flex, Grid, Heading, Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react';
import { CategoryIcon, LocationIcon, ShowIcon, CalendarIcon } from '@theme/customIcons';
import UserBadge from '@components/UserBadge';

const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Poszukuję partnera do poszukiwania partnerów',
    beds: 3,
    baths: 2,
    title: 'Poszukuję partnera do głębokiego lenistwa',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
};

export const OfferCard: React.FC = () => (
    <Box as="a" shadow="base" borderRadius="lg" overflow="hidden" href="#" maxW="100%">
        <UserBadge
            avatarUrl="https://bit.ly/sage-adebayo"
            name="Jan Baraban"
            slogan="Kanapowy sportowiec i mamusin przystojniak"
        />

        <Divider />

        <Box p="6">
            <Flex align="center" justify="space-between" mb={3}>
                <Tag borderRadius="full" variant="outline" colorScheme="orange">
                    <TagLeftIcon as={CategoryIcon} />
                    <TagLabel>Sport</TagLabel>
                </Tag>
            </Flex>

            <Box as="h4" mt="1" mb={2} fontWeight="semibold" lineHeight="tight">
                {property.title}
            </Box>

            <Flex align="center">
                <LocationIcon mr={2} /> Warszawa, Bemowo
            </Flex>

            <Flex mt="2" align="center" justify="space-between">
                <Flex as="span" align="center" color="gray.500" fontSize="sm">
                    34 <ShowIcon ml={1} fontSize="md" />
                </Flex>
                <Flex as="span" align="center" color="gray.500" fontSize="sm">
                    01.12.2020 <CalendarIcon ml={1} fontSize="md" />
                </Flex>
            </Flex>
        </Box>
    </Box>
);

export const NewOffers: React.FC = () => (
    <Flex as="section" align="center" flexDir="column" justify="center" mb={24}>
        <Heading align="center" px={8} mb={{ base: 8, md: 10 }} lineHeight={1.2}>
            Najnowsze oferty
        </Heading>

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 8 }}>
            {Array(3)
                .fill('')
                .map((_, i) => (
                    <OfferCard key={i} />
                ))}
        </Grid>

        <Button as={RouterLink} colorScheme="orange" size="lg" mt={{ base: 14, lg: 20 }} to={ROUTES.BROWSER}>
            Zobacz wszystkie
        </Button>
    </Flex>
);

export default NewOffers;
