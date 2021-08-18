import { Meta, Story } from '@storybook/react/types-6-0';

import { withRouterDecorator } from '@services/storybookDecorators';
import MessageBox, { IProps, Type } from './MessageBox';

export default {
    argType: {
        type: {
            control: {
                type: 'select',
                options: [Type.DEFAULT, Type.REJECTED, Type.APPROVED],
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
    type: Type.DEFAULT,
};

export const DefaultWithNewMessages = Template.bind({});
DefaultWithNewMessages.args = {
    type: Type.DEFAULT,
    unreadMessagesAmount: 10,
};

export const Rejected = Template.bind({});
Rejected.args = {
    type: Type.REJECTED,
};

export const Approved = Template.bind({});
Approved.args = {
    type: Type.APPROVED,
};

// export const SecondaryWithNewMessages = Template.bind({});
// SecondaryWithNewMessages.args = {
//     type: Type.SECONDARY,
//     unreadMessagesAmount: 2,
// };
