import React from 'react';

import { Flex, Heading, Image, Link, SimpleGrid, Text } from '@chakra-ui/core';
import { CATEGORIES_DATA } from '@config/app';
import { IProposalCategory } from '@models/proposal';

export const MainCategories: React.FC = () => (
    <Flex as="section" align="center" flexDir="column" justify="center" mb={{ base: 32, md: 48 }} px={8}>
        <Heading px={8} py={15} mb={{ base: 5, md: 10 }} align="center" lineHeight="3rem">
            Kategorie
        </Heading>
        <SimpleGrid
            as="nav"
            // gap={{ base: 4, sm: 5, md: 8 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}
        >
            {CATEGORIES_DATA.map(({ name, iconUrl }: IProposalCategory) => (
                <Flex
                    as={Link}
                    alignItems="center"
                    justify="center"
                    borderRadius="md"
                    // borderWidth={1}
                    // boxShadow="xl"
                    maxW={`${100 / 7}vw`}
                    minW={20}
                    key={name}
                    p="2vw"
                    direction="column"
                    _hover={{
                        textDecoration: 'none',
                        transform: { base: 'scale(1)', md: 'scale(1.02)' },
                        boxShadow: 'md',
                    }}
                >
                    {/* <Icon fontSize={{ base: 70, md: 110 }} color="orange.700" /> */}
                    <Image src={iconUrl} w="50%" mb={{ base: 2, md: 4 }} />
                    <Text fontSize={{ base: 15, sm: 18, md: 22 }} lineHeight={1.2} align="center">
                        {name}
                    </Text>
                </Flex>
            ))}
        </SimpleGrid>
    </Flex>
);
