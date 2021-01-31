import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import customTheme from '@theme/customTheme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story) => (
        <ChakraProvider theme={customTheme}>
            <Story />
        </ChakraProvider>
    ),
];
