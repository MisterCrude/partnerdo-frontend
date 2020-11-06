import React from 'react';

import { Box, Button, Flex, Heading, HStack, Image, Tag, TagLeftIcon, TagLabel } from '@chakra-ui/core';
import { CategoryIcon, LocationIcon, ShowIcon, CalendarIcon } from '@theme/customIcons';

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
    <Box boxShadow="2xl" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={property.imageUrl} alt={property.imageAlt} />

        <Box p="6">
            <Flex align="center" justify="space-between" mb={3}>
                <Tag borderRadius="full" variant="outline" colorScheme="orange">
                    <TagLeftIcon as={CategoryIcon} />
                    <TagLabel>Podróże</TagLabel>
                </Tag>
            </Flex>

            <Box as="h4" mt="1" fontWeight="semibold" lineHeight="tight">
                {property.title}
            </Box>

            <Flex align="center">
                <LocationIcon mr={2} /> Warszawa, Bemowo
            </Flex>

            <Flex mt="2" alignItems="center" justify="space-between">
                <Flex as="span" alignItems="center" color="gray.500" fontSize="sm">
                    34 <ShowIcon ml={1} fontSize="md" />
                </Flex>
                <Flex as="span" alignItems="center" color="gray.500" fontSize="sm">
                    01.12.2020 <CalendarIcon ml={1} fontSize="md" />
                </Flex>
            </Flex>
        </Box>
    </Box>
);

export const NewOffers: React.FC = () => (
    <Flex as="section" align="center" flexDir="column" justify="center" mb={{ base: 32, md: 48 }} px={8}>
        <Heading px={8} py={15} mb={{ base: 5, md: 10 }} lineHeight="3rem">
            Najnowsze oferty
        </Heading>

        <HStack spacing={10}>
            {Array(3)
                .fill('')
                .map((_, i) => (
                    <OfferCard key={i} />
                ))}
        </HStack>

        <Button colorScheme="orange" size="lg" mt={20}>
            Zobacz wszystkie
        </Button>
    </Flex>
);
