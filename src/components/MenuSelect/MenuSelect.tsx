import React from 'react';

import { IOption } from '@models/app';

import { Button, Checkbox, Menu, MenuButton, MenuDivider, MenuItem, MenuList, theme } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface IProps {
    isRadio?: boolean;
    palceholder: string;
    options: IOption[];
}

export const MenuSelect: React.FC<IProps> = ({ isRadio, options, palceholder }) => {
    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                backgroundColor="white"
                textAlign="left"
                fontWeight="md"
                size="lg"
                shadow="base"
                pl={4}
                pr={3}
                rightIcon={<ChevronDownIcon />}
                _active={{
                    backgroundColor: 'white',
                }}
                _focus={{
                    boxShadow: `0 0 0 1px ${theme.colors.blue[500]}`,
                }}
                _hover={{
                    backgroundColor: 'white',
                }}
            >
                {palceholder}
            </MenuButton>
            <MenuList overflow="auto" maxH={isRadio ? '32vh' : 'auto'} w="100%">
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
                        <Checkbox value={value} w="100%" px={4} py={2}>
                            {label}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
