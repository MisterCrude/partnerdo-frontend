import { Meta, Story } from '@storybook/react/types-6-0';

import { Container } from '@chakra-ui/react';
import { withRouterDecorator } from '@services/storybookDecorators';
import { Card, IProps, Type } from './Card';

export default {
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: [Type.DEFAULT, Type.EDITABLE, Type.DONE, Type.UNPUBLISH],
            },
        },
    },
    args: {
        address: 'Warszawa, Bemowo',
        content:
            'Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ...',
        categoryName: 'Sport',
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
    type: Type.DEFAULT,
};

export const Editable = Template.bind({});
Editable.args = {
    type: Type.EDITABLE,
};

export const Done = Template.bind({});
Done.args = {
    type: Type.DONE,
};

export const Unpublish = Template.bind({});
Unpublish.args = {
    type: Type.UNPUBLISH,
};
