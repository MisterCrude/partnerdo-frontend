import React from 'react';

import { Box, Flex, Heading, SimpleGrid, Link, Text } from '@chakra-ui/react';
import { CATEGORIES_DATA } from '@config/app';
import { IProposalCategory } from '@models/proposal';

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
            {CATEGORIES_DATA.map(({ name, icon: Icon }: IProposalCategory) => (
                <Flex
                    as={Link}
                    alignItems="center"
                    borderRadius="md"
                    direction="column"
                    justify="center"
                    minW={20}
                    maxW={30}
                    key={name}
                >
                    {/* <Box justify="center" borderRadius="300px" backgroundColor="gray.50" color="orange.500" mb={3}> */}
                    <Box justify="center" borderRadius="300px" backgroundColor="gray.50" mb={3}>
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
