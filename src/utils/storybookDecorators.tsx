import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import { Story } from '@storybook/react/types-6-0';

import customTheme from '@theme/customTheme';

export const withRouterDecorator = (Story: Story) => (
    <MemoryRouter initialEntries={['/']}>
        <Story />
    </MemoryRouter>
);

export const withChakraDecorator = (Story: Story) => (
    <ChakraProvider theme={customTheme}>
        <Story />
    </ChakraProvider>
);
