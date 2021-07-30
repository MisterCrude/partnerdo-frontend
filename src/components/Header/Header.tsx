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
import { SmallAddIcon } from '@chakra-ui/icons';
import {
    ChatIcon,
    DangerIcon,
    LogoutIcon,
    MenuIcon,
    ProfileIcon,
    ProposalsIcon,
    SearchIcon,
    SettingsIcon,
    TickSquareIcon,
} from '@theme/customIcons';
import { BRAND_NAME } from '@consts/app';
import { ROUTES } from '@consts/routes';

interface ProfileMenuItemProps {
    onLogout: () => void;
}

export const ProfileMenuItem = ({ onLogout }: ProfileMenuItemProps) => (
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
                    <SettingsIcon mr={2} fontSize="lg" />
                    Edycja profilu
                </MenuItem>
                <MenuItem as={RouterLink} to={ROUTES.PROFILE_MY_PROPOSALS}>
                    <ProposalsIcon mr={2} fontSize="lg" />
                    Moje partnerstwa
                </MenuItem>
                <MenuItem as={RouterLink} to={ROUTES.PROFILE_DONE_PROPOSALS}>
                    <TickSquareIcon mr={2} fontSize="lg" />
                    Zrealizowane partnerstwa
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={onLogout}>
                    <LogoutIcon mr={2} fontSize="lg" />
                    Wyloguj się
                </MenuItem>
            </MenuList>
        </Menu>
    </Box>
);

interface IPropsMessageMenuItem {
    hasNotification: boolean;
}

export const MessageMenuItem = ({ hasNotification }: IPropsMessageMenuItem) => (
    <Box as="span" pos="relative">
        <IconButton
            as={RouterLink}
            aria-label="Messages"
            color="gray"
            d="flex"
            icon={<ChatIcon fontSize={28} />}
            to={ROUTES.CHAT}
            variant="unstyled"
        />
        {hasNotification && <Circle pos="absolute" size={3} bgColor="tomato" color="white" top={2} right={1} />}
    </Box>
);

interface IPropsMobileMenu {
    isAuth: boolean;
    onLogout: () => void;
}

export const MobileMenu = ({ isAuth, onLogout }: IPropsMobileMenu) => {
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

interface IHeaderProps {
    hasNotification: boolean;
    isAuth: boolean;
    onLogout: () => void;
}

export const Header = ({ hasNotification, isAuth, onLogout }: IHeaderProps) => {
    return (
        <Flex
            as="header"
            alignItems="center"
            justifyContent="space-between"
            py={{ base: 6, sm: 8 }}
            px={{ base: 4, sm: 8 }}
        >
            <Heading as={RouterLink} to={isAuth ? ROUTES.PROPOSALS : ROUTES.ROOT}>
                {BRAND_NAME}
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
                            <MessageMenuItem hasNotification={hasNotification} />
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
};
