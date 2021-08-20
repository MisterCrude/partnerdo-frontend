import { AVATAR_FALLBACK_URL } from '@consts/app';
import { getStaticURL } from '@utils/misc';

import { Box, Circle, Heading, Stack, Text, Tag, MenuItem, Avatar } from '@chakra-ui/react';
import { DeleteIcon, LocationIcon, SmallDangerIcon, SmallTickIcon } from '@theme/customIcons';
import CardMenu from '@components/CardMenu';

export enum Type {
    DEFAULT = 'default',
    REJECTED = 'rejected',
    APPROVED = 'approved',
}

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
    unreadMessageAmount?: number;
    type?: Type;
}

const messageBoxStyles: Record<Type, Record<string, string>> = {
    [Type.DEFAULT]: {
        borderColor: 'inherit',
        backgroundColor: 'white',
        circleColor: 'orange.500',
    },
    [Type.REJECTED]: {
        borderColor: 'red.100',
        backgroundColor: 'red.50',
        circleColor: 'red.600',
    },
    [Type.APPROVED]: {
        borderColor: 'green.100',
        backgroundColor: 'green.50',
        circleColor: 'green.600',
    },
};

const MessageBox = ({
    address,
    categoryName,
    lastMessageTime,
    unreadMessageAmount = 0,
    onTitleClick,
    onUserNameClick,
    title,
    userAvatarUrl,
    userName,
    categoryColor = 'orange.500',
    type = Type.DEFAULT,
}: IProps) => {
    const hasUnredMessage = unreadMessageAmount > 0;
    const isRejected = type === Type.REJECTED;
    const isApproved = type === Type.APPROVED;

    const showCircle = hasUnredMessage || isRejected || isApproved;
    const showMessageAmount = hasUnredMessage && !isRejected && !isApproved;
    const renderCircle = showCircle && (
        <Circle
            bgColor={messageBoxStyles[type].circleColor}
            color="white"
            fontWeight="bold"
            left={-3}
            minW={7}
            paddingX={2}
            pos="absolute"
            size={7}
            top={-4}
            width={showMessageAmount ? 'auto' : 7}
        >
            {isRejected && <SmallDangerIcon fontSize={38} />}
            {isApproved && <SmallTickIcon fontSize={38} />}
            {showMessageAmount && unreadMessageAmount}
        </Circle>
    );

    return (
        <Box
            bgColor={messageBoxStyles[type].backgroundColor}
            borderColor={messageBoxStyles[type].borderColor}
            borderRadius="lg"
            borderWidth={1}
            pos="relative"
        >
            {renderCircle}

            <Stack isInline spacing={8} p={4}>
                <Stack isInline align="center">
                    <Avatar name={userName} src={userAvatarUrl ? getStaticURL(userAvatarUrl) : AVATAR_FALLBACK_URL} />

                    <Text
                        d={{ base: 'none', md: 'inline' }}
                        fontSize="sm"
                        fontWeight="bold"
                        onClick={onUserNameClick}
                        _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                    >
                        {userName}
                    </Text>
                </Stack>

                <Stack flexGrow={1}>
                    <Box>
                        <Stack isInline align="center" flexWrap="wrap">
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
                        </Stack>

                        <Text fontSize="md" color="gray.500">
                            <LocationIcon pos="relative" top="-2px" /> {address}
                        </Text>
                    </Box>
                </Stack>

                <Stack align="flex-end">
                    <Box as={CardMenu}>
                        <MenuItem color="red.500">
                            <DeleteIcon mr={2} /> Usuń
                        </MenuItem>
                    </Box>

                    {lastMessageTime && (
                        <Text as="span" color="gray.500" fontSize="xs" mr={3}>
                            <strong>Ostatnia wiadomość:</strong> {lastMessageTime}
                        </Text>
                    )}
                </Stack>
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
