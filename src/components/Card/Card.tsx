import React from 'react';

import { Box, Divider, Flex, Heading, Tag, TagLabel, TagLeftIcon, Text, BoxProps } from '@chakra-ui/react';
import { CategoryIcon, CalendarIcon, LocationIcon, ShowIcon } from '@theme/customIcons';
import UserBadge from '@components/UserBadge';

export const CategoryBadge: React.FC<BoxProps> = (props) => (
    <Tag borderRadius="full" variant="outline" colorScheme="orange" {...props}>
        <TagLeftIcon as={CategoryIcon} />
        <TagLabel>Sport</TagLabel>
    </Tag>
);

interface ICardProps {
    isSimple?: boolean;
}

export const Card: React.FC<ICardProps> = ({ isSimple }) => (
    <Box as="a" borderWidth={1} borderRadius="lg" overflow="hidden" href="#" maxW="100%">
        <Flex align="center" px={6} py={4} justify="space-between">
            <UserBadge
                avatarUrl="https://bit.ly/sage-adebayo"
                title="Jan Baraban"
                subtitle={
                    <Box as="span" color="gray.500">
                        <LocationIcon mr={1} /> Warszawa, Bemowo
                    </Box>
                }
            />
            {!isSimple && (
                <Box d={{ base: 'none', md: 'flex' }}>
                    <CategoryBadge />
                </Box>
            )}
        </Flex>

        <Divider />

        <Box px={6} py={4}>
            {isSimple ? (
                <CategoryBadge mb={2} />
            ) : (
                <Box d={{ base: 'flex', md: 'none' }} mb={2}>
                    <CategoryBadge />
                </Box>
            )}

            <Heading as="h4" mb={2} size="md">
                Poszukuję partnera do głębokiego lenistwa
            </Heading>

            <Text mb={2} fontSize="sm">
                Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera
                do głębokiego lenistwa Poszuk partnera ...
            </Text>
        </Box>

        <Divider />

        <Box px={6} py={4}>
            <Flex align="center" justify="space-between">
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
