import React from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useSelector } from 'react-redux';

import useDispatch from '@hooks/useDispatch';
import { loginUserAsync, getIsFetching } from '@slices/userSlice';

import { Button, Container, Divider, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { FacebookIcon } from '@theme/customIcons';
import Main from '@layouts/Main';
import LoginForm from './components/LoginForm';

interface ILoginUserParams {
    credentials: Record<string, unknown>;
    history: History;
}

export const Login: React.FC = () => {
    const history = useHistory();
    const sendForm = useDispatch<ILoginUserParams>(loginUserAsync);
    const isFetching = useSelector(getIsFetching);

    const handleSendForm = (credentials: Record<string, unknown>) => sendForm({ credentials, history });

    return (
        <Main>
            <Container as="section" flexGrow={1} my={20} px={8} maxW="xl">
                <Heading align="center" mb={10}>
                    Zaloguj się
                </Heading>
                <Button colorScheme="blue" width="100%" size="lg" rightIcon={<FacebookIcon />}>
                    Przez facebook
                </Button>

                <Flex align="center" my={8}>
                    <Divider />
                    <Text px={4}>lub</Text>
                    <Divider />
                </Flex>

                <LoginForm onSubmit={handleSendForm} isFetching={isFetching} />

                <Link>Przypomnij hasło</Link>
            </Container>
        </Main>
    );
};
