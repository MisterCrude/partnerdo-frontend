import { ChangeEvent, useMemo, useState } from 'react';
import { useMount, useUnmount, useUpdateEffect } from 'react-use';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE } from '@consts/app';
import { ROUTES } from '@consts/routes';
import { toLocaleDateString, toLocaleTimeString } from '@utils/convert';
import { getUserName } from '@utils/user';
import useDispatch from '@hooks/useDispatch';
import { RequestStatus, WSMessageTypes, IWSMessage } from '@typing/api';
import { IChatroomStatus } from '@typing/chat';
import {
    fetchDetailsAsync,
    changeChatroomStatusAsync,
    getDetailsSelector,
    getDetailsRequestStatusSelector,
    getChatroomMessageListSelector,
    getChatroomMessageListRequestStatusSelector,
    resetDetails as reset,
    resetChatroomMessageList as resetMessageList,
} from '@slices/chatroomsSlice';
import { getProfileDataSelector } from '@slices/profileSlice';

import { Button, Box, Flex, Textarea, VStack, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';
import Message from './components/Message';
import Proposal from './components/Proposal';

export const Chatroom = () => {
    const [chatroomStatus, setChatroomStatus] = useState(IChatroomStatus.IDLE);
    const [message, setMessage] = useState('');
    const { chatroomId } = useParams<{ chatroomId: string }>();
    const history = useHistory();

    const chatroomDetails = useSelector(getDetailsSelector);
    const messageList = useSelector(getChatroomMessageListSelector);
    const messageListRequestStatus = useSelector(getChatroomMessageListRequestStatusSelector);
    const requestStatus = useSelector(getDetailsRequestStatusSelector);
    const { id: profileId } = useSelector(getProfileDataSelector);

    const fetchDetails = useDispatch<string>(fetchDetailsAsync);
    const changeChatroomStatus = useDispatch<{
        chatroomId: string;
        status: IChatroomStatus;
    }>(changeChatroomStatusAsync);
    const sendChatroomMessage = useDispatch((message: IWSMessage<{ text: string; chatroomId: string }>) => ({
        type: WSMessageTypes.CHATROOM_MESSAGE,
        payload: message,
    }));
    const connectToChatroom = useDispatch((message: IWSMessage<string>) => ({
        type: WSMessageTypes.CONNECT_TO_CHATROOM,
        payload: message,
    }));
    const resetDetails = useDispatch(reset);
    const resetChatroomMessageList = useDispatch(resetMessageList);

    const {
        initialMessage,
        companion,
        messageTotalAmount,
        proposal,
        status,
        created: initialMessageCreatedTime,
    } = chatroomDetails;

    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;
    const showError = requestStatus === RequestStatus.ERROR;
    const showContent = requestStatus === RequestStatus.SUCCESS;

    const isRejected = chatroomStatus === IChatroomStatus.REJECTED;
    const isApproved = chatroomStatus === IChatroomStatus.APPROVED;
    const isIdle = chatroomStatus === IChatroomStatus.IDLE;
    const isOwnProposal = useMemo(() => profileId === proposal?.author.id, [companion]);

    const isMessageListLoading =
        (messageListRequestStatus === RequestStatus.FETCHING || messageListRequestStatus === RequestStatus.IDLE) &&
        isApproved;
    const isMessageListLoaded = messageListRequestStatus === RequestStatus.SUCCESS && isApproved;

    const handleSendMessage = () => {
        setMessage('');
        sendChatroomMessage({ type: WSMessageTypes.CHATROOM_MESSAGE, message: { text: message, chatroomId } });
    };

    const handleChangeMessage = ({ target }: ChangeEvent<HTMLTextAreaElement>) => setMessage(target.value);

    const handleBack = () => {
        history.goBack();
    };

    const handleAccept = () => {
        const status = IChatroomStatus.APPROVED;

        changeChatroomStatus({ chatroomId, status });
        setChatroomStatus(status);
    };

    const handleReject = () => {
        const status = IChatroomStatus.REJECTED;

        changeChatroomStatus({ chatroomId, status });
        setChatroomStatus(status);
    };

    useMount(() => {
        fetchDetails(chatroomId);
        // TODO setTimeout
        setTimeout(() => connectToChatroom({ type: WSMessageTypes.CONNECT_TO_CHATROOM, message: chatroomId }), 1000);
    });

    useUpdateEffect(() => {
        setChatroomStatus(status);
    }, [status]);

    useUnmount(() => {
        resetDetails();
        resetChatroomMessageList();
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
                        authorId={companion.id}
                        address={`${proposal.city.name}, ${proposal.cityArea.name}`}
                        userAvatarUrl={companion.avatar}
                        userName={getUserName(
                            proposal.author.firstName,
                            proposal.author.lastName,
                            proposal.author.username
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
                                    author={getUserName(companion.firstName, companion.lastName, companion.username)}
                                    message={initialMessage}
                                    sentTime={`${toLocaleTimeString(
                                        initialMessageCreatedTime,
                                        DEFAULT_LOCALE
                                    )}, ${toLocaleDateString(initialMessageCreatedTime, DEFAULT_LOCALE)}`}
                                />
                            )}
                            {isMessageListLoading && <>Fetching messages list...</>}
                            {isMessageListLoaded &&
                                messageList.map(({ id, content, author, created }) => (
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
                        {isOwnProposal && isApproved && Number(messageTotalAmount) < 1 && (
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
                                onChange={handleChangeMessage}
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
                                    onClick={handleSendMessage}
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
