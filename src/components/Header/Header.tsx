import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
} from '@chakra-ui/react';
import { ChatIcon, DangerIcon, MenuIcon, ProfileIcon } from '@theme/customIcons';
import { BRAND_NAME, ROUTES } from '@config/app';

interface IProps {
    hasMessages: boolean;
    isAuth: boolean;
    onLogout: () => void;
}

interface IPropsMessageMenuItem {
    hasMessages: boolean;
}

interface IPropsMobileMenu {
    isAuth: boolean;
    onLogout: () => void;
}

export const ProfileMenuItem: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
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
            <MenuItem onClick={onLogout}>Wyloguj się</MenuItem>
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

export const MobileMenu: React.FC<IPropsMobileMenu> = ({ isAuth, onLogout }) => {
    const { isOpen, onOpen, onClose }: UseDisclosureProps = useDisclosure();

    return (
        <>
            <MenuIcon fontSize={36} onClick={() => onOpen()} />

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
                <ModalOverlay />
                <Box as={ModalContent} borderRadius={0} minHeight="100vh" margin={0}>
                    <ModalHeader alignItems="center" display="flex" justifyContent="space-between" padding={8}>
                        {BRAND_NAME} <CloseButton onClick={onClose} fontSize={18} />
                    </ModalHeader>
                    <Divider />
                    <VStack as="nav" align="stretch" spacing={0}>
                        {isAuth ? (
                            <>
                                <Link
                                    href="#"
                                    paddingY={4}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Moje partnerstwa
                                </Link>
                                <Link
                                    href="#"
                                    paddingY={4}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Zrealizowane partnerstwa
                                </Link>
                                <Divider />
                                <Link
                                    href="#"
                                    paddingY={4}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Jak działa {BRAND_NAME}?
                                </Link>
                                <Divider />
                                <Link
                                    paddingY={4}
                                    paddingX={8}
                                    onClick={onLogout}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Wyloguj się
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="#"
                                    paddingY={4}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Jak działa {BRAND_NAME}?
                                </Link>
                                <Link
                                    href="#"
                                    paddingY={4}
                                    paddingX={8}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Polityka prywatności
                                </Link>
                                <Link
                                    href="#"
                                    paddingY={4}
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

export const Header: React.FC<IProps> = ({ hasMessages, isAuth, onLogout }) => (
    <Flex as="header" alignItems="center" justifyContent="space-between" padding={8}>
        <Heading as={RouterLink} to={isAuth ? ROUTES.BROWSER : ROUTES.HOME}>
            {BRAND_NAME}
        </Heading>

        <HStack spacing={isAuth ? 6 : 4} display={{ base: 'none', md: 'flex' }}>
            <HStack spacing={2}>
                <IconButton color="gray" variant="unstyled" aria-label="faq" icon={<DangerIcon fontSize={28} />} />
                {isAuth && (
                    <>
                        <MessageMenuItem hasMessages={hasMessages} />
                        <ProfileMenuItem onLogout={onLogout} />
                    </>
                )}
            </HStack>
            <HStack spacing={4}>
                {isAuth ? (
                    <Button
                        backgroundColor="gray.800"
                        color="white"
                        variant="solid"
                        _active={{ backgroundColor: 'gray.900' }}
                        _hover={{ backgroundColor: 'gray.600' }}
                    >
                        Dodaj partnerstwo
                    </Button>
                ) : (
                    <>
                        <Button as={RouterLink} to={ROUTES.LOGIN}>
                            Zaloguj się
                        </Button>
                        <Button
                            as={RouterLink}
                            to={ROUTES.REGISTER}
                            backgroundColor="gray.800"
                            color="white"
                            variant="solid"
                            _active={{ backgroundColor: 'gray.900' }}
                            _hover={{ backgroundColor: 'gray.600' }}
                        >
                            Zarejestruj się
                        </Button>
                    </>
                )}
            </HStack>
        </HStack>

        <Box display={{ base: 'flex', md: 'none' }} alignItems="center">
            <MobileMenu isAuth={isAuth} onLogout={onLogout} />
        </Box>
    </Flex>
);
