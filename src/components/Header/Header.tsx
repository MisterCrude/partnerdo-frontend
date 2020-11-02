import React from 'react';

import {
    Box,
    Button,
    Container,
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

interface IPropsHeader {
    isLoggedin?: number;
}

interface IPropsMessageMenuItem {
    hasMessages: boolean;
}

export const ProfileMenuItem: React.FC = () => (
    <Menu>
        <MenuButton
            as={IconButton}
            color="gray"
            variant="unstyled"
            aria-label="User profile"
            icon={<ProfileIcon fontSize={24} />}
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
        <IconButton color="gray" variant="unstyled" aria-label="Messages" icon={<ChatIcon fontSize={24} />} />
        {hasMessages && <Circle position="absolute" size={3} bg="tomato" color="white" top={2} right={1} />}
    </Box>
);

export const MobileMenu: React.FC = () => {
    const { isOpen, onOpen, onClose }: UseDisclosureProps = useDisclosure();

    return (
        <>
            <MenuIcon fontSize={36} onClick={() => onOpen()} />

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
                <ModalOverlay />
                <Box as={ModalContent} borderRadius={0} minHeight="100vh" margin={0}>
                    <ModalHeader alignItems="center" display="flex" justifyContent="space-between">
                        Modal Title <CloseButton onClick={onClose} fontSize={18} />
                    </ModalHeader>
                    <Divider />
                    <VStack as="nav" align="stretch" spacing={0}>
                        <Link href="#" py={4} px={6} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                            Profil
                        </Link>
                        <Link href="#" py={4} px={6} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                            Moje partnerstwa
                        </Link>
                        <Link href="#" py={4} px={6} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                            Zrealizowane partnerstwa
                        </Link>
                        <Divider />
                        <Link href="#" py={4} px={6} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                            FAQ
                        </Link>
                        <Divider />
                        <Link href="#" py={4} px={6} _hover={{ bgColor: 'gray', textDecoration: 'none' }}>
                            Wyloguj się
                        </Link>
                    </VStack>
                </Box>
            </Modal>
        </>
    );
};

export const Header: React.FC<IPropsHeader> = ({ isLoggedin = true }) => (
    <header>
        <Flex as={Container} maxWidth="100vw" alignItems="center" justifyContent="space-between" py={4}>
            <Heading as="h2" size="lg">
                PartnerDo
            </Heading>

            <HStack spacing={isLoggedin ? 6 : 4} display={{ base: 'none', md: 'flex' }}>
                <HStack spacing={2}>
                    <IconButton color="gray" variant="unstyled" aria-label="faq" icon={<DangerIcon fontSize={24} />} />
                    {isLoggedin && (
                        <>
                            <MessageMenuItem hasMessages={true} />
                            <ProfileMenuItem />
                        </>
                    )}
                </HStack>
                <HStack spacing={4}>
                    {isLoggedin ? (
                        <Button colorScheme="orange">Dadaj partnerstwo</Button>
                    ) : (
                        <>
                            <Button variant="outline">Zaloguj się</Button>
                            <Button colorScheme="orange">Zarejestruj się</Button>
                        </>
                    )}
                </HStack>
            </HStack>

            <Box display={{ base: 'flex', md: 'none' }} alignItems="center">
                <MobileMenu />
            </Box>
        </Flex>
    </header>
);
