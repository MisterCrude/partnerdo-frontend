import React from 'react';

import {
    Button,
    ButtonProps,
    ModalContent,
    ModalFooter,
    ModalBody,
    Modal,
    ModalOverlay,
    ModalHeader,
    useDisclosure,
    UseDisclosureProps,
} from '@chakra-ui/react';

export interface IProps {
    triggerTitle: string;
    modalTitle: string;
    onAction: any;
    actionTitle?: string;
    buttonProps?: ButtonProps;
}

export const ModalFrame: React.FC<IProps> = ({
    triggerTitle,
    children,
    modalTitle,
    onAction,
    actionTitle = 'Zapisz zmiany',
    buttonProps = {},
}) => {
    const { isOpen, onOpen, onClose }: UseDisclosureProps = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} {...buttonProps}>
                {triggerTitle}
            </Button>

            <Modal isOpen={isOpen} isCentered onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader px={8} align="center">
                        {modalTitle}
                    </ModalHeader>

                    <ModalBody px={8}>{children}</ModalBody>

                    <ModalFooter px={8} py={6} justifyContent="space-between">
                        <Button onClick={onClose}>Zamknij</Button>
                        <Button onClick={onAction} colorScheme="orange">
                            {actionTitle}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
