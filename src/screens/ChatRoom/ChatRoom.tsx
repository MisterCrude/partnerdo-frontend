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
import { RequestStatus } from '@models/api';
import { IChatRoomStatus } from '@models/chat';
import {
    fetchDetailsAsync,
    changeChatRoomStatusAsync,
    getDetailsDataSelector,
    getDetailsRequestStatusSelector,
    // getChangeChatRoomStatusRequestStatusSelector,
    resetDetails as reset,
} from '@slices/chatRoomsSlice';
import { getProfileDataSelector } from '@slices/profileSlice';

import { Button, Box, Flex, Textarea, VStack, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';
import Message from './components/Message';
import Proposal from './components/Proposal';

export const ChatRoom: React.FC = () => {
    const [chatRoomStatus, setChatRoomStatus] = useState(IChatRoomStatus.IDLE);
    const [message, setMessage] = useState('');
    const { chatRoomId } = useParams<{ chatRoomId: string }>();
    const { messages, sendMessage } = useChat(chatRoomId);
    const history = useHistory();

    const chatRoomDetails = useSelector(getDetailsDataSelector);
    const requestStatus = useSelector(getDetailsRequestStatusSelector);
    // const chatRoomStatusRequestStatus = useSelector(getChangeChatRoomStatusRequestStatusSelector);
    const { id: profileId } = useSelector(getProfileDataSelector);

    const fetchDetails = useDispatch<string>(fetchDetailsAsync);
    const changeChatRoomStatus = useDispatch<{ chatRoomId: string; status: IChatRoomStatus }>(
        changeChatRoomStatusAsync
    );
    const resetDetails = useDispatch(reset);

    const {
        proposalAuthor,
        initiator,
        initialMessage,
        proposal,
        status,
        created: initialMessageCreatedTime,
    } = chatRoomDetails;

    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;
    const showError = requestStatus === RequestStatus.ERROR;
    const showContent = requestStatus === RequestStatus.SUCCESS;

    const isRejected = chatRoomStatus === IChatRoomStatus.REJECT;
    const isApproved = chatRoomStatus === IChatRoomStatus.APPROVE;
    const isIdle = chatRoomStatus === IChatRoomStatus.IDLE;
    const isOwnProposal = useMemo(() => profileId === initiator?.id, [initiator]);

    const handleChange = () => {
        sendMessage(message);
        setMessage('');
    };

    const handleBack = () => {
        history.goBack();
    };

    const handleAccept = () => {
        const status = IChatRoomStatus.APPROVE;

        changeChatRoomStatus({ chatRoomId, status });
        setChatRoomStatus(status);
    };

    const handleReject = () => {
        const status = IChatRoomStatus.REJECT;

        changeChatRoomStatus({ chatRoomId, status });
        setChatRoomStatus(status);
    };

    useMount(() => {
        fetchDetails(chatRoomId);
    });

    useUpdateEffect(() => {
        setChatRoomStatus(status);
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
                                    showControls={chatRoomStatus === IChatRoomStatus.IDLE}
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

                            {messages.map(({ message, sender, created }, index) => (
                                <Message
                                    key={index}
                                    onApprove={handleAccept}
                                    onReject={() => null}
                                    author={
                                        profileId !== sender.id
                                            ? getUserName(sender.firstName, sender.lastName, sender.username)
                                            : undefined
                                    }
                                    message={message}
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
