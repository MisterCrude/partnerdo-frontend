import React from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useSelector } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';
import useDispatch from '@hooks/useDispatch';
import { loginUserAsync, getIsFetching } from '@slices/userSlice';
import { ROUTES } from '@config/app';

import { Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { FacebookIcon } from '@theme/customIcons';
import Main from '@layouts/Main';
import LoginForm from './components/LoginForm';

interface ILoginUserParams {
    credentials: Record<string, unknown>;
    history: History;
}

export const Login: React.FC = () => {
    const history = useHistory();
    const submitForm = useDispatch<ILoginUserParams>(loginUserAsync);
    const isFetching = useSelector(getIsFetching);

    const handleSubmitForm = (credentials: Record<string, unknown>) => submitForm({ credentials, history });

    return (
        <Main flexGrow={1} maxW="xl">
            <Heading align="center" mb={10}>
                Zaloguj się
            </Heading>
            <Button colorScheme="blue" width="100%" size="lg" shadow="base" rightIcon={<FacebookIcon />}>
                Przez facebook
            </Button>

            <Flex align="center" my={8}>
                <Divider />
                <Text px={4}>lub</Text>
                <Divider />
            </Flex>

            <LoginForm onSubmit={handleSubmitForm} isFetching={isFetching} />

            <RouterLink to={ROUTES.REMIND_PASSWORD}>Przypomnij hasło</RouterLink>
        </Main>
    );
};
