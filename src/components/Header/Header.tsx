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
import { CheckIcon, SmallAddIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import { ChatIcon, DangerIcon, MenuIcon, ProfileIcon, SearchIcon } from '@theme/customIcons';
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
    <Box as="span">
        <Menu>
            <MenuButton
                as={IconButton}
                color="gray"
                variant="unstyled"
                aria-label="User profile"
                icon={<ProfileIcon fontSize={28} />}
            />
            <MenuList>
                <MenuItem as={RouterLink} to={ROUTES.PROFILE}>
                    <SettingsIcon mr={2} />
                    Profil
                </MenuItem>
                <MenuItem as={RouterLink} to={ROUTES.PROFILE_MY_PROPOSALS}>
                    <HamburgerIcon mr={2} />
                    Moje partnerstwa
                </MenuItem>
                <MenuItem as={RouterLink} to={ROUTES.PROFILE_DONE_PROPOSALS}>
                    <CheckIcon mr={2} />
                    Zrealizowane partnerstwa
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={onLogout}>Wyloguj się</MenuItem>
            </MenuList>
        </Menu>
    </Box>
);

export const MessageMenuItem: React.FC<IPropsMessageMenuItem> = ({ hasMessages }) => (
    <Box as="span" pos="relative">
        <IconButton
            as={RouterLink}
            aria-label="Messages"
            color="gray"
            d="flex"
            icon={<ChatIcon fontSize={28} />}
            to={ROUTES.CONVERSATIONS}
            variant="unstyled"
        />
        {hasMessages && <Circle pos="absolute" size={3} bgColor="tomato" color="white" top={2} right={1} />}
    </Box>
);

export const MobileMenu: React.FC<IPropsMobileMenu> = ({ isAuth, onLogout }) => {
    const { isOpen, onOpen, onClose }: UseDisclosureProps = useDisclosure();

    return (
        <>
            <MenuIcon fontSize={36} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
                <ModalOverlay />
                <Box as={ModalContent} borderRadius={0} minHeight="100vh" m={0}>
                    <ModalHeader alignItems="center" display="flex" justifyContent="space-between" padding={4}>
                        {BRAND_NAME} <CloseButton onClick={onClose} fontSize={18} />
                    </ModalHeader>

                    <Divider />

                    <VStack as="nav" align="stretch" spacing={0}>
                        {isAuth ? (
                            <>
                                <Link
                                    as={RouterLink}
                                    href="#"
                                    p={4}
                                    to={ROUTES.FAQ}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Jak działa {BRAND_NAME}?
                                </Link>
                                <Link href="#" p={4} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                                    Polityka prywatności
                                </Link>
                                <Link href="#" p={4} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                                    Regulamin
                                </Link>
                                <Divider />
                                <Link p={4} onClick={onLogout} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                                    Wyloguj się
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    as={RouterLink}
                                    p={4}
                                    to={ROUTES.PROPOSALS}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    <SearchIcon fontSize={20} mt={-1} mr={1} /> Lista partnerstw
                                </Link>
                                <Link
                                    as={RouterLink}
                                    p={4}
                                    to={ROUTES.FAQ}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    <DangerIcon fontSize={20} mt={-1} mr={1} /> FAQ
                                </Link>
                                <Divider />
                                <Link
                                    as={RouterLink}
                                    href="#"
                                    p={4}
                                    to={ROUTES.FAQ}
                                    _hover={{ bgColor: 'gray', textDecoration: 'none' }}
                                >
                                    Jak działa {BRAND_NAME}?
                                </Link>
                                <Link href="#" p={4} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                                    Polityka prywatności
                                </Link>
                                <Link href="#" p={4} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
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
    <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        py={{ base: 6, sm: 8 }}
        px={{ base: 4, sm: 8 }}
    >
        <Heading as={RouterLink} to={isAuth ? ROUTES.PROPOSALS : ROUTES.ROOT}>
            {/* {BRAND_NAME} */}
            Partner<span style={{ color: '#DD6B20' }}>Do</span>.pl
        </Heading>

        <HStack d={{ base: 'none', md: 'flex' }} spacing={isAuth ? 6 : 4}>
            <HStack spacing={2}>
                <IconButton
                    as={RouterLink}
                    aria-label="faq"
                    color="gray"
                    d="flex"
                    variant="unstyled"
                    to={ROUTES.FAQ}
                    icon={<DangerIcon fontSize={28} />}
                />
                <IconButton
                    as={RouterLink}
                    aria-label="Wyszukiwarka partnerstw"
                    color="gray"
                    d="flex"
                    icon={<SearchIcon fontSize={28} />}
                    to={ROUTES.PROPOSALS}
                    variant="unstyled"
                />
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
                        as={RouterLink}
                        to={ROUTES.PROPOSALS_CREATE}
                        bgColor="gray.800"
                        color="white"
                        variant="solid"
                        rightIcon={<SmallAddIcon />}
                        _active={{ bgColor: 'gray.800' }}
                        _hover={{ bgColor: 'gray.600' }}
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
                            bgColor="gray.800"
                            color="white"
                            variant="solid"
                            _active={{ bgColor: 'gray.800' }}
                            _hover={{ bgColor: 'gray.600' }}
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
