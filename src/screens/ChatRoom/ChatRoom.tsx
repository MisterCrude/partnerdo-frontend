import React, { useMemo, useState } from 'react';
import { useMount, useUnmount, useUpdateEffect } from 'react-use';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE } from '@consts/app';
import { ROUTES } from '@consts/routes';
import { toLocaleDateString, toLocaleTimeString } from '@utils/convert';
import { getUserName } from '@utils/user';
import useDispatch from '@hooks/useDispatch';
import useChat from '@hooks/useChat';
import { RequestStatus } from '@typing/api';
import { IChatroomStatus } from '@typing/chat';
import {
    fetchDetailsAsync,
    changeChatroomStatusAsync,
    getDetailsDataSelector,
    getDetailsRequestStatusSelector,
    // getChangeChatroomStatusRequestStatusSelector,
    resetDetails as reset,
} from '@slices/chatroomsSlice';
import { getProfileDataSelector } from '@slices/profileSlice';

import { Button, Box, Flex, Textarea, VStack, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';
import Message from './components/Message';
import Proposal from './components/Proposal';

export const Chatroom: React.FC = () => {
    const [chatroomStatus, setChatroomStatus] = useState(IChatroomStatus.IDLE);
    const [message, setMessage] = useState('');
    const { chatroomId } = useParams<{ chatroomId: string }>();
    const { messages, sendMessage } = useChat(chatroomId);
    const history = useHistory();

    const chatroomDetails = useSelector(getDetailsDataSelector);
    const requestStatus = useSelector(getDetailsRequestStatusSelector);
    // const chatroomStatusRequestStatus = useSelector(getChangeChatroomStatusRequestStatusSelector);
    const { id: profileId } = useSelector(getProfileDataSelector);

    const fetchDetails = useDispatch<string>(fetchDetailsAsync);
    const resetDetails = useDispatch(reset);
    const changeChatroomStatus = useDispatch<{ chatroomId: string; status: IChatroomStatus }>(
        changeChatroomStatusAsync
    );

    const {
        proposalAuthor,
        initiator,
        initialMessage,
        proposal,
        status,
        created: initialMessageCreatedTime,
    } = chatroomDetails;

    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;
    const showError = requestStatus === RequestStatus.ERROR;
    const showContent = requestStatus === RequestStatus.SUCCESS;

    const isRejected = chatroomStatus === IChatroomStatus.REJECT;
    const isApproved = chatroomStatus === IChatroomStatus.APPROVE;
    const isIdle = chatroomStatus === IChatroomStatus.IDLE;
    const isOwnProposal = useMemo(() => profileId === initiator?.id, [initiator]);

    const handleChange = () => {
        sendMessage(message);
        setMessage('');
    };

    const handleBack = () => {
        history.goBack();
    };

    const handleAccept = () => {
        const status = IChatroomStatus.APPROVE;

        changeChatroomStatus({ chatroomId, status });
        setChatroomStatus(status);
    };

    const handleReject = () => {
        const status = IChatroomStatus.REJECT;

        changeChatroomStatus({ chatroomId, status });
        setChatroomStatus(status);
    };

    useMount(() => {
        fetchDetails(chatroomId);
    });

    useUpdateEffect(() => {
        setChatroomStatus(status);
    }, [status]);

    useUnmount(resetDetails);

    return (
        <Main d="flex" flexGrow={1} flexDir="column" mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs
                current="Poszukuję partnera do głębokiego lenistwa"
                crumbs={[
                    { title: 'Strona główna', link: ROUTES.ROOT },
                    { title: 'Wiadomości', link: ROUTES.CHAT },
                ]}
                mb={12}
            />

            {showSkeleton && <>Skeleton</>}
            {showError && <>Error</>}
            {showContent && (
                <>
                    <Proposal
                        title={proposal.title}
                        proposalId={proposal.id}
                        authorId={proposalAuthor.id}
                        address={`${proposal.city.name}, ${proposal.cityArea.name}`}
                        userAvatarUrl={proposalAuthor.avatar}
                        userName={getUserName(
                            proposalAuthor.firstName,
                            proposalAuthor.lastName,
                            proposalAuthor.username
                        )}
                        categoryName={proposal.category.name}
                        categoryColor={proposal.category.color}
                    />

                    <Box borderTopWidth={1} flexGrow={1} py={8}>
                        <VStack spacing={8}>
                            {isOwnProposal ? (
                                <Message
                                    message={initialMessage}
                                    sentTime={`${toLocaleTimeString(
                                        initialMessageCreatedTime,
                                        DEFAULT_LOCALE
                                    )}, ${toLocaleDateString(initialMessageCreatedTime, DEFAULT_LOCALE)}`}
                                />
                            ) : (
                                <Message
                                    showControls={chatroomStatus === IChatroomStatus.IDLE}
                                    onApprove={handleAccept}
                                    onReject={handleReject}
                                    author={getUserName(initiator.firstName, initiator.lastName, initiator.username)}
                                    message={initialMessage}
                                    sentTime={`${toLocaleTimeString(
                                        initialMessageCreatedTime,
                                        DEFAULT_LOCALE
                                    )}, ${toLocaleDateString(initialMessageCreatedTime, DEFAULT_LOCALE)}`}
                                />
                            )}
                            {messages.map(({ id, content, author, created }) => (
                                <Message
                                    key={id}
                                    onApprove={handleAccept}
                                    author={
                                        profileId !== author.id
                                            ? getUserName(author.firstName, author.lastName, author.username)
                                            : undefined
                                    }
                                    message={content}
                                    sentTime={`${toLocaleTimeString(created, DEFAULT_LOCALE)}, ${toLocaleDateString(
                                        created,
                                        DEFAULT_LOCALE
                                    )}`}
                                />
                            ))}
                        </VStack>
                    </Box>

                    <Box>
                        {isOwnProposal && isApproved && (
                            <Text align="center" bgColor="green.100" borderRadius={6} fontWeight="light" mb={8} p={4}>
                                Twoja propozycja została zaakceptowana, teraz mozesz napisać do tego użytkownika
                            </Text>
                        )}

                        {isApproved && (
                            <Textarea
                                h={40}
                                name="surname"
                                resize="none"
                                type="text"
                                mb={8}
                                placeholder="Wpisz swoją wiadomość"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                            />
                        )}

                        {isOwnProposal && isIdle && (
                            <Text align="center" bgColor="orange.100" borderRadius={6} fontWeight="light" mb={8} p={4}>
                                Musisz poczekać na akceptację użytkownika &nbsp;
                            </Text>
                        )}

                        {isOwnProposal && isRejected && (
                            <Text align="center" bgColor="red.100" borderRadius={6} fontWeight="light" mb={8} p={4}>
                                Twoja propozycja została odrzucona
                            </Text>
                        )}

                        {!isOwnProposal && isRejected && (
                            <Text align="center" bgColor="red.100" borderRadius={6} fontWeight="light" mb={8} p={4}>
                                Ta propozycja została przez Ciebie odrzucona
                            </Text>
                        )}

                        <Flex justifyContent={{ base: 'center', md: 'space-between' }}>
                            <Button
                                onClick={handleBack}
                                flexGrow={{ base: 1, md: 0 }}
                                mr={4}
                                variant="ghost"
                                leftIcon={<ChevronLeftIcon />}
                            >
                                Wróć
                            </Button>

                            {isApproved && (
                                <Button
                                    colorScheme="orange"
                                    disabled={!message.length}
                                    flexGrow={{ base: 1, md: 0 }}
                                    ml={4}
                                    onClick={handleChange}
                                >
                                    Wyślij
                                </Button>
                            )}
                        </Flex>
                    </Box>
                </>
            )}
        </Main>
    );
};
