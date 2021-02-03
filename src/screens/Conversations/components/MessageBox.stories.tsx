import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { withRouterDecorator } from '@utils/storybookDecorators';
import { MessageBox, IProps } from './MessageBox';

export default {
    component: MessageBox,
    decorators: [withRouterDecorator],
    title: 'Screens/MessageBox',
} as Meta;

const Template: Story<IProps> = (args) => <MessageBox {...args} />;

export const Default = Template.bind({});

export const WithNewMessages = Template.bind({});
WithNewMessages.args = {
    newMessagesAmount: 10,
};
