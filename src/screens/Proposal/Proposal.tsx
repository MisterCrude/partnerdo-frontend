import React from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import {
    resetDetails as reset,
    fetchDetailsAsync,
    getDetailsData,
    getDetailsRequestStatusSelector,
} from '@slices/proposalSlice';
import { ROUTES } from '@consts/routes';
import { RequestStatus } from '@models/misc';
import { DEFAULT_LOCALE, AVATAR_FALLBACK_URL } from '@consts/app';
import { useMount, useUnmount } from 'react-use';
import { toLocaleDateString } from '@utils/convert';
import { getUserName } from '@utils/user';
import { useSelector } from 'react-redux';
import useDispatch from '@hooks/useDispatch';

import { AspectRatio, Box, Button, Divider, Flex, Heading, Image, Stack, Tag, Textarea, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { CalendarIcon, LocationIcon } from '@theme/customIcons';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';
import ModalFrame from '@components/ModalFrame';

interface IProps {
    isAuth?: boolean;
}

export const Proposal: React.FC<IProps> = ({ isAuth = false }) => {
    const history = useHistory();
    const { pathname } = useLocation();

    const proposalData = useSelector(getDetailsData);
    const requestStatus = useSelector(getDetailsRequestStatusSelector);

    const fetchDetails = useDispatch<string>(fetchDetailsAsync);
    const resetDetails = useDispatch(reset);

    const { author, category, cityArea, city, created, description, title } = proposalData;

    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;
    const showError = requestStatus === RequestStatus.ERROR;
    const showContet = requestStatus === RequestStatus.SUCCESS;

    const handleBack = () => {
        history.goBack();
    };

    useMount(() => {
        const proposalId = pathname.split('/').pop();
        fetchDetails(proposalId);
    });

    useUnmount(() => {
        resetDetails();
    });

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs
                crumbs={[{ title: isAuth ? 'Strona główna' : 'Lista partnerstw', link: ROUTES.PROPOSALS }]}
                current="Poszukuję partnera do głębokiego lenistwa"
                mb={8}
            />

            <>
                {showSkeleton && <>Skeleton</>}
                {showError && <>Error</>}
                {showContet && (
                    <>
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            spacing={{ base: 4, md: 8 }}
                            mb={{ base: 4, md: 8 }}
                        >
                            <Box w={200} maxW="100%">
                                <AspectRatio maxW="100%" mb={3} ration={1}>
                                    <Image
                                        alt="Avatar"
                                        borderRadius={6}
                                        objectFit="cover"
                                        src={author.avatar}
                                        fallbackSrc={AVATAR_FALLBACK_URL}
                                    />
                                </AspectRatio>
                                <Heading
                                    size="md"
                                    as={RouterLink}
                                    to={`${ROUTES.USER_PROFILE}/${author.id}`}
                                    mx={1}
                                    _hover={{ textDecor: 'underline' }}
                                >
                                    {getUserName(author)}
                                </Heading>
                            </Box>

                            <Divider d={{ base: 'block', md: 'none' }} />

                            <Box>
                                <Heading as="h2" size="lg" mb={2}>
                                    {title}
                                </Heading>
                                <Box color="gray.500">
                                    <LocationIcon mr={1} pos="relative" top="-1px" /> {city.name}, {cityArea.name}
                                </Box>
                                <Box color="gray.500" fontSize="sm" mb={2}>
                                    <CalendarIcon mr={1} mt={-1} fontSize="md" />{' '}
                                    {toLocaleDateString(created, DEFAULT_LOCALE)}
                                </Box>
                                <Tag borderRadius="full" bgColor="orange.500" px={4} variant="solid">
                                    {category.name}
                                </Tag>
                            </Box>
                        </Stack>
                        <Box flexGrow={1}>
                            <Text mb={6}>{description}</Text>

                            <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between">
                                <Button
                                    onClick={handleBack}
                                    flexGrow={{ base: 1, md: 0 }}
                                    mr={4}
                                    variant="unstyled"
                                    leftIcon={<ChevronLeftIcon />}
                                >
                                    Wróć
                                </Button>

                                {isAuth ? (
                                    <ModalFrame
                                        actionTitle="Wyślij"
                                        buttonProps={{
                                            bgColor: 'gray.800',
                                            color: 'white',
                                            variant: 'solid',
                                            _active: { bgColor: 'gray.800' },
                                            _hover: { bgColor: 'gray.600' },
                                        }}
                                        modalTitle="Poszukuję partnera do głębokiego lenistwa"
                                        onAction={() => {
                                            console.log(1);
                                        }}
                                        size="5xl"
                                        triggerTitle="Złóż ofertę"
                                    >
                                        <>
                                            <Textarea
                                                h={72}
                                                name="surname"
                                                mb={1}
                                                // ref={register}
                                                resize="none"
                                                type="text"
                                                placeholder="Twoja odpowiedź"
                                                size="lg"
                                            />
                                        </>
                                    </ModalFrame>
                                ) : (
                                    <Button
                                        as={RouterLink}
                                        to={ROUTES.LOGIN}
                                        bgColor="gray.800"
                                        color="white"
                                        variant="solid"
                                        _active={{ bgColor: 'gray.800' }}
                                        _hover={{ bgColor: 'gray.600' }}
                                    >
                                        Złóż ofertę
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    </>
                )}
            </>
        </Main>
    );
};
