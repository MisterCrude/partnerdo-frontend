import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { withRouterDecorator } from '@services/storybookDecorators';
import MessageBox, { IProps, Types } from './MessageBox';

export default {
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: [Types.DEFAULT, Types.SECONDARY, Types.REJECTED],
            },
        },
    },
    args: {
        title: 'Poszukuję partnera do glenistwałębokiego lenistwa',
        category: 'Sport',
        userName: 'Ged Breg',
        subtitle: 'wysłał Ci prpozycję na twoje partnerstwo',
        userAvatarUrl: 'https://i.pravatar.cc/300?u=3',
    },
    component: MessageBox,
    decorators: [withRouterDecorator],
    title: 'Screens/MessageBox',
} as Meta;

const Template: Story<IProps> = (args) => <MessageBox {...args} />;

export const Default = Template.bind({});
Default.args = {
    type: Types.DEFAULT,
};

export const DefaultWithNewMessages = Template.bind({});
DefaultWithNewMessages.args = {
    type: Types.DEFAULT,
    newMessagesAmount: 10,
};

export const Rejected = Template.bind({});
Rejected.args = {
    type: Types.REJECTED,
};

export const SecondaryWithNewMessages = Template.bind({});
SecondaryWithNewMessages.args = {
    type: Types.SECONDARY,
    newMessagesAmount: 2,
};
