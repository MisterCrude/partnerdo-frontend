import React from 'react';

import {
    Box,
    Button,
    Circle,
    CloseButton,
    Divider,
    IconButton,
    Flex,
    HStack,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    MenuDivider,
    MenuItem,
    MenuList,
    Menu,
    MenuButton,
    Link,
    useDisclosure,
    UseDisclosureProps,
    VStack,
} from '@chakra-ui/core';
import { ChatIcon, DangerIcon, MenuIcon, ProfileIcon } from '@theme/customIcons';
import { BAND_NAME } from '@src/config';

interface IProps {
    hasMessages: boolean;
    isLoggedin: boolean;
}

interface IPropsMessageMenuItem {
    hasMessages: boolean;
}

interface IPropsMobileMenu {
    isLoggedin: boolean;
}

export const ProfileMenuItem: React.FC = () => (
    <Menu>
        <MenuButton
            as={IconButton}
            color="gray"
            variant="unstyled"
            aria-label="User profile"
            icon={<ProfileIcon fontSize={28} />}
        />
        <MenuList>
            <MenuItem>Profil</MenuItem>
            <MenuDivider />
            <MenuItem>Moje partnerstwa</MenuItem>
            <MenuItem>Zrealizowane partnerstwa</MenuItem>
            <MenuDivider />
            <MenuItem>Wyloguj się</MenuItem>
        </MenuList>
    </Menu>
);

export const MessageMenuItem: React.FC<IPropsMessageMenuItem> = ({ hasMessages }) => (
    <Box as="span" position="relative">
        <IconButton color="gray" variant="unstyled" aria-label="Messages" icon={<ChatIcon fontSize={28} />} />
        {hasMessages && (
            <Circle position="absolute" size={3} backgroundColor="tomato" color="white" top={2} right={1} />
        )}
    </Box>
);

export const MobileMenu: React.FC<IPropsMobileMenu> = ({ isLoggedin }) => {
    const { isOpen, onOpen, onClose }: UseDisclosureProps = useDisclosure();

    return (
        <>
            <MenuIcon fontSize={36} onClick={() => onOpen()} />

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
                <ModalOverlay />
                <Box as={ModalContent} borderRadius={0} minHeight="100vh" margin={0}>
                    <ModalHeader alignItems="center" display="flex" justifyContent="space-between" padding={8}>
                        {BAND_NAME} <CloseButton onClick={onClose} fontSize={18} />
                    </ModalHeader>
                    <Divider />
                    <VStack as="nav" align="stretch" spacing={0}>
                        {isLoggedin ? (
                            <>
                                <Link
                                    href="#"
                                    paddingY={6}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Moje partnerstwa
                                </Link>
                                <Link
                                    href="#"
                                    paddingY={6}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Zrealizowane partnerstwa
                                </Link>
                                <Divider />
                                <Link
                                    href="#"
                                    paddingY={6}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Jak działa {BAND_NAME}?
                                </Link>
                                <Divider />
                                <Link
                                    href="#"
                                    paddingY={6}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Wyloguj się
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="#"
                                    paddingY={6}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Jak działa {BAND_NAME}?
                                </Link>
                                <Link
                                    href="#"
                                    paddingY={6}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Polityka prywatności
                                </Link>
                                <Link
                                    href="#"
                                    paddingY={6}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Regulamin
                                </Link>
                            </>
                        )}
                    </VStack>
                </Box>
            </Modal>
        </>
    );
};

export const Header: React.FC<IProps> = ({ hasMessages, isLoggedin }) => (
    <header>
        <Flex alignItems="center" justifyContent="space-between" p={8}>
            <Heading as="h2" size="lg">
                PartnerDo
            </Heading>

            <HStack spacing={isLoggedin ? 6 : 4} display={{ base: 'none', md: 'flex' }}>
                <HStack spacing={2}>
                    <IconButton color="gray" variant="unstyled" aria-label="faq" icon={<DangerIcon fontSize={28} />} />
                    {isLoggedin && (
                        <>
                            <MessageMenuItem hasMessages={hasMessages} />
                            <ProfileMenuItem />
                        </>
                    )}
                </HStack>
                <HStack spacing={4}>
                    {isLoggedin ? (
                        <Button size="lg" colorScheme="orange">
                            Dadaj partnerstwo
                        </Button>
                    ) : (
                        <>
                            <Button size="lg" variant="outline">
                                Zaloguj się
                            </Button>
                            <Button size="lg" colorScheme="orange">
                                Zarejestruj się
                            </Button>
                        </>
                    )}
                </HStack>
            </HStack>

            <Box display={{ base: 'flex', md: 'none' }} alignItems="center">
                <MobileMenu isLoggedin={isLoggedin} />
            </Box>
        </Flex>
    </header>
);
