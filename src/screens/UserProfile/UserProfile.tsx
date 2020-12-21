import React from 'react';

import { AspectRatio, Box, Heading, Image, VStack, Stack } from '@chakra-ui/react';
import Card from '@components/Card';
import Main from '@layouts/Main';

export const UserProfile: React.FC = () => {
    return (
        <Main flexGrow={1}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8 }} mb={{ base: 4, md: 8 }}>
                <Box w={200}>
                    <AspectRatio maxW="100%" mb={3} ration={1}>
                        <Image
                            alt="Jan Baraban"
                            borderRadius={6}
                            objectFit="cover"
                            src="https://bit.ly/sage-adebayo"
                            fallbackSrc="https://via.placeholder.com/300"
                        />
                    </AspectRatio>
                    <Heading size="md">Jan Baraban</Heading>
                </Box>
                <Box flexGrow={1}>
                    <Heading as="h2" size="lg" mb={{ base: 4, md: 8 }}>
                        Aktualne partnerstwa
                    </Heading>
                    <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
                        <Card isHeadLess />
                        <Card isHeadLess />
                        <Card isHeadLess />
                        <Card isHeadLess />
                    </VStack>
                </Box>
            </Stack>
        </Main>
    );
};
