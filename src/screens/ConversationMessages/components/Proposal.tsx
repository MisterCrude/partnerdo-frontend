import React from 'react';

import { AspectRatio, Box, Stack, Image, Flex, Heading, Text, Tag } from '@chakra-ui/react';
import { LocationIcon } from '@theme/customIcons';

const Proposal: React.FC = () => (
    <Box mb={{ base: 4, md: 8 }}>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <AspectRatio w={{ base: 220, sm: 110 }} maxW="100%" ration={1}>
                <Image
                    alt="Jan Baraban"
                    borderRadius={6}
                    objectFit="cover"
                    src="https://bit.ly/sage-adebayo"
                    fallbackSrc="https://via.placeholder.com/300"
                />
            </AspectRatio>

            <Text d={{ base: 'inline', sm: 'none' }} fontSize="lg" fontWeight="bold">
                Jan Baraban
            </Text>

            <Flex align="space-between" flexDir="column" flexGrow={1} justify="space-between">
                <Flex align="flex-start" justify="space-between" mb={{ base: 1, md: 0 }}>
                    <Box>
                        <Heading d="inline-block" size="md" mb={{ base: 2, md: 0 }}>
                            Poszukuję partnera do głębokiego lenistwa{' '}
                            <Tag borderRadius="full" bgColor="orange.500" px={4} variant="solid">
                                Sport
                            </Tag>
                        </Heading>
                        <Text fontSize="md" color="gray.500">
                            <LocationIcon pos="relative" top="-2px" /> Warszawa, Bemowo
                        </Text>
                    </Box>
                </Flex>
                <Text d={{ base: 'none', sm: 'inline' }} fontSize="md" fontWeight="bold">
                    Jan Baraban
                </Text>
            </Flex>
        </Stack>
    </Box>
);

export default Proposal;
