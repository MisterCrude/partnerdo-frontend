import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { Text, Heading as HeadingComponent, Box, Stack } from '@chakra-ui/react';

export default {
    component: Box,
    title: 'Misc/Typography',
    parameters: {
        controls: {
            disabled: true,
        },
        layout: 'padded',
    },
} as Meta;

export const TextSize: React.FC = () => (
    <Stack spacing={3}>
        <Text fontSize="6xl">(6xl) In love with React & Next</Text>
        <Text fontSize="5xl">(5xl) In love with React & Next</Text>
        <Text fontSize="4xl">(4xl) In love with React & Next</Text>
        <Text fontSize="3xl">(3xl) In love with React & Next</Text>
        <Text fontSize="2xl">(2xl) In love with React & Next</Text>
        <Text fontSize="xl">(xl) In love with React & Next</Text>
        <Text fontSize="lg">(lg) In love with React & Next</Text>
        <Text>(md / default) In love with React & Next</Text>
        <Text fontSize="sm">(sm) In love with React & Next</Text>
        <Text fontSize="xs">(xs) In love with React & Next</Text>
    </Stack>
);

export const TextWeight: React.FC = () => (
    <Stack spacing={3}>
        <Text fontWeight="light">(light) In love with React & Next</Text>
        <Text>(normal / default) In love with React & Next</Text>
        <Text fontWeight="bold">(bold) In love with React & Next</Text>
    </Stack>
);

export const TextColor: React.FC = () => (
    <Stack spacing={3}>
        <Text>(gray.800 / default) In love with React & Next</Text>
        <Text color="gray.500">(gray.500) In love with React & Next</Text>
        <Text color="gray.800">(bold) In love with React & Next</Text>
        <Text color="tomato">(tomato) In love with React & Next</Text>
        <Text color="green.500">(green.500) In love with React & Next</Text>
        <Text color="orange.500">(orange.500) In love with React & Next</Text>
    </Stack>
);

export const Heading: React.FC = () => (
    <Stack spacing={6}>
        <HeadingComponent as="h1" size="4xl" isTruncated>
            (4xl) In love with React & Next
        </HeadingComponent>
        <HeadingComponent as="h2" size="3xl" isTruncated>
            (3xl) In love with React & Next
        </HeadingComponent>
        <HeadingComponent as="h2" size="2xl">
            (2xl) In love with React & Next
        </HeadingComponent>
        <HeadingComponent as="h2" size="xl">
            (xl) In love with React & Next
        </HeadingComponent>
        <HeadingComponent as="h3" size="lg">
            (lg) In love with React & Next
        </HeadingComponent>
        <HeadingComponent as="h4" size="md">
            (md) In love with React & Next
        </HeadingComponent>
        <HeadingComponent as="h5" size="sm">
            (sm) In love with React & Next
        </HeadingComponent>
        <HeadingComponent as="h6" size="xs">
            (xs) In love with React & Next
        </HeadingComponent>
    </Stack>
);
