import React from 'react';

import { ROUTES } from '@config/app';

import { Box, Divider, Flex, Heading, Tag, Text, HStack, SimpleGrid } from '@chakra-ui/react';
import { CalendarIcon, DeleteIcon, EditIcon, LocationIcon } from '@theme/customIcons';
import { Link as RouterLink } from 'react-router-dom';
import ModalFrame from '@components/ModalFrame';
import UserBadge from '@components/UserBadge';
import ProposalEdit from '@components/ProposalEdit';

export enum Types {
    HEADLESS = 'headless',
    EDITABLE = 'editable',
    UNPUBLISH = 'unpublish',
    DEFAULT = 'default',
}
export interface IProps {
    type?: Types;
    onUserClick?: () => void;
}

export const Card: React.FC<IProps> = ({ type = Types.DEFAULT, onUserClick }) => (
    <Box borderWidth={1} borderRadius="lg" d="block" maxW="100%" overflow="hidden">
        {type !== Types.HEADLESS && (
            <Flex align="center" px={{ base: 4, md: 6 }} py={4} justify="space-between">
                <UserBadge
                    avatarUrl="https://bit.ly/sage-adebayo"
                    onClick={onUserClick}
                    subtitle={'Kanapowy sportowiec i mamusin przystojniak'}
                    title="Jan Baraban"
                />
            </Flex>
        )}

        <Divider />

        <Box px={{ base: 4, md: 6 }} py={4}>
            <Box mb={{ base: 1, md: 0 }}>
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
            </Box>

            <Box color="gray.500" mb={2}>
                <LocationIcon /> Warszawa, Bemowo
            </Box>

            <Text mb={2} fontSize="sm">
                Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera
                do głębokiego lenistwa Poszuk partnera ...
            </Text>
        </Box>

        <Divider />

        <Box px={{ base: 4, md: 6 }} py={4}>
            <Flex align="center" justify="space-between">
                <Flex flexGrow={1} justify="flex-end" mr={type === Types.EDITABLE ? 6 : 0}>
                    <Text as="span" align="center">
                        <Box as="span" color="gray.500" fontSize="sm">
                            01.12.2020 <CalendarIcon ml={1} fontSize="md" />
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
