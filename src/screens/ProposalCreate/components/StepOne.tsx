import React, { useState } from 'react';

import { CATEGORIES_DATA } from '@config/app';
import { IProposalCategory } from '@models/proposal';

import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const StepOne = () => {
    const [chosenName, setChosenName] = useState<string>();

    const handleChose = (categoryName: string) => setChosenName(categoryName);

    return (
        <SimpleGrid
            as="nav"
            gap={8}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}
            w="100%"
        >
            {CATEGORIES_DATA.map(({ name, icon: Icon }: IProposalCategory) => (
                <Flex
                    alignItems="center"
                    borderRadius="md"
                    cursor="pointer"
                    direction="column"
                    justify="center"
                    key={name}
                    minW={20}
                    maxW={30}
                    onClick={() => handleChose(name)}
                    position="relative"
                >
                    {chosenName === name && (
                        <CheckCircleIcon color="green.500" fontSize={20} position="absolute" top={0} right={0} />
                    )}
                    <Box w="100%" borderRadius="300px" background="gray.100" mb={3}>
                        <Icon w="100%" h="auto" color={chosenName === name ? 'orange.500' : 'gray.800'} />
                    </Box>
                    <Text align="center" lineHeight={1.2}>
                        {name}
                    </Text>
                </Flex>
            ))}
        </SimpleGrid>
    );
};

export default StepOne;
