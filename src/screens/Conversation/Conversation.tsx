import React, { useRef, useState } from 'react';
import { useMount } from 'react-use';
import { DEFAULT_LOCALE } from '@consts/app';
import { ROUTES } from '@consts/routes';
import { toLocaleDateString, toLocaleTimeString } from '@utils/convert';

import { Button, Box, Flex, Textarea, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';
import Message from './components/Message';
import Proposal from './components/Proposal';

export const Conversation: React.FC = () => {
    const ws = useRef<WebSocket>();
    const [isAccepted, setIsAccepted] = useState(false);
    const history = useHistory();
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

            <Proposal />

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
                        author="Jan Baraban"
                        message="Siema sdsdSiema sdsd sdSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf ad sdsd sd asd sdsd sdsdadfa dfadfadfadf ad sdsd sd asd sdsd sdsdadfa dfadfadfadf ad sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadf asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadf sd asdsdsdssd"
                        sentTime="14:30 20.12.2020"
                    />

                    {messagesList.map(({ message, username, created }, index) => (
                        <Message
                            key={index}
                            isAccepted={isAccepted}
                            onApprove={handleAccept}
                            onReject={() => null}
                            author={username}
                            message={message}
                            sentTime={`${toLocaleDateString(created, DEFAULT_LOCALE)}, ${toLocaleTimeString(
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
        </Main>
    );
};
