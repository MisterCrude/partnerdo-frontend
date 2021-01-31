import React from 'react';

import { Box, Divider, Flex, Heading, Tag, Text, HStack, SimpleGrid } from '@chakra-ui/react';
import { CalendarIcon, DeleteIcon, EditIcon, LocationIcon } from '@theme/customIcons';
import ModalFrame from '@components/ModalFrame';
import UserBadge from '@components/UserBadge';
import ProposalEdit from '@components/ProposalEdit';

export enum Types {
    DEFAULT = 'default',
    HEADLESS = 'headless',
    EDITABLE = 'editable',
    UNPUBLISH = 'unpublish',
}
export interface IProps {
    address: string;
    category: string;
    content: string;
    publishDate: string;
    title: string;
    userAvatarUrl: string;
    userName: string;
    userSlogan: string;
    onTitleClick: () => void;
    type?: Types;
    onUserClick?: () => void;
}

export const Card: React.FC<IProps> = ({
    address,
    category,
    content,
    publishDate,
    title,
    type = Types.DEFAULT,
    userAvatarUrl,
    userName,
    userSlogan,
    onUserClick,
    onTitleClick,
}) => (
    <Box borderWidth={1} borderRadius="lg" d="block" maxW="100%" overflow="hidden">
        {type !== Types.HEADLESS && (
            <Flex align="center" px={{ base: 4, md: 6 }} py={4} justify="space-between">
                <UserBadge avatarUrl={userAvatarUrl} onClick={onUserClick} subtitle={userSlogan} title={userName} />
            </Flex>
        )}

        <Divider />

        <Box px={{ base: 4, md: 6 }} py={4}>
            <Box mb={{ base: 1, md: 0 }}>
                <Heading
                    cursor="pointer"
                    d="inline"
                    size="md"
                    onClick={onTitleClick}
                    _hover={{ textDecor: 'underline' }}
                >
                    {title}
                </Heading>{' '}
                <Tag borderRadius="full" bgColor="orange.500" px={4} variant="solid">
                    {category}
                </Tag>
            </Box>

            <Box color="gray.500" mb={2}>
                <LocationIcon mt={-1} /> {address}
            </Box>

            <Text mb={2} fontSize="sm">
                {content}
            </Text>
        </Box>

        <Divider />

        <Box px={{ base: 4, md: 6 }} py={4}>
            <Flex align="center" justify="space-between">
                <Flex flexGrow={1} justify="flex-end" mr={type === Types.EDITABLE ? 6 : 0}>
                    <Text as="span" align="center">
                        <Box as="span" color="gray.500" fontSize="sm">
                            {publishDate} <CalendarIcon ml={1} fontSize="md" />
                        </Box>
                    </Text>
                </Flex>

                {type === Types.EDITABLE && (
                    <HStack spacing={3} d={{ base: 'none', md: 'flex' }}>
                        <ModalFrame
                            actionTitle="Tak, usuń"
                            triggerIcon={<DeleteIcon color="red.500" />}
                            buttonProps={{
                                d: 'flex',
                                fontSize: 20,
                            }}
                            modalTitle="Usuwanie partnerstwa"
                            onAction={() => {
                                console.log(1);
                            }}
                        >
                            <Text>Czy napawne checesz usunąć to partnerstwo?</Text>
                        </ModalFrame>
                        <ModalFrame
                            triggerIcon={<EditIcon color="gray.800" />}
                            buttonProps={{
                                d: 'flex',
                                fontSize: 20,
                            }}
                            modalTitle="Edycja partnerstwa"
                            size="4xl"
                            onAction={() => {
                                console.log(1);
                            }}
                        >
                            <ProposalEdit />
                        </ModalFrame>
                    </HStack>
                )}
            </Flex>
        </Box>

        {type === Types.EDITABLE && (
            <Box d={{ base: 'block', md: 'none' }} px={{ base: 4, md: 6 }} pb={4}>
                <SimpleGrid spacing={6} d={{ base: 'grid', md: 'none' }} templateColumns="repeat(2, 1fr)">
                    <ModalFrame
                        actionTitle="Tak, usuń"
                        triggerIcon={<DeleteIcon color="red.500" />}
                        buttonProps={{
                            d: 'flex',
                            fontSize: 20,
                        }}
                        modalTitle="Usuwanie partnerstwa"
                        onAction={() => {
                            console.log(1);
                        }}
                    >
                        <Text>Czy napawne checesz usunąć to partnerstwo?</Text>
                    </ModalFrame>
                    <ModalFrame
                        triggerIcon={<EditIcon color="gray.800" />}
                        buttonProps={{
                            d: 'flex',
                            fontSize: 20,
                        }}
                        modalTitle="Edycja partnerstwa"
                        size="4xl"
                        onAction={() => {
                            console.log(1);
                        }}
                    >
                        <ProposalEdit />
                    </ModalFrame>
                </SimpleGrid>
            </Box>
        )}
    </Box>
);
