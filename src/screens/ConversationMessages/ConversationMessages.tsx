import React from 'react';

import { ROUTES } from '@config/app';

import { Button, Box, Flex, Textarea, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import Main from '@layouts/Main';
import Breadcrumbs from '@components/Breadcrumbs';
import Message from './components/Message';
import Proposal from './components/Proposal';

export const ConversationMessages: React.FC = () => {
    const history = useHistory();

    const hangleBack = () => {
        history.goBack();
    };

    return (
        <Main d="flex" flexGrow={1} flexDir="column" mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs
                current="Poszukuję partnera do głębokiego lenistwa"
                crumbs={[
                    { title: 'Strona główna', link: ROUTES.HOME },
                    { title: 'Wiadomości', link: ROUTES.CONVERSATIONS },
                ]}
                mb={12}
            />

            <Proposal />

            <Box borderTopWidth={1} flexGrow={1} py={8}>
                <VStack spacing={8}>
                    <Message author="Jan Baraban" message="Siema sdsd sd asd" sentTime="14:30 20.12.20" />
                    <Message message="Siema sdsd sd asd" sentTime="14:30 20.12.20" />
                    <Message message="Siema sdsd sd asd" sentTime="14:30 20.12.20" />
                    <Message
                        author="Jan Baraban"
                        message="Siema sdsdSiema sdsd sdSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadf asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadf sd asdsdsdssd"
                        sentTime="14:30 20.12.20"
                    />
                    <Message
                        message="Siema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadfSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadfSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadfSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadfSiema sdsd sd asd sdsd sdsdadfa dfadfadfadf adf adf adfadf adfadf "
                        sentTime="14:30 20.12.20"
                    />
                </VStack>
            </Box>

            <Box>
                <Textarea
                    // borderColor={errors.username ? 'tomato' : 'gray.200'}
                    // borderWidth={errors.username ? 1 : 0}
                    borderWidth={0}
                    h={40}
                    name="surname"
                    // ref={register}
                    resize="none"
                    type="text"
                    mb={8}
                    placeholder="Wpisz swoją wiadomość"
                    shadow="base"
                />
                <Flex justifyContent={{ base: 'center', md: 'space-between' }}>
                    <Button onClick={hangleBack} flexGrow={{ base: 1, md: 0 }} mr={4}>
                        Wróć
                    </Button>
                    <Button colorScheme="orange" disabled flexGrow={{ base: 1, md: 0 }} ml={4}>
                        Wyślij
                    </Button>
                </Flex>
            </Box>
        </Main>
    );
};
