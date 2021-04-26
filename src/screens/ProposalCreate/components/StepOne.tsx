import React, { useState } from 'react';
import { IOption } from '@models/app';
import { useMount } from 'react-use';

import { Box, Flex, SimpleGrid, Text, Button, HStack } from '@chakra-ui/react';
import { CheckCircleIcon, ChevronRightIcon } from '@chakra-ui/icons';

export interface IFields {
    category: '';
}

interface IProps {
    categories: IOption[];
    defaultData: Record<string, string>;
    onCancel: () => void;
    onChangeStep: (nextStep: number) => void;
    onSave: (fieldsData: Record<string, string>) => void;
}

export const StepOne: React.FC<IProps> = ({ categories, defaultData, onChangeStep, onCancel, onSave }) => {
    const [category, setCategory] = useState<string>('');

    const disableNextButton = !category;

    const handleChoose = (categoryName: string) => setCategory(categoryName);
    const handleForward = () => {
        onSave({ category: category });
        onChangeStep(1);
    };
    const handleCancel = () => onCancel();

    useMount(() => defaultData.category && setCategory(defaultData.category));

    return (
        <>
            <Box alignItems="center" d="flex" my={{ base: 16 }} minH={{ base: 0, md: 260 }}>
                <SimpleGrid
                    as="nav"
                    gap={8}
                    templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }}
                    w="100%"
                    justifyItems="center"
                >
                    {categories.map(({ value, label }) => (
                        <Flex
                            borderRadius="md"
                            cursor="pointer"
                            direction="column"
                            justify="center"
                            key={value}
                            minW={20}
                            maxW={30}
                            onClick={() => handleChoose(value)}
                            pos="relative"
                        >
                            {category === value && (
                                <CheckCircleIcon color="green.500" fontSize={20} pos="absolute" top={0} right={0} />
                            )}
                            {/* <Box w="100%" borderRadius="300px" background="gray.100" mb={3}>
                                <Icon w="100%" h="auto" color={category === name ? 'orange.500' : 'gray.800'} />
                            </Box> */}
                            <Text align="center" textTransform="uppercase" lineHeight={1.2}>
                                {label}
                            </Text>
                        </Flex>
                    ))}
                </SimpleGrid>
            </Box>

            <HStack spacing={8} justify="space-between">
                <Button flexGrow={{ base: 1, md: 0 }} variant="ghost" onClick={handleCancel}>
                    Anuluj
                </Button>

                <Button
                    disabled={disableNextButton}
                    bgColor="gray.800"
                    color="white"
                    flexGrow={{ base: 1, md: 0 }}
                    rightIcon={<ChevronRightIcon />}
                    variant="outline"
                    onClick={disableNextButton ? undefined : handleForward}
                    _active={{ bgColor: 'gray.800' }}
                    _hover={{ bgColor: 'gray.600' }}
                >
                    Dalej
                </Button>
            </HStack>
        </>
    );
};

export default StepOne;
