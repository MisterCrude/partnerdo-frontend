import React from 'react';
import { css } from '@emotion/react';

import { IOption } from '@models/app';

import { Button, Box, Checkbox, Menu, MenuButton, MenuDivider, MenuItem, MenuList, theme } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface IProps {
    isRadio?: boolean;
    palceholder: string;
    options: IOption[];
    selected?: string[];
    height?: string;
}

const MenuListStyles = css`
    width: 100%;
    & > div {
        width: 100%;
    }
`;

const CheckboxStyles = css`
    display: inline-flex;
    padding: 0.5rem 1rem;
    width: 100%;
    cursor: pointer;

    .chakra-checkbox__control {
        align-self: center;
    }
`;

export const MenuSelect: React.FC<IProps> = ({ isRadio, options, palceholder, height = '48px', selected = [] }) => {
    return (
        <Box pos="relative">
            <Menu closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    bgColor="white"
                    textAlign="left"
                    fontWeight={selected.length ? 'bold' : 'normal'}
                    size="lg"
                    shadow="base"
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
                    {palceholder} {selected.length > 0 && `(${selected.length})`}
                </MenuButton>

                <Box css={MenuListStyles}>
                    <MenuList overflow="auto" maxH={isRadio ? '300px' : '315px'}>
                        {!isRadio && (
                            <>
                                <MenuItem p={0}>
                                    <Checkbox value="all" w="100%" px={4} py={2}>
                                        Wszystkie
                                    </Checkbox>
                                </MenuItem>

                                <MenuDivider />
                            </>
                        )}
                        {options.map(({ value, label }) => (
                            <MenuItem p={0} key={value}>
                                <Checkbox value={value} w="100%" px={4} py={2} css={isRadio ? CheckboxStyles : null}>
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
