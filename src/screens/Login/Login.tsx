import React from 'react';

import useDispatch from '@hooks/dispatch';
import { loginUserAsync } from '@slices/userSlice';

import { Button, Container, Divider, Flex, Heading, Link, Text } from '@chakra-ui/core';
import { FacebookIcon } from '@theme/customIcons';
import Main from '@layouts/Main';
import LoginForm from './components/LoginForm';

export const Login: React.FC = () => {
    const handleSendForm = useDispatch(loginUserAsync);

    return (
        <Main>
            <Container my={20} px={8}>
                <Heading align="center" mb={10}>
                    Zaloguj się
                </Heading>
                <Button colorScheme="blue" width="100%" size="lg" rightIcon={<FacebookIcon />}>
                    Przez facebook
                </Button>

                <Flex align="center" my={8}>
                    <Divider />
                    <Text px={4}>lub </Text>
                    <Divider />
                </Flex>

                <LoginForm onSubmit={handleSendForm} />

                <Link>Przypomnij hasło</Link>
            </Container>
        </Main>
    );
};
