import React, { useRef, useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DEFAULT_LOCALE } from '@consts/app';
import { ROUTES } from '@consts/routes';
import { toLocaleDateString, toLocaleTimeString } from '@utils/convert';
import { getUserName } from '@utils/user';
import useDispatch from '@hooks/useDispatch';
import { RequestStatus } from '@models/api';
import {
    fetchDetailsAsync,
    getDetailsDataSelector,
    getDetailsRequestStatusSelector,
    resetDetails as reset,
} from '@slices/chatRoomsSlice';

import { Button, Box, Flex, Textarea, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';
import Message from './components/Message';
import Proposal from './components/Proposal';

export const Conversation: React.FC = () => {
    const history = useHistory();
    const { pathname } = useLocation();

    const chatRoomData = useSelector(getDetailsDataSelector);
    const requestStatus = useSelector(getDetailsRequestStatusSelector);

    const fetchDetails = useDispatch<string>(fetchDetailsAsync);
    const resetDetails = useDispatch(reset);

    const { proposalAuthor, initiator, initialMessage, proposal, created: initialMessageCreatedTime } = chatRoomData;

    const showSkeleton = requestStatus === RequestStatus.FETCHING || requestStatus === RequestStatus.IDLE;
    const showError = requestStatus === RequestStatus.ERROR;
    const showContent = requestStatus === RequestStatus.SUCCESS;

    useMount(() => {
        const chatRoomId = pathname.split('/').pop();
        fetchDetails(chatRoomId);
    });

    useUnmount(() => resetDetails());

    const ws = useRef<WebSocket>();
    const [isAccepted, setIsAccepted] = useState(false);

    // temporary
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
    // temporary

    const handleBack = () => {
        history.goBack();
    };

    const handleAccept = () => setIsAccepted(true);

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
                        {/* <VStack spacing={8}>
                            <Message author="Jan Baraban" message="Siema sdsd sd asd" sentTime="14:30 20.12.20" />
                            <Message message="Siema sdsd sd asd" sentTime="14:30 20.12.2020" />
                            <Message message="Siema sdsd sd asd" sentTime="14:30 20.12.2020" />
                            <Message
                                author="Jan Baraban"
                                message="Siema sdsdSiema sdsd sdSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadf asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadf sd asdsdsdssd"
                                sentTime="14:30 20.12.2020"
                            />
                            <Message
                                message="Siema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadfSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadfSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadfSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadfSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadf "
                                sentTime="14:30 20.12.2020"
                            />
                            </VStack> */}

                        {/* For not accepted proposals */}
                        <VStack spacing={8}>
                            <Message
                                isAccepted={isAccepted}
                                onApprove={handleAccept}
                                onReject={() => {
                                    return null;
                                }}
                                author={getUserName(initiator.firstName, initiator.lastName, initiator.username)}
                                message={initialMessage}
                                sentTime={`${toLocaleTimeString(
                                    initialMessageCreatedTime,
                                    DEFAULT_LOCALE
                                )}, ${toLocaleDateString(initialMessageCreatedTime, DEFAULT_LOCALE)}`}
                            />

                            {messagesList.map(({ message, username, created }, index) => (
                                <Message
                                    key={index}
                                    isAccepted={isAccepted}
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

                        {/* For not accepted proposals */}
                    </Box>

                    <Box>
                        {isAccepted ? (
                            <>
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

                                    <Button
                                        colorScheme="orange"
                                        disabled={!message.length}
                                        flexGrow={{ base: 1, md: 0 }}
                                        ml={4}
                                        onClick={handleChange}
                                    >
                                        Wyślij
                                    </Button>
                                </Flex>
                            </>
                        ) : (
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
                            </Flex>
                        )}
                    </Box>
                </>
            )}
        </Main>
    );
};
