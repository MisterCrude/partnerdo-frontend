import React from 'react';
import { AVATAR_FALLBACK_URL } from '@consts/app';

import { AspectRatio, Box, Circle, Image, Flex, Heading, Stack, Text, Tag, MenuItem } from '@chakra-ui/react';
import { DeleteIcon, LocationIcon, SmallDangerIcon } from '@theme/customIcons';
import CardMenu from '@src/components/CardMenu';

export enum Types {
    DEFAULT = 'default',
    REJECTED = 'rejected',
    SECONDARY = 'secondary',
}

export interface IProps {
    category: string;
    title: string;
    userAvatarUrl: string;
    userName: string;
    onTitleClick: () => void;
    onUserNameClick: () => void;
    newMessagesAmount?: number;
    subtitle?: string;
    type?: Types;
}

export const MessageBox: React.FC<IProps> = ({
    title,
    category,
    userAvatarUrl,
    userName,
    onUserNameClick,
    onTitleClick,
    subtitle,
    newMessagesAmount = 0,
    type = Types.DEFAULT,
}) => {
    const hasNewMessage = newMessagesAmount > 0;
    const isRejected = type === Types.REJECTED;
    const isSecondary = type === Types.SECONDARY;

    return (
        <Box
            bgColor={isRejected ? 'red.50' : 'white'}
            borderColor={isRejected ? 'red.100' : 'inherit'}
            borderRadius="lg"
            borderWidth={1}
            d="flex"
            p={4}
            pos="relative"
        >
            {(hasNewMessage || isRejected) && (
                <Circle
                    bgColor={isRejected ? 'red.600' : 'orange.500'}
                    color="white"
                    fontWeight="bold"
                    left={-3}
                    pos="absolute"
                    size={7}
                    top={-3}
                >
                    {isRejected ? <SmallDangerIcon fontSize={38} /> : newMessagesAmount}
                </Circle>
            )}

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} flexGrow={1}>
                <AspectRatio w={110} maxW="100%" ration={1}>
                    <Image
                        alt={userName}
                        borderRadius={6}
                        objectFit="cover"
                        src={userAvatarUrl}
                        fallbackSrc={AVATAR_FALLBACK_URL}
                    />
                </AspectRatio>

                <Flex align="space-between" flexDir="column" flexGrow={1} justify="space-between">
                    <Flex align="flex-start" justify="space-between" mb={{ base: 1, md: 0 }}>
                        <Box>
                            {isSecondary && (
                                <Text mb={1}>
                                    <Box
                                        as="strong"
                                        mr={2}
                                        onClick={onUserNameClick}
                                        _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                                    >
                                        {userName}
                                    </Box>
                                    {subtitle}
                                </Text>
                            )}

                            <Flex align="center" flexWrap="wrap">
                                <Tag borderRadius="full" bgColor="orange.500" px={4} my={1} variant="solid">
                                    {category}
                                </Tag>
                                <Heading
                                    d="inline-block"
                                    ml={2}
                                    onClick={onTitleClick}
                                    size="md"
                                    _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                                >
                                    {title}
                                </Heading>
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
                    <Flex align="center" justify={!isSecondary ? 'space-between' : 'flex-end'}>
                        {!isSecondary && (
                            <Text
                                d={{ base: 'none', md: 'inline' }}
                                fontSize="sm"
                                fontWeight="bold"
                                onClick={onUserNameClick}
                                _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                            >
                                {userName}
                            </Text>
                        )}

                        <Text as="span" color="gray.500" fontSize="xs">
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
