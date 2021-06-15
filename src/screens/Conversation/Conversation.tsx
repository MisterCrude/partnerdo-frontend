import React, { useRef, useState } from 'react';
import { useMount, useUnmount, useUpdateEffect } from 'react-use';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DEFAULT_LOCALE } from '@consts/app';
import { ROUTES } from '@consts/routes';
import { toLocaleDateString, toLocaleTimeString } from '@utils/convert';
import { getUserName } from '@utils/user';
import useDispatch from '@hooks/useDispatch';
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

export const Conversation: React.FC = () => {
    const [conversationStatus, setConversationStatus] = useState(IChatRoomStatus.IDLE);

    const history = useHistory();
    const { pathname } = useLocation();

    const chatRoomData = useSelector(getDetailsDataSelector);
    const requestStatus = useSelector(getDetailsRequestStatusSelector);
    // const chatRoomStatusRequestStatus = useSelector(getChangeChatRoomStatusRequestStatusSelector);
    const { id: profileId } = useSelector(getProfileDataSelector);

    const fetchDetails = useDispatch<string>(fetchDetailsAsync);
    const changeChatRoomStatus = useDispatch<{ chatRoomId: string; status: IChatRoomStatus }>(
        changeChatRoomStatusAsync
    );
    const resetDetails = useDispatch(reset);

    const {
        id: chatRoomId,
        proposalAuthor,
        initiator,
        initialMessage,
        proposal,
        status,
        created: initialMessageCreatedTime,
    } = chatRoomData;

    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;
    const showError = requestStatus === RequestStatus.ERROR;
    const showContent = requestStatus === RequestStatus.SUCCESS;

    const getIsOwnProposal = () => profileId === initiator.id;

    useMount(() => {
        const chatRoomId = pathname.split('/').pop();
        fetchDetails(chatRoomId);
    });

    useUnmount(() => resetDetails());

    useUpdateEffect(() => {
        setConversationStatus(status);
    }, [status]);

    const ws = useRef<WebSocket>();

    const [messagesList, setMessagesList] = useState<Array<{ message: string; username: string; created: string }>>([]);
    const [message, setMessage] = useState('');

    const handleChange = () => {
        ws.current &&
            ws.current.send(
                JSON.stringify({
                    type: 'message',
                    message,
                })
            );
        setMessage('');
    };

    const handleBack = () => {
        history.goBack();
    };

    const handleAccept = () => {
        const status = IChatRoomStatus.APPROVE;

        changeChatRoomStatus({ chatRoomId, status });
        setConversationStatus(status);
    };

    const handleReject = () => {
        const status = IChatRoomStatus.REJECT;

        changeChatRoomStatus({ chatRoomId, status });
        setConversationStatus(status);
    };

    useMount(() => {
        try {
            const token = localStorage.getItem('token');
            ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/dadfadfadf/?token=${token}`);

            ws.current.onopen = () => {
                console.log('connected');
            };
            ws.current.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);

                dataFromServer && setMessagesList((prevData) => [...prevData, dataFromServer]);
            };
            ws.current.onclose = ({ type }) => {
                console.log(type, 'disconnected');
            };
        } catch (error) {
            console.error("Can't opent WS connection");
        }
    });

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
                            {getIsOwnProposal() ? (
                                <Message
                                    message={initialMessage}
                                    sentTime={`${toLocaleTimeString(
                                        initialMessageCreatedTime,
                                        DEFAULT_LOCALE
                                    )}, ${toLocaleDateString(initialMessageCreatedTime, DEFAULT_LOCALE)}`}
                                />
                            ) : (
                                <Message
                                    showControls={conversationStatus === IChatRoomStatus.IDLE}
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

                            {messagesList.map(({ message, username, created }, index) => (
                                <Message
                                    key={index}
                                    onApprove={handleAccept}
                                    onReject={() => null}
                                    author={username}
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
                        {conversationStatus === IChatRoomStatus.APPROVE && (
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

                        {conversationStatus === IChatRoomStatus.REJECT && (
                            <>
                                {getIsOwnProposal() ? (
                                    <Text
                                        align="center"
                                        bgColor="orange.100"
                                        borderRadius={6}
                                        fontWeight="light"
                                        mb={8}
                                        p={4}
                                    >
                                        Musisz poczekać na akceptację od użytkownika &nbsp;
                                        <strong>
                                            {getUserName(
                                                proposalAuthor.firstName,
                                                proposalAuthor.lastName,
                                                proposalAuthor.username
                                            )}
                                        </strong>
                                    </Text>
                                ) : (
                                    <Text
                                        align="center"
                                        bgColor="red.100"
                                        borderRadius={6}
                                        fontWeight="light"
                                        mb={8}
                                        p={4}
                                    >
                                        Ta propozycja została przez Ciebie odrzucona
                                    </Text>
                                )}
                            </>
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

                            {conversationStatus === IChatRoomStatus.APPROVE && (
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
