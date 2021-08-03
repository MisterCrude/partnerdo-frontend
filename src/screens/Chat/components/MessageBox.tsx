import { AVATAR_FALLBACK_URL } from '@consts/app';
import { getStaticURL } from '@utils/misc';

import { AspectRatio, Box, Circle, Image, Flex, Heading, Stack, Text, Tag, MenuItem } from '@chakra-ui/react';
import { DeleteIcon, LocationIcon, SmallDangerIcon, SmallTickIcon } from '@theme/customIcons';
import CardMenu from '@components/CardMenu';

export enum Types {
    DEFAULT = 'default',
    REJECTED = 'rejected',
    SECONDARY = 'secondary',
    APPROVED = 'approved',
}

// TODO create types like in Card, avoiding have isRejected and hasNewMessage in the same time

export interface IProps {
    address: string;
    categoryName: string;
    title: string;
    userAvatarUrl: string;
    userName: string;
    lastMessageTime: string;
    onTitleClick: () => void;
    onUserNameClick: () => void;
    categoryColor?: string;
    newMessagesAmount?: number | string;
    subtitle?: string;
    type?: Types;
}

const MessageBox = ({
    address,
    categoryColor = 'orange.500',
    categoryName,
    lastMessageTime,
    newMessagesAmount = 0,
    onTitleClick,
    onUserNameClick,
    subtitle,
    title,
    type = Types.DEFAULT,
    userAvatarUrl,
    userName,
}: IProps) => {
    const hasNewMessage = newMessagesAmount > 0;
    const isRejected = type === Types.REJECTED;
    const isSecondary = type === Types.SECONDARY;
    const isApproved = type === Types.APPROVED;

    const getCircleIcon = () => {
        if (isRejected) {
            return <SmallDangerIcon fontSize={38} />;
        } else if (isApproved) {
            return <SmallTickIcon fontSize={38} />;
        }
        return newMessagesAmount;
    };

    // TODO refactor it
    const messageBoxMap: Record<Types, Record<string, string>> = {
        [Types.DEFAULT]: {
            borderColor: 'inherit',
            backgroundColor: 'white',
            circleColor: 'orange.500',
        },
        [Types.SECONDARY]: {
            borderColor: 'inherit',
            backgroundColor: 'white',
            circleColor: 'orange.500',
        },
        [Types.REJECTED]: {
            borderColor: 'red.100',
            backgroundColor: 'red.50',
            circleColor: 'red.600',
        },
        [Types.APPROVED]: {
            borderColor: 'green.100',
            backgroundColor: 'green.50',
            circleColor: 'green.600',
        },
    };

    const showCircle = hasNewMessage || isRejected || isApproved;

    return (
        <Box
            bgColor={messageBoxMap[type].backgroundColor}
            borderColor={messageBoxMap[type].borderColor}
            borderRadius="lg"
            borderWidth={1}
            d="flex"
            p={4}
            pos="relative"
        >
            {showCircle && (
                <Circle
                    bgColor={messageBoxMap[type].circleColor}
                    color="white"
                    fontWeight="bold"
                    left={-3}
                    minW={7}
                    paddingX={2}
                    pos="absolute"
                    size={7}
                    top={-4}
                    width={isRejected || isApproved ? 7 : 'auto'}
                >
                    {getCircleIcon()}
                </Circle>
            )}

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} flexGrow={1}>
                <AspectRatio w={110} maxW="100%" ration={1}>
                    <Image
                        alt={userName}
                        borderRadius={6}
                        objectFit="cover"
                        src={getStaticURL(userAvatarUrl)}
                        fallbackSrc={AVATAR_FALLBACK_URL}
                    />
                </AspectRatio>

                <Flex align="space-between" flexDir="column" flexGrow={1} justify="space-between">
                    <Flex align="flex-start" justify="space-between" mb={{ base: 1, md: 0 }}>
                        <Box>
                            {isSecondary && (
                                <Text mb={1}>
                                    {subtitle}

                                    <Box
                                        as="strong"
                                        ml={2}
                                        onClick={onUserNameClick}
                                        _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                                    >
                                        {userName}
                                    </Box>
                                </Text>
                            )}

                            <Flex align="center" flexWrap="wrap">
                                <Tag borderRadius="full" bgColor={categoryColor} px={4} my={1} variant="solid">
                                    {categoryName}
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
                                <LocationIcon pos="relative" top="-2px" /> {address}
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
                            <strong>Ostatnia wiadomość:</strong> {lastMessageTime}
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
        <Flex justifyContent={{ base: 'center', md: 'space-between' }} pt={3}>
                    <Button onClick={onRemoveAccountClose} flexGrow={{ base: 1, md: 0 }} mr={4}>
                        Zamknij
                    </Button>
                    <Button onClick={() => null} colorScheme="orange" flexGrow={{ base: 1, md: 0 }} ml={4}>
                        Tak, usuń
                    </Button>
                </Flex>
    </ModalFrame>
</Box>; */
