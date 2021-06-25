import { ChakraProvider } from '@chakra-ui/react';

import customTheme from '@theme/customTheme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
};

export const decorators = [
    (Story) => (
        <ChakraProvider theme={customTheme}>
            <Story />
        </ChakraProvider>
    ),
];
