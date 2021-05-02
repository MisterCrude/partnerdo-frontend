import React, { PropsWithChildren } from 'react';

import {
    Button,
    CloseButton,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    UseDisclosureProps,
} from '@chakra-ui/react';

export type IProps = PropsWithChildren<{
    actionTitle: string;
    modalTitle: string;
    modalSize?: string;
    modalTriggerButton?: React.ReactElement;
    onAction: any;
}>;

export const ModalFrame: React.FC<IProps> = ({
    actionTitle,
    children,
    modalSize = 'md',
    modalTitle,
    modalTriggerButton = null,
    onAction,
}) => {
    const { isOpen, onOpen, onClose }: UseDisclosureProps = useDisclosure();

    const renderTriggerButton = React.cloneElement(modalTriggerButton as React.ReactElement, { onClick: onOpen });

    return (
        <>
            {modalTriggerButton && renderTriggerButton}

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent
                    borderRadius={{ base: 0, md: 6 }}
                    maxW={{ md: '85vw' }}
                    minH={{ base: '100vh', md: 'auto' }}
                    minW={{ base: '100vw', md: 'auto' }}
                    my={{ base: 0, md: 16 }}
                    w={{ md: modalSize }}
                >
                    <ModalHeader align="center" display="flex" justifyContent="space-between" py={4}>
                        <Text align="left">{modalTitle}</Text> <CloseButton onClick={onClose} />
                    </ModalHeader>

                    <Divider />

                    <ModalBody p={4}>
                        {children}

                        <Flex justifyContent={{ base: 'center', md: 'space-between' }} pt={3}>
                            <Button onClick={onClose} flexGrow={{ base: 1, md: 0 }} mr={4}>
                                Zamknij
                            </Button>
                            <Button onClick={onAction} colorScheme="orange" flexGrow={{ base: 1, md: 0 }} ml={4}>
                                {actionTitle}
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
