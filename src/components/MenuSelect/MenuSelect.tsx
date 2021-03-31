import React, { ChangeEvent } from 'react';
import { css } from '@emotion/react';

import { IOption } from '@models/app';

import { Button, Box, Checkbox, Menu, MenuButton, MenuItem, MenuList, IconButton, theme } from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';

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

interface IProps {
    height?: string;
    name: string;
    options: IOption[];
    palceholder: string;
    selected: string | number;
    onChange: (name: string, data: string | number) => void;
    onClear?: (name: string) => void;
}

export const MenuSelect: React.FC<IProps> = ({
    name,
    onChange,
    options,
    palceholder,
    selected,
    onClear,
    height = '48px',
}) => {
    const handleSelect = ({ target }: ChangeEvent<HTMLInputElement>) => {
        // const option = options.find(({ value }) => value === target.value) as IOption;
        onChange(name, target.value);
    };

    const handleClear = () => {
        if (onClear) {
            onClear(name);
        }
    };

    return (
        <Box pos="relative">
            <Menu closeOnSelect>
                {onClear && selected && (
                    <IconButton
                        aria-label="clear"
                        colorScheme="orange"
                        h={6}
                        isRound
                        minH={6}
                        minW={6}
                        onClick={handleClear}
                        pos="absolute"
                        right={-3}
                        top={-3}
                        w={6}
                        zIndex={1}
                    >
                        <CloseIcon fontSize={10} />
                    </IconButton>
                )}

                <MenuButton
                    as={Button}
                    bgColor="white"
                    borderWidth={1}
                    disabled={!options.length}
                    h={height}
                    justifyContent="start"
                    name={name}
                    pl={4}
                    pr={3}
                    rightIcon={<ChevronDownIcon />}
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
                    <Box as="span" fontWeight={selected ? 'semibold' : 'normal'}>
                        {selected ? selected : palceholder}
                    </Box>
                </MenuButton>

                <Box css={MenuListStyles}>
                    <MenuList overflow="auto" maxH="300px">
                        {options.map(({ value, label }) => (
                            <MenuItem p={0} key={value}>
                                <Checkbox
                                    isChecked={selected === value}
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
