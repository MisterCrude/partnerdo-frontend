import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { DeleteIcon, UnpublishIcon, EditIcon } from '@theme/customIcons';
import { Container, MenuItem } from '@chakra-ui/react';
import { CardMenu } from './CardMenu';

export default {
    component: CardMenu,
    title: 'Components/CardMenu',
} as Meta;

export const Default: React.FC = () => (
    <Container maxW="4xl">
        <CardMenu>
            <MenuItem>
                <EditIcon mr={2} /> Edytuj
            </MenuItem>
            <MenuItem>
                <UnpublishIcon mr={2} /> Cofnij publikację
            </MenuItem>
            <MenuItem color="red.500">
                <DeleteIcon mr={2} /> Usuń
            </MenuItem>
        </CardMenu>
    </Container>
);
