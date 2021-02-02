import React, { useState } from 'react';
import { css } from '@emotion/react';

import { IOption } from '@models/app';

import { Button, Box, Checkbox, Menu, MenuButton, MenuItem, MenuList, theme } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface IProps {
    palceholder: string;
    options: IOption[];
    height?: string;
}

const MenuListStyles = css`
    width: 100%;
    & > div {
        width: 100%;
    }
`;

export const MenuMultiSelect: React.FC<IProps> = ({ options, palceholder, height = '48px' }) => {
    const [selectedOprions, setSelectedOprions] = useState<string[]>([]);

    const handleSelect = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOprions((prevState) =>
            target.checked ? [...prevState, target.value] : prevState.filter((item) => item !== target.value)
        );
    };

    return (
        <Box pos="relative">
            <Menu closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    bgColor="white"
                    textAlign="left"
                    size="lg"
                    shadow="md"
                    pl={4}
                    pr={3}
                    rightIcon={<ChevronDownIcon />}
                    h={height}
                    w="100%"
                    _active={{
                        bgColor: 'white',
                    }}
                    _focus={{
                        boxShadow: `0 0 0 1px ${theme.colors.blue[500]}`,
                    }}
                    _hover={{
                        bgColor: 'white',
                    }}
                >
                    <Box as="span" fontWeight={selectedOprions.length ? 'semibold' : 'normal'}>
                        {palceholder} {selectedOprions.length > 0 && `(${selectedOprions.length})`}
                    </Box>
                </MenuButton>

                <Box css={MenuListStyles}>
                    <MenuList overflow="auto" maxH="295px">
                        {options.map(({ value, label }) => (
                            <MenuItem p={0} key={value}>
                                <Checkbox
                                    value={value}
                                    w="100%"
                                    px={4}
                                    py={2}
                                    isChecked={selectedOprions.includes(value)}
                                    onChange={handleSelect}
                                >
                                    {label}
                                </Checkbox>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Box>
            </Menu>
        </Box>
    );
};
