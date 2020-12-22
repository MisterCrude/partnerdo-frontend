import React from 'react';

import { ChatIcon } from '@chakra-ui/icons';
import { AspectRatio, Box, Button, Heading, Image, VStack, Stack, Text } from '@chakra-ui/react';
import Card from '@components/Card';
import Main from '@layouts/Main';

export const UserProfile: React.FC = () => {
    return (
        <Main flexGrow={1}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8 }} mb={{ base: 4, md: 8 }}>
                <Box w={350} maxW="100%" mb={{ base: 6 }}>
                    <AspectRatio maxW="100%" mb={3} ration={1}>
                        <Image
                            alt="Jan Baraban"
                            borderRadius={6}
                            objectFit="cover"
                            src="https://bit.ly/sage-adebayo"
                            fallbackSrc="https://via.placeholder.com/300"
                        />
                    </AspectRatio>
                    <Heading size="md" mb={3}>
                        Jan Baraban
                    </Heading>
                    <Text mb={4} fontSize="sm">
                        Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję
                        partnera do głębokiego lenistwa Poszuk partnera
                    </Text>
                    <Button
                        backgroundColor="gray.800"
                        color="white"
                        variant="solid"
                        rightIcon={<ChatIcon />}
                        _active={{ backgroundColor: 'gray.800' }}
                        _hover={{ backgroundColor: 'gray.600' }}
                    >
                        Wyślij wiadomość
                    </Button>
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
