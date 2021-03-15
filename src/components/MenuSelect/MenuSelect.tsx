import React, { useState } from 'react';
import { css } from '@emotion/react';

import { IOption } from '@models/app';

import { Button, Box, Checkbox, Menu, MenuButton, MenuItem, MenuList, theme } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface IProps {
    height?: string;
    options: IOption[];
    palceholder: string;
}

const MenuListStyles = css`
    width: 100%;
    & > div {
        width: 100%;
    }
`;

const CheckboxStyles = css`
    cursor: pointer;
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    padding: 0.5rem 1rem;
    width: 100%;

    .chakra-checkbox__control {
        align-self: center;
        border-radius: 100%;
        border: none;
        margin-left: 0.5rem;
    }
`;

export const MenuSelect: React.FC<IProps> = ({ options, palceholder, height = '48px' }) => {
    const [selectedOprion, setSelectedOprion] = useState<string>();

    const handleSelect = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const option = options.find(({ value }) => value === target.value) as IOption;
        setSelectedOprion(option.label);
    };

    return (
        <Box pos="relative">
            <Menu closeOnSelect>
                <MenuButton
                    as={Button}
                    bgColor="white"
                    h={height}
                    justifyContent="start"
                    pl={4}
                    pr={3}
                    rightIcon={<ChevronDownIcon />}
                    shadow="md"
                    size="lg"
                    textAlign="left"
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
                    <Box as="span" fontWeight={selectedOprion ? 'semibold' : 'normal'}>
                        {selectedOprion ? selectedOprion : palceholder}
                    </Box>
                </MenuButton>

                <Box css={MenuListStyles}>
                    <MenuList overflow="auto" maxH="300px">
                        {options.map(({ value, label }) => (
                            <MenuItem p={0} key={value}>
                                <Checkbox
                                    isChecked={selectedOprion === value}
                                    css={CheckboxStyles}
                                    value={value}
                                    w="100%"
                                    px={4}
                                    py={2}
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
