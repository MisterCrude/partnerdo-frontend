import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { withRouterDecorator, withChakraDecorator } from '@utils/storybookDecorators';
import { Card, IProps } from './Card';

export default {
    title: 'Components/Card',
    component: Card,
    decorators: [withRouterDecorator, withChakraDecorator],
} as Meta;

const Template: Story<IProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
// Default.args = {};
