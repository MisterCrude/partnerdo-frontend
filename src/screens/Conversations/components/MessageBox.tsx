import React from 'react';

import { AspectRatio, Box, Circle, Image, Flex, Heading, Stack, Text, Tag, MenuItem } from '@chakra-ui/react';
import { DeleteIcon, LocationIcon } from '@theme/customIcons';
import CardMenu from '@src/components/CardMenu';
// import ModalFrame from '@components/ModalFrame';

export interface IProps {
    onTitleClick: () => void;
    onUserNameClick: () => void;
    newMessagesAmount?: number;
}

export const MessageBox: React.FC<IProps> = ({ onUserNameClick, onTitleClick, newMessagesAmount = 0 }) => {
    const hasNewMessage = newMessagesAmount > 0;

    return (
        <Box
            bgColor={newMessagesAmount ? 'gray.50' : 'white'}
            borderRadius="lg"
            borderWidth={1}
            d="flex"
            p={4}
            pos="relative"
            shadow="md"
        >
            {hasNewMessage && (
                <Circle bgColor="tomato" color="white" fontWeight="bold" left={-3} pos="absolute" size={7} top={-3}>
                    {newMessagesAmount}
                </Circle>
            )}

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} flexGrow={1}>
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
                            <Flex align="center" flexWrap="wrap">
                                <Heading
                                    d="inline-block"
                                    mr={2}
                                    onClick={onTitleClick}
                                    size="md"
                                    _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                                >
                                    Poszukuję partnera do głębokiego lenistwa
                                </Heading>
                                <Tag borderRadius="full" bgColor="orange.500" px={4} my={1} variant="solid">
                                    Sport
                                </Tag>
                            </Flex>

                            <Text fontSize="md" color="gray.500">
                                <LocationIcon pos="relative" top="-2px" /> Warszawa, Bemowo
                            </Text>
                        </Box>

                        <Box ml={4}>
                            <CardMenu>
                                <MenuItem color="red.500">
                                    <DeleteIcon mr={2} /> Usuń
                                </MenuItem>
                            </CardMenu>
                        </Box>
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text
                            d={{ base: 'none', md: 'inline' }}
                            fontSize="sm"
                            fontWeight="bold"
                            onClick={onUserNameClick}
                            _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                        >
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

/* <Box pos="absolute" top={4} right={4}>
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
</Box>; */
