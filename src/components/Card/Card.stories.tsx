import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Container } from '@chakra-ui/react';
import { withRouterDecorator } from '@services/storybookDecorators';
import { Card, IProps, Types } from './Card';

export default {
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: [Types.DEFAULT, Types.EDITABLE, Types.DONE, Types.UNPUBLISH],
            },
        },
    },
    args: {
        address: 'Warszawa, Bemowo',
        content:
            'Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ...',
        category: 'Sport',
        publishDate: '01.10.2020',
        title: 'Poszukuję partnera do głębokiego lenistwa',
        userAvatarUrl: 'https://bit.ly/sage-adebayo',
        userName: 'Jan Baraban',
        shortUserDesc: 'Jak w tytule, szukam partnera do głęboki...',
    },
    component: Card,
    decorators: [withRouterDecorator],
    title: 'Components/Card',
} as Meta;

const Template: Story<IProps> = (args) => (
    <Container maxW="4xl">
        <Card {...args} />
    </Container>
);

export const Default = Template.bind({});
Default.args = {
    type: Types.DEFAULT,
};

export const Editable = Template.bind({});
Editable.args = {
    type: Types.EDITABLE,
};

export const Done = Template.bind({});
Done.args = {
    type: Types.DONE,
};

export const Unpublish = Template.bind({});
Unpublish.args = {
    type: Types.UNPUBLISH,
};
