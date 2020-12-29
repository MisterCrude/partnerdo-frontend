import React from 'react';

import {
    Box,
    Button,
    Circle,
    CloseButton,
    Divider,
    IconButton,
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
            <Box d={{ base: 'block', md: 'none' }} bottom="12vh" pos="fixed" right="6vw">
                <IconButton
                    aria-label="Filters"
                    colorScheme="teal"
                    backgroundColor="gray.900"
                    borderRadius={40}
                    boxShadow="xl"
                    w={16}
                    h={16}
                    variant="none"
                    onClick={onOpen}
                    icon={<FilterIcon fontSize={30} color="white" />}
                    _focus={{ boxShadow: 'none' }}
                />
                {selectedFiltersAmount > 0 && (
                    <Circle
                        backgroundColor="orange.500"
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

                    <Box p={8} overflowX="auto">
                        <Button
                            borderWidth={1}
                            colorScheme="orange"
                            d={{ base: 'flex', md: 'none' }}
                            disabled={false}
                            mb={4}
                            w="100%"
                            size="lg"
                        >
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
