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
    size = 'md',
    triggerTitle,
    triggerIcon,
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

            <Modal isOpen={isOpen} onClose={onClose} size={size}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader align="center" px={8} py={6} lineHeight={1.3}>
                        {modalTitle}
                    </ModalHeader>

                    <ModalBody px={8} py={0}>
                        {children}
                    </ModalBody>

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
