import React from 'react';

import {
    Box,
    Button,
    ButtonProps,
    Flex,
    ModalContent,
    ModalFooter,
    ModalBody,
    Modal,
    ModalOverlay,
    ModalHeader,
    IconButton,
    useDisclosure,
    UseDisclosureProps,
} from '@chakra-ui/react';

export interface IProps {
    modalTitle: string;
    onAction: any;
    actionTitle?: string;
    buttonProps?: ButtonProps;
    size?: string;
    triggerTitle?: string;
    triggerIcon?: React.ReactElement;
}

export const ModalFrame: React.FC<IProps> = ({
    children,
    modalTitle,
    onAction,
    actionTitle = 'Zapisz zmiany',
    buttonProps = {},
    triggerTitle = null,
    triggerIcon = null,
    size = 'md',
}) => {
    const { isOpen, onOpen, onClose }: UseDisclosureProps = useDisclosure();

    return (
        <>
            {triggerTitle && (
                <Button onClick={onOpen} {...buttonProps}>
                    {triggerTitle}
                </Button>
            )}

            {triggerIcon && <IconButton aria-label="button" onClick={onOpen} icon={triggerIcon} {...buttonProps} />}

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent
                    borderRadius={{ base: 0, md: 6 }}
                    maxW={{ md: '85vw' }}
                    minH={{ base: '100vh', md: 'auto' }}
                    minW={{ base: '100vw', md: 'auto' }}
                    my={{ base: 0, md: 16 }}
                    w={{ md: size }}
                >
                    <ModalHeader align="center" px={8} py={6} lineHeight={1.3}>
                        {modalTitle}
                    </ModalHeader>

                    <ModalBody px={8} py={0} flexGrow={0} overflow="unset">
                        <Box my={1}>{children}</Box>
                    </ModalBody>

                    <ModalFooter as={Flex} px={8} py={6} justifyContent={{ base: 'center', md: 'space-between' }}>
                        <Button onClick={onClose} flexGrow={{ base: 1, md: 0 }} mr={4}>
                            Zamknij
                        </Button>
                        <Button onClick={onAction} colorScheme="orange" flexGrow={{ base: 1, md: 0 }} ml={4}>
                            {actionTitle}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
