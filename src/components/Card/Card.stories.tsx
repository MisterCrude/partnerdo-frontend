import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Container } from '@chakra-ui/react';
import { withRouterDecorator } from '@utils/storybookDecorators';
import { Card, IProps, Types } from './Card';

export default {
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: [Types.DEFAULT, Types.EDITABLE, Types.UNPUBLISH, Types.HEADLESS],
            },
        },
    },
    args: {
        type: Types.DEFAULT,
    },
    component: Card,
    decorators: [withRouterDecorator],
    title: 'Components/Card',
} as Meta;

const Template: Story<IProps> = (args) => (
    <Container maxW="3xl">
        <Card {...args} />
    </Container>
);

export const Default = Template.bind({});
// Default.args = {};
