import React from 'react';
import { AVATAR_FALLBACK_URL } from '@consts/app';

import { Link as RouterLink } from 'react-router-dom';
import { AspectRatio, Box, Stack, Image, Flex, Heading, Text, Tag } from '@chakra-ui/react';
import { LocationIcon } from '@theme/customIcons';
import { ROUTES } from '@consts/routes';

interface IProps {
    address: string;
    proposalId: string;
    authorId: string;
    categoryName: string;
    title: string;
    userAvatarUrl: string;
    userName: string;
    categoryColor?: string;
}

const Proposal: React.FC<IProps> = ({
    address,
    userAvatarUrl,
    title,
    categoryName,
    categoryColor = 'orange.500',
    userName,
    proposalId,
    authorId,
}) => (
    <Box mb={{ base: 4, md: 8 }}>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <AspectRatio w={{ base: 220, sm: 110 }} maxW="100%" minW={110} ration={1}>
                <Image
                    alt="Jan Baraban"
                    borderRadius={6}
                    objectFit="cover"
                    src={userAvatarUrl}
                    fallbackSrc={AVATAR_FALLBACK_URL}
                />
            </AspectRatio>

            <Flex align="space-between" flexDir="column" flexGrow={1} justify="space-between">
                <Flex align="flex-start" justify="space-between" mb={{ base: 1, md: 0 }}>
                    <Box>
                        <Flex align="center" flexWrap="wrap">
                            <Tag borderRadius="full" bgColor={categoryColor} px={4} my={1} variant="solid">
                                {categoryName}
                            </Tag>
                            <Heading
                                as={RouterLink}
                                d="inline-block"
                                size="md"
                                ml={2}
                                to={`${ROUTES.PROPOSALS}/${proposalId}`}
                                _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                            >
                                {title}
                            </Heading>
                        </Flex>
                        <Text fontSize="md" color="gray.500">
                            <LocationIcon pos="relative" top="-2px" /> {address}
                        </Text>
                    </Box>
                </Flex>
                <Box d={{ base: 'none', sm: 'block' }}>
                    <Text
                        as={RouterLink}
                        fontSize="sm"
                        fontWeight="bold"
                        to={`${ROUTES.USER_PROFILE}/${authorId}`}
                        _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                    >
                        {userName}
                    </Text>
                </Box>
            </Flex>
        </Stack>
    </Box>
);

export default Proposal;
