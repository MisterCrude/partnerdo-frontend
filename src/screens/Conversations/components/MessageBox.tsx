import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '@config/app';

import { AspectRatio, Box, Circle, Image, Flex, Heading, Stack, Text, Tag } from '@chakra-ui/react';
import { DeleteIcon, LocationIcon } from '@theme/customIcons';
import ModalFrame from '@components/ModalFrame';

export interface IProps {
    newMessagesAmount?: number;
}

export const MessageBox: React.FC<IProps> = ({ newMessagesAmount = 0 }) => {
    const hasNewMessage = newMessagesAmount > 0;

    return (
        <Box
            as={RouterLink}
            bgColor={newMessagesAmount ? 'gray.50' : 'white'}
            borderRadius="lg"
            borderWidth={1}
            d="flex"
            p={4}
            pos="relative"
            to={`${ROUTES.CONVERSATIONS}/some-convs-id`}
        >
            {hasNewMessage && (
                <Circle bgColor="tomato" color="white" fontWeight="bold" left={-3} pos="absolute" size={7} top={-3}>
                    {newMessagesAmount}
                </Circle>
            )}

            <Box pos="absolute" top={4} right={4}>
                <ModalFrame
                    actionTitle="Tak, usuń"
                    triggerIcon={<DeleteIcon color="tomato" />}
                    buttonProps={{
                        d: 'flex',
                        fontSize: 20,
                    }}
                    modalTitle="Usuwanie konwersacji"
                    onAction={() => {
                        console.log(1);
                    }}
                >
                    <Text>Czy napawne checesz usunąć tą konwersację?</Text>
                </ModalFrame>
            </Box>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <AspectRatio w={110} maxW="100%" ration={1}>
                    <Image
                        alt="Jan Baraban"
                        borderRadius={6}
                        objectFit="cover"
                        src="https://bit.ly/sage-adebayo"
                        fallbackSrc="https://via.placeholder.com/300"
                    />
                </AspectRatio>

                <Flex align="space-between" flexDir="column" flexGrow={1} justify="space-between">
                    <Flex align="flex-start" justify="space-between" mb={{ base: 1, md: 0 }}>
                        <Box>
                            <Heading d="inline-block" size="md" mb={{ base: 3, md: 0 }}>
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
                    <Flex align="center" justify="space-between">
                        <Text fontSize="sm" fontWeight="bold" d={{ base: 'none', md: 'inline' }}>
                            Jan Baraban
                        </Text>
                        <Text as="span" color="gray.500" fontSize="sm">
                            <strong>Ostatnia wiadomość:</strong> 14:40
                        </Text>
                    </Flex>
                </Flex>
            </Stack>
        </Box>
    );
};

export default MessageBox;
