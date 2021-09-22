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
    resetDetails as reset,
    resetChatroomMessageList as resetMessageList,
} from '@slices/chatroomSlice';
import {
    detailsSelector,
    detailsRequestStatusSelector,
    messageListSelector,
    chatroomMessageListRequestStatusSelector,
    changeChatroomStatusRequestStatusSelector,
} from '@selectors/chatroomSelectors';
import { profileSelector } from '@selectors/profileSelectors';

import { Button, Box, Flex, Textarea, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';
import Message from './components/Message';
import InitialMessage from './components/InitialMessage';
import Proposal from './components/Proposal';
import Notification from './components/Notification';

export const Chatroom = () => {
    const [chatroomStatus, setChatroomStatus] = useState(IChatroomStatus.IDLE);
    const [actionButtonVariantLoading, setActionButtonVariantLoading] = useState<'approve' | 'reject' | undefined>();
    const [message, setMessage] = useState('');
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const { chatroomId } = useParams<{ chatroomId: string }>();
    const history = useHistory();

    const chatroomDetails = useSelector(detailsSelector);
    const messageList = useSelector(messageListSelector);
    const messageListRequestStatus = useSelector(chatroomMessageListRequestStatusSelector);
    const changeChatroomStatusRequestStatus = useSelector(changeChatroomStatusRequestStatusSelector);
    const requestStatus = useSelector(detailsRequestStatusSelector);
    const { id: profileId } = useSelector(profileSelector);

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
        proposal,
        status,
        created: initialMessageCreatedTime,
        messageTotalAmount,
    } = chatroomDetails;

    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;
    const showError = requestStatus === RequestStatus.ERROR;
    const showContent = requestStatus === RequestStatus.SUCCESS;

    const isApproved = chatroomStatus === IChatroomStatus.APPROVED;
    const isOwnProposal = useMemo(() => profileId === proposal?.author.id, [companion]);

    const isMessageListLoading = messageListRequestStatus === RequestStatus.FETCHING && isApproved;
    const isMessageListLoaded = messageListRequestStatus === RequestStatus.SUCCESS && isApproved;

    const handleSendMessage = () => {
        setMessage('');
        setIsSendingMessage(true);
        sendChatroomMessage({ type: WSMessageTypes.CHATROOM_MESSAGE, message: { text: message, chatroomId } });
    };
    const handleChangeMessage = ({ target }: ChangeEvent<HTMLTextAreaElement>) => setMessage(target.value);
    const handleBack = () => history.goBack();
    const handleApprove = () => {
        setActionButtonVariantLoading('approve');
        changeChatroomStatus({ chatroomId, status: IChatroomStatus.APPROVED });
    };
    const handleReject = () => {
        setActionButtonVariantLoading('reject');
        changeChatroomStatus({ chatroomId, status: IChatroomStatus.REJECTED });
    };

    useMount(() => fetchDetails(chatroomId));
    useUpdateEffect(() => setChatroomStatus(status), [status]);
    useUpdateEffect(() => {
        if (changeChatroomStatusRequestStatus === RequestStatus.SUCCESS) {
            setChatroomStatus(IChatroomStatus.APPROVED);
        }
        // TODO move it up, inside to if
        connectToChatroom({ type: WSMessageTypes.CONNECT_TO_CHATROOM, message: chatroomId });
    }, [changeChatroomStatusRequestStatus]);
    useUpdateEffect(() => {
        if (chatroomStatus === IChatroomStatus.APPROVED)
            setTimeout(
                () => connectToChatroom({ type: WSMessageTypes.CONNECT_TO_CHATROOM, message: chatroomId }),
                1000
            );
    }, [chatroomStatus]);
    useUpdateEffect(() => {
        if (messageListRequestStatus !== RequestStatus.FETCHING) setIsSendingMessage(false);
    }, [messageListRequestStatus]);
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
                        userAvatarUrl={proposal.author.avatar}
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
                                <InitialMessage
                                    showControls={chatroomStatus === IChatroomStatus.IDLE}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                    isRejectLoading={
                                        changeChatroomStatusRequestStatus === RequestStatus.FETCHING &&
                                        actionButtonVariantLoading === 'reject'
                                    }
                                    isApproveLoading={
                                        changeChatroomStatusRequestStatus === RequestStatus.FETCHING &&
                                        actionButtonVariantLoading === 'approve'
                                    }
                                    author={getUserName(companion.firstName, companion.lastName, companion.username)}
                                    message={initialMessage}
                                    sentTime={`${toLocaleTimeString(
                                        initialMessageCreatedTime,
                                        DEFAULT_LOCALE
                                    )}, ${toLocaleDateString(initialMessageCreatedTime, DEFAULT_LOCALE)}`}
                                />
                            ) : (
                                <Message
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
                        {!messageTotalAmount && <Notification isOwn={isOwnProposal} status={chatroomStatus} />}

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
                                    isLoading={isSendingMessage}
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
