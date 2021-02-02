import React from 'react';

import {
    Box,
    Badge,
    Divider,
    Flex,
    Heading,
    Tag,
    Text,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import {
    CalendarIcon,
    DeleteIcon,
    EditIcon,
    LocationIcon,
    DotsMenuIcon,
    UnpublishIcon,
    PublishIcon,
} from '@theme/customIcons';
import UserBadge from '@components/UserBadge';

export enum Types {
    DEFAULT = 'default',
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
    onUserNameClick?: () => void;
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
    onUserNameClick,
    onTitleClick,
}) => {
    const isUnpublish = type === Types.UNPUBLISH;
    const isEditable = type === Types.EDITABLE;

    return (
        <Box
            borderWidth={1}
            borderRadius="lg"
            d="block"
            maxW="100%"
            overflow="hidden"
            bgColor={isUnpublish ? 'gray.50' : 'transparent'}
        >
            <Flex align="center" px={{ base: 4, md: 6 }} py={4} justify="space-between">
                <UserBadge
                    avatarUrl={userAvatarUrl}
                    onClick={onUserNameClick}
                    styles={isUnpublish ? { filter: 'grayscale(100%)', mr: 4 } : { mr: 4 }}
                    subtitle={userSlogan}
                    title={userName}
                />

                {(isEditable || isUnpublish) && (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Menu"
                            color="gray.800"
                            d="flex"
                            size="sm"
                            fontSize={25}
                            icon={<DotsMenuIcon />}
                        />

                        <MenuList>
                            {isUnpublish && (
                                <MenuItem>
                                    <PublishIcon mr={2} /> Publikuj
                                </MenuItem>
                            )}
                            <MenuItem>
                                <EditIcon mr={2} /> Edytuj
                            </MenuItem>
                            {!isUnpublish && (
                                <MenuItem>
                                    <UnpublishIcon mr={2} /> Cofnij publikację
                                </MenuItem>
                            )}
                            <MenuItem color="red.500">
                                <DeleteIcon mr={2} /> Usuń
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>

            <Divider />

            <Box px={{ base: 4, md: 6 }} py={4}>
                {isUnpublish && (
                    <>
                        <Badge mb={2} colorScheme="orange" variant="solid">
                            Wersja robocza
                        </Badge>
                        <br />
                    </>
                )}
                <Heading size="md">
                    <Box as="span" cursor="pointer" mr={2} onClick={onTitleClick} _hover={{ textDecor: 'underline' }}>
                        {title}
                    </Box>
                </Heading>

                <Box color="gray.500" mb={2}>
                    <LocationIcon mt={-1} /> {address}
                </Box>

                <Text mb={2}>{content}</Text>
            </Box>

            <Divider />

            <Box px={{ base: 4, md: 6 }} py={4}>
                <Flex align="center" justify="space-between">
                    <Flex flexGrow={1} justify="space-between">
                        <Tag
                            bgColor="orange.500"
                            borderRadius="full"
                            filter={isUnpublish ? 'grayscale(100%)' : 'grayscale(0)'}
                            px={4}
                            variant="solid"
                        >
                            {category}
                        </Tag>

                        <Text as="span" align="center">
                            <Box as="span" color="gray.500" fontSize="sm">
                                {publishDate} <CalendarIcon ml={1} mt={-1} fontSize="md" />
                            </Box>
                        </Text>
                    </Flex>

                    {/* {type === Types.EDITABLE && (
                    <HStack spacing={3} d={{ base: 'none', md: 'flex' }}>
                        <ModalFrame
                            actionTitle="Tak, usuń"
                            triggerIcon={<DeleteIcon color="tomato" />}
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
                )} */}
                </Flex>
            </Box>
        </Box>
    );
};
