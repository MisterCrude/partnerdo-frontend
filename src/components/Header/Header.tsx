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
} from '@chakra-ui/core';
import { ChatIcon, DangerIcon, MenuIcon, ProfileIcon } from '@theme/customIcons';
import { BRAND_NAME, ROUTES } from '@config/app';

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
                        {BRAND_NAME} <CloseButton onClick={onClose} fontSize={18} />
                    </ModalHeader>
                    <Divider />
                    <VStack as="nav" align="stretch" spacing={0}>
                        {isLoggedin ? (
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
                                    href="#"
                                    paddingY={4}
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

export const Header: React.FC<IProps> = ({ hasMessages, isLoggedin }) => (
    <Flex as="header" alignItems="center" justifyContent="space-between" padding={8}>
        <Heading as={RouterLink} to={ROUTES.HOME}>
            {BRAND_NAME}
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
            <MobileMenu isLoggedin={isLoggedin} />
        </Box>
    </Flex>
);
