import React from 'react';

import { Box, Button, Divider, Flex, Heading, Tag, TagLeftIcon, TagLabel } from '@chakra-ui/core';
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
    <Box
        as="a"
        boxShadow="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        href="#"
        maxW="100%"
        mx={{ base: 0, lg: 6 }}
        mb={{ base: 8, lg: 0 }}
    >
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
    <Flex as="section" align="center" flexDir="column" justify="center" mb={{ base: 24, lg: 48 }} px={8}>
        <Heading align="center" px={8} py={15} mb={{ base: 5, md: 10 }} lineHeight="3rem">
            Najnowsze oferty
        </Heading>

        <Flex direction={{ base: 'column', lg: 'row' }} maxW="100%">
            {Array(3)
                .fill('')
                .map((_, i) => (
                    <OfferCard key={i} />
                ))}
        </Flex>

        <Button colorScheme="orange" size="lg" mt={{ base: 14, lg: 20 }}>
            Zobacz wszystkie
        </Button>
    </Flex>
);
