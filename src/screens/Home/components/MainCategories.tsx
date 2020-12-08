import React from 'react';

import { Flex, Heading, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { CATEGORIES_DATA } from '@config/app';
import { IProposalCategory } from '@models/proposal';

const MainCategories: React.FC = () => (
    <Flex as="section" align="center" flexDir="column" justify="center" mb={{ base: 32, md: 48 }}>
        <Heading py={15} mb={{ base: 8, md: 10 }} align="center" lineHeight={1.2}>
            Kategorie
        </Heading>

        <SimpleGrid
            as="nav"
            gap={{ base: 4, md: 8 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}
            w="100%"
        >
            {CATEGORIES_DATA.map(({ name, iconUrl }: IProposalCategory) => (
                <Flex
                    as={Link}
                    alignItems="center"
                    direction="column"
                    justify="center"
                    borderRadius="md"
                    minW={20}
                    key={name}
                    p="2vw"
                    shadow="base"
                    _hover={{
                        textDecoration: 'none',
                        transform: { base: 'scale(1)', md: 'scale(1.02)' },
                        boxShadow: 'lg',
                    }}
                >
                    <Image src={iconUrl} w="50%" mb={{ base: 2, md: 4 }} />
                    <Text fontSize={{ base: 15, sm: 18, md: 22 }} lineHeight={1.2} align="center">
                        {name}
                    </Text>
                </Flex>
            ))}
        </SimpleGrid>
    </Flex>
);

export default MainCategories;
