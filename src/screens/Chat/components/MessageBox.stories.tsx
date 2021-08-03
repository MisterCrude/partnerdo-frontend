import { Meta, Story } from '@storybook/react/types-6-0';

import { withRouterDecorator } from '@services/storybookDecorators';
import MessageBox, { IProps, Types } from './MessageBox';

export default {
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: [Types.DEFAULT, Types.SECONDARY, Types.REJECTED, Types.APPROVED],
            },
        },
    },
    args: {
        address: 'Warszawa, Bemowo',
        categoryName: 'Sport',
        subtitle: 'Masz propozycje od',
        title: 'Poszukuję partnera do glenistwałębokiego lenistwa',
        userAvatarUrl: 'https://i.pravatar.cc/300?u=3',
        userName: 'Ged Breg',
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

export const Approved = Template.bind({});
Approved.args = {
    type: Types.APPROVED,
};

export const SecondaryWithNewMessages = Template.bind({});
SecondaryWithNewMessages.args = {
    type: Types.SECONDARY,
    newMessagesAmount: 2,
};
