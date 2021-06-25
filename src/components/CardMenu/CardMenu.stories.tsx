import { Meta } from '@storybook/react/types-6-0';

import { EditIcon, UnpublishIcon, PublishIcon } from '@theme/customIcons';
import { Container, MenuItem } from '@chakra-ui/react';
import { CardMenu } from './CardMenu';

export default {
    component: CardMenu,
    title: 'Components/CardMenu',
} as Meta;

export const Default = () => (
    <Container maxW="4xl">
        <CardMenu>
            <MenuItem>
                <EditIcon mr={2} fontSize="lg" /> Edytuj
            </MenuItem>
            <MenuItem>
                <PublishIcon mr={2} fontSize="lg" /> Publikuj
            </MenuItem>
            <MenuItem>
                <UnpublishIcon mr={2} fontSize="lg" /> Cofnij publikację
            </MenuItem>
        </CardMenu>
    </Container>
);
