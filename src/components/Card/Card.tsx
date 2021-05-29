import React from 'react';

import { Box, Badge, Divider, Flex, Heading, Tag, Text } from '@chakra-ui/react';
import { CalendarIcon, LocationIcon } from '@theme/customIcons';
import UserBadge from '@components/UserBadge';

import CardMenu from '@src/components/CardMenu';

export enum Types {
    DEFAULT = 'default',
    EDITABLE = 'editable',
    UNPUBLISH = 'unpublish',
    DONE = 'done',
}

export interface IProps {
    address: string;
    categoryName: string;
    content: string;
    publishDate: string;
    shortUserDesc: string;
    title: string;
    userAvatarUrl: string;
    userName: string;
    categoryColor?: string;
    deleteActionButton?: React.ReactElement;
    editActionButton?: React.ReactElement;
    type?: Types;
    onUserNameClick?: () => void;
    onTitleClick?: () => void;
}

export const Card: React.FC<IProps> = ({
    address,
    categoryName,
    content,
    publishDate,
    shortUserDesc,
    title,
    userAvatarUrl,
    userName,
    editActionButton,
    deleteActionButton,
    categoryColor = 'orange.500',
    type = Types.DEFAULT,
    onTitleClick,
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
                                {editActionButton}
                                {/* TODO uncomit it when implement publish functionality */}
                                {/* {isUnpublish ? (
                                    <MenuItem>
                                        <PublishIcon mr={2} fontSize="lg" /> Publikuj
                                    </MenuItem>
                                ) : (
                                    <MenuItem>
                                        <UnpublishIcon mr={2} fontSize="lg" /> Cofnij publikację
                                    </MenuItem>
                                )} */}
                            </>
                        )}
                        {deleteActionButton}
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
                        bgColor={categoryColor}
                        borderRadius="full"
                        filter={isUnpublish || isDone ? 'grayscale(100%)' : 'grayscale(0)'}
                        my={1}
                        px={4}
                        variant="solid"
                    >
                        {categoryName}
                    </Tag>
                    <Box
                        as="span"
                        d="inline-block"
                        cursor="pointer"
                        ml={2}
                        onClick={onTitleClick}
                        _hover={{
                            textDecor: onTitleClick ? 'underline' : 'unset',
                            cursor: onTitleClick ? 'pointer' : 'default',
                        }}
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
