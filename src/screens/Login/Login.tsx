import React from 'react';
import { History } from 'history';
import { loginProfileAsync, getRequestStatusSelector } from '@slices/profileSlice';
import { ROUTES } from '@consts/routes';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useDispatch from '@hooks/useDispatch';

import { Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { FacebookIcon } from '@theme/customIcons';
import LoginForm, { IInputs } from './components/LoginForm';
import Main from '@layouts/Main';

interface ILoginProfileParams {
    credentials: IInputs;
    history: History;
}

export const Login: React.FC = () => {
    const history = useHistory();
    const submitForm = useDispatch<ILoginProfileParams>(loginProfileAsync);
    const requestStatus = useSelector(getRequestStatusSelector);

    const handleSubmitForm = (credentials: IInputs) => submitForm({ credentials, history });

    return (
        <Main flexGrow={1} maxW="xl" my={20}>
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

            <LoginForm onSubmit={handleSubmitForm} requestStatus={requestStatus} />

            <RouterLink to={ROUTES.REMIND_PASSWORD}>Przypomnij hasło</RouterLink>
        </Main>
    );
};
