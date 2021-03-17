import React from 'react';
import { DEFAULT_LOCALE, SHORT_CONTENT_WORDS_AMOUNT, SHORT_DESC_WORDS_AMOUT } from '@consts/app';
import { fetchUserAsync, getUserSelector } from '@slices/userSlice';
import { getUserName } from '@utils/user';
import { RequestStatus } from '@models/misc';
import { ROUTES } from '@consts/routes';
import { truncateStringByWords } from '@utils/misc';
import { toLocaleDateString } from '@utils/convert';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';
import { useSelector } from 'react-redux';
import useDispatch from '@hooks/useDispatch';

import { AspectRatio, Box, Heading, Image, VStack, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from '@components/Breadcrumbs';
import Card from '@components/Card';
import Main from '@layouts/Main';

const onTitleClick = () => null;

export const UserProfile: React.FC = () => {
    const { pathname } = useLocation();
    const fetchUser = useDispatch(fetchUserAsync);
    const { requestStatus, data: userData, proposals } = useSelector(getUserSelector);

    const isFetching = requestStatus === RequestStatus.FETCHING;
    const isSuccess = requestStatus === RequestStatus.SUCCESS;

    useMount(() => {
        const userId = pathname.split('/').pop();

        fetchUser(userId);
    });

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs
                current={`Profil użytkownika ${getUserName(userData)}`}
                crumbs={[{ title: 'Strona główna', link: ROUTES.PROPOSALS }]}
                mb={8}
            />
            {isFetching && <>Skeleton</>}

            {isSuccess && (
                <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8 }}>
                    <Box w={350} maxW="100%" mb={{ base: 6 }}>
                        <AspectRatio maxW="100%" mb={4} ration={1}>
                            <Image
                                alt="Awatar żytkownika"
                                borderRadius={6}
                                objectFit="cover"
                                src={userData.avatar}
                                fallbackSrc="https://via.placeholder.com/300"
                            />
                        </AspectRatio>
                        <Heading size="lg" mb={4}>
                            {getUserName(userData)}
                        </Heading>

                        <Text color="gray.500" fontSize="sm">
                            {truncateStringByWords(userData.description, SHORT_DESC_WORDS_AMOUT)}
                        </Text>
                    </Box>
                    <Box flexGrow={1}>
                        <Heading as="h2" size="md" mb={{ base: 4, md: 8 }}>
                            Aktualne partnerstwa
                        </Heading>
                        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
                            {proposals.map(({ id, city, cityArea, description, category, created, title }) => (
                                <Card
                                    key={id}
                                    // TODO save cityName and cityArea in store after initialFetch and get it by id
                                    address={`${city.name}, ${cityArea.name}`}
                                    content={truncateStringByWords(description, SHORT_CONTENT_WORDS_AMOUNT)}
                                    category={category.name}
                                    publishDate={toLocaleDateString(created, DEFAULT_LOCALE)}
                                    title={title}
                                    userAvatarUrl={userData.avatar || ''}
                                    userName={getUserName(userData)}
                                    shortUserDesc={truncateStringByWords(userData.description, SHORT_DESC_WORDS_AMOUT)}
                                    onTitleClick={onTitleClick}
                                />
                            ))}
                        </VStack>
                    </Box>
                </Stack>
            )}
        </Main>
    );
};
