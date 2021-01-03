import React from 'react';

import {
    Box,
    Button,
    Circle,
    CloseButton,
    Divider,
    useDisclosure,
    UseDisclosureProps,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { FilterIcon } from '@theme/customIcons';

interface IProps {
    selectedFiltersAmount?: number;
}

export const FiltersMobile: React.FC<IProps> = ({ children, selectedFiltersAmount = 0 }) => {
    const { isOpen, onOpen, onClose }: UseDisclosureProps = useDisclosure();

    return (
        <>
            <Box d={{ base: 'block', md: 'none' }}>
                <Button d="flex" colorScheme="orange" onClick={onOpen} mb={8} w="100%">
                    Filtry <FilterIcon fontSize={20} ml={2} />
                </Button>
                {selectedFiltersAmount > 0 && (
                    <Circle
                        bgColor="orange.500"
                        color="white"
                        fontWeight="bold"
                        right={-2}
                        pos="absolute"
                        size={7}
                        top={-2}
                    >
                        {selectedFiltersAmount}
                    </Circle>
                )}
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
                <ModalOverlay />
                <Box as={ModalContent} borderRadius={0} minH="100vh" m={0}>
                    <ModalHeader align="center" display="flex" justifyContent="space-between" padding={8}>
                        Filtry <CloseButton onClick={onClose} fontSize={18} />
                    </ModalHeader>

                    <Divider />

                    <Box p={8}>
                        <Button colorScheme="gray" d={{ base: 'flex', md: 'none' }} disabled={false} mb={4} w="100%">
                            Wyczyść filtry <DeleteIcon fontSize="md" ml={2} />
                        </Button>
                        {children}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default FiltersMobile;
