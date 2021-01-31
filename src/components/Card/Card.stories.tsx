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
        address: 'Warszawa, Bemowo',
        content:
            'Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ...',
        category: 'Sport',
        publishDate: '01.10.2020',
        title: 'Poszukuję partnera do głębokiego lenistwa',
        type: Types.DEFAULT,
        userAvatarUrl: 'https://bit.ly/sage-adebayo',
        userName: 'Jan Baraban',
        userSlogan: 'Kanapowy sportowiec i mamusin przystojniak',
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
// Default.args = {};
