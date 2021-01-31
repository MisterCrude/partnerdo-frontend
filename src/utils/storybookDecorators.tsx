import { MemoryRouter } from 'react-router-dom';
import { Story } from '@storybook/react/types-6-0';

export const withRouterDecorator = (Story: Story) => (
    <MemoryRouter initialEntries={['/']}>
        <Story />
    </MemoryRouter>
);
