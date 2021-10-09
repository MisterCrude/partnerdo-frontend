import { ChangeEvent, useMemo, useState } from 'react';
import { useUnmount, useUpdateEffect } from 'react-use';
import { camelCase } from 'lodash/fp';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE } from '@consts/app';
import { ROUTES } from '@consts/routes';
import { toLocaleDateString, toLocaleTimeString } from '@utils/convert';
import { getUserName } from '@utils/user';
import useDispatch from '@hooks/useDispatch';
import { RequestStatus, WSMessageTypes, IWSMessage } from '@typing/api';
import { IChatroomStatus } from '@typing/chat';
import { changeChatroomStatusAsync, resetChatroomMessageList as resetMessageList } from '@slices/chatroomSlice';
import {
    detailsSelector,
    messageListSelector,
    chatroomMessageListRequestStatusSelector,
    changeChatroomStatusRequestStatusSelector,
    chatroomListRequestStatusSelector,
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
    const [newMessage, setNewMessage] = useState('');
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const { chatroomId } = useParams<{ chatroomId: string }>();
    const history = useHistory();

    const chatroomDetails = useSelector(detailsSelector(chatroomId));
    const messageList = useSelector(messageListSelector);
    const messageListRequestStatus = useSelector(chatroomMessageListRequestStatusSelector);
    const chatroomListRequestStatus = useSelector(chatroomListRequestStatusSelector);
    const changeChatroomStatusRequestStatus = useSelector(changeChatroomStatusRequestStatusSelector);
    const { id: profileId } = useSelector(profileSelector);

    const changeChatroomStatus = useDispatch<{
        chatroomId: string;
        status: IChatroomStatus;
    }>(changeChatroomStatusAsync);

    // TODO refactor sendChatroomMessage and connectToChatroom
    const sendChatroomMessage = useDispatch((message: IWSMessage<{ text: string; chatroomId: string }>) => ({
        // TODO remove `chatroom/${camelCase(WSMessageTypes.CHATROOM_MESSAGE)}`, from here and from WebsocketMeddleware
        type: `chatroom/${camelCase(WSMessageTypes.CHATROOM_MESSAGE)}`,
        payload: message,
    }));
    // TODO refactor sendChatroomMessage and connectToChatroom
    const connectToChatroom = useDispatch((message: IWSMessage<string>) => ({
        // TODO remove `chatroom/${toCamelCase(WSMessageTypes.CONNECT_TO_CHATROOM)}`, from here and from WebsocketMeddleware
        type: `chatroom/${camelCase(WSMessageTypes.CONNECT_TO_CHATROOM)}`,
        payload: message,
    }));
    const resetChatroomMessageList = useDispatch(resetMessageList);

    const showSkeleton =
        chatroomListRequestStatus === RequestStatus.FETCHING || chatroomListRequestStatus === RequestStatus.IDLE;
    const showError = chatroomListRequestStatus === RequestStatus.ERROR;
    const showContent = chatroomListRequestStatus === RequestStatus.SUCCESS;

    const isApproved = chatroomStatus === IChatroomStatus.APPROVED;
    const isOwnProposal = useMemo(() => profileId === chatroomDetails?.proposal.author.id, [
        chatroomDetails?.companion,
    ]);

    const isMessageListLoading =
        (messageListRequestStatus === RequestStatus.FETCHING || messageListRequestStatus === RequestStatus.IDLE) &&
        isApproved;
    const isMessageListLoaded = messageListRequestStatus === RequestStatus.SUCCESS && isApproved;

    const handleSendMessage = () => {
        setNewMessage('');
        setIsSendingMessage(true);
        sendChatroomMessage({ type: WSMessageTypes.CHATROOM_MESSAGE, message: { text: newMessage, chatroomId } });
    };
    const handleChangeMessage = ({ target }: ChangeEvent<HTMLTextAreaElement>) => setNewMessage(target.value);
    const handleBack = () => history.goBack();
    const handleApprove = () => {
        setActionButtonVariantLoading('approve');
        changeChatroomStatus({ chatroomId, status: IChatroomStatus.APPROVED });
    };
    const handleReject = () => {
        setActionButtonVariantLoading('reject');
        changeChatroomStatus({ chatroomId, status: IChatroomStatus.REJECTED });
    };

    useUpdateEffect(() => setChatroomStatus(chatroomDetails?.status), [chatroomDetails?.status]);
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
    useUnmount(resetChatroomMessageList);

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
                        title={chatroomDetails.proposal.title}
                        proposalId={chatroomDetails.proposal.id}
                        authorId={chatroomDetails.companion.id}
                        address={`${chatroomDetails.proposal.city.name}, ${chatroomDetails.proposal.cityArea.name}`}
                        userAvatarUrl={chatroomDetails.proposal.author.avatar}
                        userName={getUserName(
                            chatroomDetails.proposal.author.firstName,
                            chatroomDetails.proposal.author.lastName,
                            chatroomDetails.proposal.author.username
                        )}
                        categoryName={chatroomDetails.proposal.category.name}
                        categoryColor={chatroomDetails.proposal.category.color}
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
                                    author={getUserName(
                                        chatroomDetails.companion.firstName,
                                        chatroomDetails.companion.lastName,
                                        chatroomDetails.companion.username
                                    )}
                                    message={chatroomDetails.initialMessage}
                                    sentTime={`${toLocaleTimeString(
                                        chatroomDetails.created,
                                        DEFAULT_LOCALE
                                    )}, ${toLocaleDateString(chatroomDetails.created, DEFAULT_LOCALE)}`}
                                />
                            ) : (
                                <Message
                                    message={chatroomDetails.initialMessage}
                                    sentTime={`${toLocaleTimeString(
                                        chatroomDetails.created,
                                        DEFAULT_LOCALE
                                    )}, ${toLocaleDateString(chatroomDetails.created, DEFAULT_LOCALE)}`}
                                />
                            )}
                            {isMessageListLoading && chatroomDetails.messageTotalAmount !== 0 && (
                                <>Fetching messages list...</>
                            )}
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
                        <Notification
                            isOwn={isOwnProposal}
                            status={chatroomStatus}
                            isShow={chatroomDetails.messageTotalAmount === 0}
                        />

                        {isApproved && (
                            <Textarea
                                h={40}
                                name="surname"
                                resize="none"
                                type="text"
                                mb={8}
                                placeholder="Wpisz swoją wiadomość"
                                value={newMessage}
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
                                    disabled={!newMessage.length}
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
