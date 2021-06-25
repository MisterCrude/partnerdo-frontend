import { PropsWithChildren } from 'react';

import {
    CloseButton,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

export type IProps = PropsWithChildren<{
    isOpen: boolean;
    modalTitle: string;
    size?: string;
    onClose: () => void;
}>;

export const ModalFrame: React.FC<IProps> = ({ isOpen, onClose, children, size = 'md', modalTitle }: IProps) => {
    return (
        <>
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
                    <ModalHeader align="center" display="flex" justifyContent="space-between" py={4}>
                        <Text align="left">{modalTitle}</Text> <CloseButton onClick={onClose} />
                    </ModalHeader>

                    <Divider />

                    <ModalBody p={4}>{children}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
