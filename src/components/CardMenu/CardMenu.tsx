import React from 'react';

import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { DotsMenuIcon } from '@theme/customIcons';

export const CardMenu: React.FC = ({ children }) => (
    <Menu>
        <MenuButton
            as={IconButton}
            aria-label="Menu"
            color="gray.800"
            d="flex"
            size="sm"
            fontSize={35}
            variant="unstyled"
            icon={<DotsMenuIcon />}
        />

        <MenuList>{children}</MenuList>
    </Menu>
);
