import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { AspectRatio, Box, Stack, Image, Flex, Heading, Text, Tag } from '@chakra-ui/react';
import { LocationIcon } from '@theme/customIcons';
import { ROUTES } from '@consts/routes';

const Proposal: React.FC = () => (
    <Box mb={{ base: 4, md: 8 }}>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <AspectRatio w={{ base: 220, sm: 110 }} maxW="100%" minW={110} ration={1}>
                <Image
                    alt="Jan Baraban"
                    borderRadius={6}
                    objectFit="cover"
                    src="https://bit.ly/sage-adebayo"
                    fallbackSrc="https://via.placeholder.com/300"
                />
            </AspectRatio>

            <Text
                as={RouterLink}
                d={{ base: 'inline', sm: 'none' }}
                fontSize="lg"
                fontWeight="bold"
                to={`${ROUTES.USER_PROFILE}/some-user-id`}
                _hover={{ cursor: 'pointer', textDecor: 'underline' }}
            >
                Jan Baraban
            </Text>

            <Flex align="space-between" flexDir="column" flexGrow={1} justify="space-between">
                <Flex align="flex-start" justify="space-between" mb={{ base: 1, md: 0 }}>
                    <Box>
                        <Heading
                            as={RouterLink}
                            d="inline"
                            size="md"
                            to={`${ROUTES.PROPOSALS}/some-proposal-id`}
                            _hover={{ textDecor: 'underline' }}
                        >
                            Poszukuję partnera do głębokiego lenistwa
                        </Heading>{' '}
                        <Tag borderRadius="full" bgColor="orange.500" px={4} variant="solid">
                            Sport
                        </Tag>
                        <Text fontSize="md" color="gray.500">
                            <LocationIcon pos="relative" top="-2px" /> Warszawa, Bemowo
                        </Text>
                    </Box>
                </Flex>
                <Box d={{ base: 'none', sm: 'block' }}>
                    <Text
                        as={RouterLink}
                        fontSize="md"
                        fontWeight="bold"
                        to={`${ROUTES.USER_PROFILE}/some-user-id`}
                        _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                    >
                        Jan Baraban
                    </Text>
                </Box>
            </Flex>
        </Stack>
    </Box>
);

export default Proposal;
