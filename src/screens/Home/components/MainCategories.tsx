import React from 'react';

import { CATEGORIES_DATA, ROUTES } from '@config/app';
import { IProposalCategory } from '@models/proposal';

import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

const MainCategories: React.FC = () => (
    <Flex as="section" align="center" flexDir="column" justify="center" mb={{ base: 32, md: 48 }}>
        <Heading py={15} mb={{ base: 8, md: 10 }} align="center" lineHeight={1.2}>
            Kategorie
        </Heading>

        <SimpleGrid
            as="nav"
            rowGap={12}
            gridGap={5}
            justifyItems="center"
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}
            w="100%"
        >
            {CATEGORIES_DATA.map(({ name, iconColored: Icon }: IProposalCategory) => (
                <Flex
                    as={RouterLink}
                    alignItems="center"
                    borderRadius="md"
                    direction="column"
                    justify="center"
                    to={ROUTES.BROWSER}
                    minW={20}
                    maxW={{ base: 20, md: 28 }}
                    key={name}
                >
                    <Box justify="center" borderRadius="300px" bgColor="gray.100" mb={3}>
                        <Icon w="100%" h="auto" maxW={200} />
                    </Box>
                    <Text align="center" lineHeight={1.2}>
                        {name}
                    </Text>
                </Flex>
            ))}
        </SimpleGrid>
    </Flex>
);

export default MainCategories;
