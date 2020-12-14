import React from 'react';

import { Box, Divider, Flex, Heading, Tag, Text, HStack, SimpleGrid } from '@chakra-ui/react';
import { CalendarIcon, DeleteIcon, EditIcon, LocationIcon, ShowIcon } from '@theme/customIcons';
import ModalFrame from '@components/ModalFrame';
import UserBadge from '@components/UserBadge';
import ProposalEdit from '@components/ProposalEdit';

interface IProps {
    isEditable?: boolean;
}

export const Card: React.FC<IProps> = ({ isEditable }) => (
    <Box borderWidth={1} borderRadius="lg" d="block" maxW="100%" overflow="hidden">
        <Flex align="center" px={6} py={4} justify="space-between">
            <UserBadge
                avatarUrl="https://bit.ly/sage-adebayo"
                title="Jan Baraban"
                subtitle={
                    <Box as="span" color="gray.500">
                        <LocationIcon mr={1} /> Warszawa, Bemowo
                    </Box>
                }
            />
            {isEditable && (
                <HStack spacing={3} d={{ base: 'none', md: 'flex' }}>
                    <ModalFrame
                        actionTitle="Tak, usuń"
                        triggerIcon={<DeleteIcon color="white" />}
                        buttonProps={{
                            backgroundColor: 'red.500',
                            d: 'flex',
                            fontSize: 20,
                            size: 'sm',
                            _active: { backgroundColor: 'red.500' },
                            _hover: { backgroundColor: 'red.400' },
                        }}
                        modalTitle="Usuwanie partnerstwa"
                        onAction={() => {
                            console.log(1);
                        }}
                    >
                        <Text>Czy napawne checesz usunąć to partnerstwo?</Text>
                    </ModalFrame>
                    <ModalFrame
                        triggerIcon={<EditIcon color="white" />}
                        buttonProps={{
                            backgroundColor: 'gray.800',
                            d: 'flex',
                            fontSize: 20,
                            size: 'sm',
                            _active: { backgroundColor: 'gray.800' },
                            _hover: { backgroundColor: 'gray.600' },
                        }}
                        modalTitle="Edycja partnerstwa"
                        size="xl"
                        onAction={() => {
                            console.log(1);
                        }}
                    >
                        <ProposalEdit />
                    </ModalFrame>
                </HStack>
            )}
        </Flex>

        <Divider />

        <Box px={6} py={4}>
            <Tag borderRadius="full" backgroundColor="green.500" px={3} variant="solid" mb={2}>
                Sport
            </Tag>
            <Heading as="h4" mb={2} size="md">
                Poszukuję partnera do głębokiego lenistwa
            </Heading>

            <Text mb={2} fontSize="sm">
                Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera
                do głębokiego lenistwa Poszuk partnera ...
            </Text>
        </Box>

        <Divider />

        <Box px={6} py={4}>
            <Flex align="center" justify="space-between">
                <Flex as="span" align="center" color="gray.500" fontSize="sm">
                    34 <ShowIcon ml={1} fontSize="md" />
                </Flex>
                <Flex as="span" align="center">
                    <Box as="span" color="gray.500" fontSize="sm">
                        01.12.2020 <CalendarIcon ml={1} fontSize="md" />
                    </Box>
                </Flex>
            </Flex>
        </Box>

        {isEditable && (
            <Box d={{ base: 'block', md: 'none' }} px={6} pb={4}>
                <SimpleGrid spacing={6} d={{ base: 'grid', md: 'none' }} templateColumns="repeat(2, 1fr)">
                    <ModalFrame
                        actionTitle="Tak, usuń"
                        triggerIcon={<DeleteIcon color="white" />}
                        buttonProps={{
                            backgroundColor: 'red.500',
                            d: 'flex',
                            fontSize: 20,
                            size: 'sm',
                            _active: { backgroundColor: 'red.500' },
                            _hover: { backgroundColor: 'red.400' },
                        }}
                        modalTitle="Usuwanie partnerstwa"
                        onAction={() => {
                            console.log(1);
                        }}
                    >
                        <Text>Czy napawne checesz usunąć to partnerstwo?</Text>
                    </ModalFrame>
                    <ModalFrame
                        triggerIcon={<EditIcon color="white" />}
                        buttonProps={{
                            backgroundColor: 'gray.800',
                            d: 'flex',
                            fontSize: 20,
                            size: 'sm',
                            _active: { backgroundColor: 'gray.800' },
                            _hover: { backgroundColor: 'gray.600' },
                        }}
                        modalTitle="Edycja partnerstwa"
                        size="xl"
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
