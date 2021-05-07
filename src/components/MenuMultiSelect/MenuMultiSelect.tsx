import React, { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { IOption } from '@models/app';

import { Button, Box, Checkbox, Menu, MenuButton, MenuItem, MenuList, theme, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';

const MenuListStyles = css`
    width: 100%;
    & > div {
        width: 100%;
    }
`;

interface IProps {
    palceholder: string;
    name: string;
    selected: Array<string>;
    options: IOption[];
    height?: string;
    onChange: (name: string, data: string | Array<string>) => void;
    onClear?: (name: string) => void;
}

export const MenuMultiSelect: React.FC<IProps> = ({
    options,
    palceholder,
    name,
    selected,
    onChange,
    onClear,
    height = '48px',
}) => {
    const handleSelect = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const newData = target.checked ? [...selected, target.value] : selected.filter((item) => item !== target.value);
        onChange(name, newData);
    };

    const handleClear = () => {
        onClear && onClear(name);
    };

    return (
        <Box pos="relative">
            <Menu closeOnSelect={false}>
                {onClear && !!selected.length && (
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
                    <Box as="span" fontWeight={selected.length ? 'semibold' : 'normal'}>
                        {palceholder} {selected.length > 0 && `(${selected.length})`}
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
                                    isChecked={selected.includes(value)}
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
