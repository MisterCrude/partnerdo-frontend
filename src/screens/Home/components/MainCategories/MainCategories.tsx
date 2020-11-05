import React from 'react';

import { Flex, Heading, Image, Link, SimpleGrid, Text } from '@chakra-ui/core';

const categories = [
    ['Sport', 'https://www.flaticon.com/svg/static/icons/svg/3160/3160174.svg', 'green.300'],
    ['Muzyka', 'https://www.flaticon.com/svg/static/icons/svg/3655/3655247.svg', 'purple.400'],
    ['Nauka', 'https://www.flaticon.com/svg/static/icons/svg/3528/3528211.svg', 'blue.400'],
    ['Dzieci', 'https://www.flaticon.com/svg/static/icons/svg/3658/3658919.svg', 'orange.400'],
    ['Podróże', 'https://www.flaticon.com/svg/static/icons/svg/3644/3644078.svg', 'blue.300'],
    ['Gry', 'https://www.flaticon.com/svg/static/icons/svg/3658/3658828.svg', 'purple.300'],
    ['Rozrywka', 'https://www.flaticon.com/svg/static/icons/svg/3655/3655258.svg', 'red.300'],
    ['Biznes', 'https://www.flaticon.com/svg/static/icons/svg/3165/3165489.svg', 'teal.300'],
];

export const MainCategories: React.FC = () => (
    <Flex
        as="section"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        marginBottom={32}
        paddingX={8}
    >
        <Heading
            paddingX={8}
            paddingY={15}
            marginBottom={{ base: 5, md: 10 }}
            size="xl"
            textAlign="center"
            lineHeight="3rem"
        >
            Kategorie
        </Heading>
        <SimpleGrid
            as="nav"
            gap={{ base: 4, sm: 6, md: 8 }}
            gridTemplateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }}
        >
            {categories.map(([name, imageUrl, color]: any[]) => (
                <Flex
                    as={Link}
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={color}
                    borderRadius="md"
                    boxShadow="xl"
                    maxWidth={`${100 / 6}vw`}
                    minWidth={20}
                    key={name}
                    padding="2vw"
                    flexDirection="column"
                    _hover={{ textDecoration: 'none', transform: { base: 'scale(1)', md: 'scale(1.05)' } }}
                >
                    {/* <Icon fontSize={{ base: 70, md: 110 }} color="orange.700" /> */}
                    <Image src={imageUrl} width="50%" marginBottom={{ base: 2, md: 4 }} />
                    <Text color="white" fontSize={{ base: 15, sm: 18, md: 22 }} lineHeight={1.2} textAlign="center">
                        {name}
                    </Text>
                </Flex>
            ))}
        </SimpleGrid>
    </Flex>
);
