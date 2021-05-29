import React from 'react';
import { DEFAULT_LOCALE, SHORT_CONTENT_WORDS_AMOUNT, SHORT_DESC_WORDS_AMOUT, AVATAR_FALLBACK_URL } from '@consts/app';
import { fetchUserAsync, getUserSelector } from '@slices/userSlice';
import { getUserName } from '@utils/user';
import { RequestStatus } from '@models/misc';
import { ROUTES } from '@consts/routes';
import { truncateStringByWords } from '@utils/misc';
import { toLocaleDateString } from '@utils/convert';
import { useLocation, useHistory } from 'react-router-dom';
import { useMount } from 'react-use';
import { useSelector } from 'react-redux';
import useDispatch from '@hooks/useDispatch';

import { AspectRatio, Box, Heading, Image, VStack, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from '@components/Breadcrumbs';
import Card from '@components/Card';
import Main from '@layouts/Main';

export const UserProfile: React.FC = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const fetchUser = useDispatch(fetchUserAsync);
    const { requestStatus, data: userData, proposals } = useSelector(getUserSelector);

    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;
    const showContent = requestStatus === RequestStatus.SUCCESS;
    const showError = requestStatus === RequestStatus.ERROR;

    const handleTitleClick = (proposalId: string) => history.push(`${ROUTES.PROPOSALS}/${proposalId}`);

    const userName = getUserName(userData.firstName, userData.lastName, userData.username);

    useMount(() => {
        const userId = pathname.split('/').pop();

        fetchUser(userId);
    });

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs
                current={`Profil użytkownika ${userName}`}
                crumbs={[{ title: 'Strona główna', link: ROUTES.PROPOSALS }]}
                mb={8}
            />
            {showSkeleton && <>Skeleton</>}
            {showError && <>Error</>}
            {showContent && (
                <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8 }}>
                    <Box w={350} maxW="100%" mb={{ base: 6 }}>
                        <AspectRatio maxW="100%" mb={4} ration={1}>
                            <Image
                                alt="Awatar żytkownika"
                                borderRadius={6}
                                objectFit="cover"
                                src={userData.avatar}
                                fallbackSrc={AVATAR_FALLBACK_URL}
                            />
                        </AspectRatio>
                        <Heading size="lg" mb={4}>
                            {userName}
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
                                    categoryName={category.name}
                                    categoryColor={category.color}
                                    publishDate={toLocaleDateString(created, DEFAULT_LOCALE)}
                                    title={title}
                                    userAvatarUrl={userData.avatar}
                                    userName={getUserName(userData.firstName, userData.lastName, userData.username)}
                                    shortUserDesc={truncateStringByWords(userData.description, SHORT_DESC_WORDS_AMOUT)}
                                    onTitleClick={() => handleTitleClick(id)}
                                />
                            ))}
                        </VStack>
                    </Box>
                </Stack>
            )}
        </Main>
    );
};
