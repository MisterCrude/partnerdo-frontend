import React from 'react';

import { Box, Badge, Divider, Flex, Heading, Tag, Text, MenuItem } from '@chakra-ui/react';
import { CalendarIcon, LocationIcon } from '@theme/customIcons';
import UserBadge from '@components/UserBadge';
import { DeleteIcon, EditIcon, UnpublishIcon, PublishIcon } from '@theme/customIcons';

import CardMenu from '@src/components/CardMenu';

export enum Types {
    DEFAULT = 'default',
    EDITABLE = 'editable',
    UNPUBLISH = 'unpublish',
    DONE = 'done',
}
export interface IProps {
    address: string;
    category: string;
    content: string;
    onTitleClick: () => void;
    publishDate: string;
    title: string;
    userAvatarUrl: string;
    userName: string;
    shortUserDesc: string;
    onUserNameClick?: () => void;
    type?: Types;
}

export const Card: React.FC<IProps> = ({
    address,
    category,
    content,
    onTitleClick,
    publishDate,
    title,
    userAvatarUrl,
    userName,
    shortUserDesc,
    type = Types.DEFAULT,
    onUserNameClick,
}) => {
    const isUnpublish = type === Types.UNPUBLISH;
    const isDone = type === Types.DONE;
    const showMenu = type !== Types.DEFAULT;

    return (
        <Box
            borderWidth={1}
            borderRadius="lg"
            d="block"
            maxW="100%"
            overflow="hidden"
            bgColor={isUnpublish || isDone ? 'gray.50' : 'transparent'}
        >
            {/* Header */}
            <Flex align="center" px={{ base: 4, md: 6 }} py={4} justify="space-between">
                <UserBadge
                    avatarUrl={userAvatarUrl}
                    onClick={onUserNameClick}
                    styles={isUnpublish || isDone ? { filter: 'grayscale(100%)', mr: 4 } : { mr: 4 }}
                    subtitle={shortUserDesc}
                    title={userName}
                />

                {showMenu && (
                    <CardMenu>
                        {!isDone && (
                            <>
                                <MenuItem>
                                    <EditIcon mr={2} fontSize="lg" /> Edytuj
                                </MenuItem>
                                {isUnpublish ? (
                                    <MenuItem>
                                        <PublishIcon mr={2} fontSize="lg" /> Publikuj
                                    </MenuItem>
                                ) : (
                                    <MenuItem>
                                        <UnpublishIcon mr={2} fontSize="lg" /> Cofnij publikację
                                    </MenuItem>
                                )}
                            </>
                        )}
                        <MenuItem color="red.500">
                            <DeleteIcon mr={2} /> Usuń
                        </MenuItem>
                    </CardMenu>
                )}
            </Flex>

            <Divider />

            {/* Contentent */}
            <Box px={{ base: 4, md: 6 }} py={4}>
                {isUnpublish && (
                    <>
                        <Badge mb={2} colorScheme="orange" variant="solid">
                            Wersja robocza
                        </Badge>
                        <br />
                    </>
                )}
                {isDone && (
                    <>
                        <Badge mb={2} colorScheme="green" variant="solid">
                            Zrealizowane
                        </Badge>
                        <br />
                    </>
                )}
                <Heading alignItems="center" d="flex" size="md" flexWrap="wrap">
                    <Tag
                        bgColor="orange.500"
                        borderRadius="full"
                        filter={isUnpublish || isDone ? 'grayscale(100%)' : 'grayscale(0)'}
                        my={1}
                        px={4}
                        variant="solid"
                    >
                        {category}
                    </Tag>
                    <Box
                        as="span"
                        d="inline-block"
                        cursor="pointer"
                        ml={2}
                        onClick={onTitleClick}
                        _hover={{ textDecor: 'underline' }}
                    >
                        {title}
                    </Box>
                </Heading>

                <Box color="gray.500" mb={2}>
                    <LocationIcon mt={-1} /> {address}
                </Box>

                <Text mb={2}>{content}</Text>
            </Box>

            <Divider />

            {/* Footer */}
            <Box px={{ base: 4, md: 6 }} py={4}>
                <Flex align="center" justify="space-between">
                    <Flex flexGrow={1} justify="flex-end">
                        <Text as="span" align="center">
                            <Box as="span" color="gray.500" fontSize="sm">
                                {publishDate} <CalendarIcon ml={1} mt={-1} fontSize="md" />
                            </Box>
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};
