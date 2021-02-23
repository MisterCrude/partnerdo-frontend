import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { UserBadge, IProps } from './UserBadge';

export default {
    title: 'Components/UserBadge',
    component: UserBadge,
} as Meta;

const Template: Story<IProps> = (args) => <UserBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
    avatarUrl: 'https://bit.ly/sage-adebayo',
    subtitle: 'Tennis lover',
    title: 'John Doe',
};

export const NotClicable = Template.bind({});
NotClicable.args = {
    ...Default.args,
    onClick: undefined,
};
