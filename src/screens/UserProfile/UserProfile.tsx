import React from 'react';

import { ROUTES } from '@config/app';

import { AspectRatio, Box, Heading, Image, VStack, Stack, Text } from '@chakra-ui/react';
import Card from '@components/Card';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';

export const UserProfile: React.FC = () => {
    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs
                current="Profil użytkownika Jan Baraban"
                crumbs={[{ title: 'Strona główna', link: ROUTES.PROPOSALS }]}
                mb={8}
            />

            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8 }}>
                <Box w={350} maxW="100%" mb={{ base: 6 }}>
                    <AspectRatio maxW="100%" mb={4} ration={1}>
                        <Image
                            alt="Jan Baraban"
                            borderRadius={6}
                            objectFit="cover"
                            src="https://bit.ly/sage-adebayo"
                            fallbackSrc="https://via.placeholder.com/300"
                        />
                    </AspectRatio>
                    <Heading size="md" mb={4}>
                        Jan Baraban
                    </Heading>

                    <Text color="gray.500" fontSize="sm">
                        Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję
                        partnera do głębokiego lenistwa Poszuk partnera
                    </Text>
                </Box>
                <Box flexGrow={1}>
                    <Heading as="h2" size="lg" mb={{ base: 4, md: 8 }}>
                        Aktualne partnerstwa
                    </Heading>
                    <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
                        <Card
                            address="Warszawa, Bemowo"
                            content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                            category="Sport"
                            publishDate="01.10.2020"
                            title="Poszukuję partnera do głębokiego lenistwa"
                            userAvatarUrl="https://bit.ly/sage-adebayo"
                            userName="Jan Baraban"
                            partDescription="Kawałek opisu z profilu bla bla..."
                            onTitleClick={() => {
                                return null;
                            }}
                        />
                    </VStack>
                </Box>
            </Stack>
        </Main>
    );
};
