import React from 'react';

import { IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, DotsMenuIcon, UnpublishIcon, PublishIcon } from '@theme/customIcons';
import { Types } from './types';

interface IProps {
    typeOfSet: Types;
}

const CardMenu: React.FC<IProps> = ({ typeOfSet }) => (
    <Menu>
        <MenuButton
            as={IconButton}
            aria-label="Menu"
            color="gray.800"
            d="flex"
            size="sm"
            fontSize={25}
            icon={<DotsMenuIcon />}
        />

        <MenuList>
            {typeOfSet !== Types.DONE && (
                <>
                    <MenuItem>
                        <EditIcon mr={2} /> Edytuj
                    </MenuItem>
                    {typeOfSet === Types.UNPUBLISH ? (
                        <MenuItem>
                            <PublishIcon mr={2} /> Publikuj
                        </MenuItem>
                    ) : (
                        <MenuItem>
                            <UnpublishIcon mr={2} /> Cofnij publikację
                        </MenuItem>
                    )}
                </>
            )}
            <MenuItem color="red.500">
                <DeleteIcon mr={2} /> Usuń
            </MenuItem>
        </MenuList>
    </Menu>
);

export default CardMenu;
