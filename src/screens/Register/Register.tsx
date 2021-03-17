import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useDispatch from '@hooks/useDispatch';
import { registerProfileAsync, getRequestStatusSelector } from '@slices/profileSlice';

import { Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { FacebookIcon } from '@theme/customIcons';
import Main from '@layouts/Main';
import RegisterFrom from './components/RegisterForm';

// TODO add IRegisterProfileParams to useDispatch
// interface IRegisterProfileParams {
//     credentials: Record<string, unknown>;
//     history: History;
// }

export const Register: React.FC = () => {
    const submitForm = useDispatch(registerProfileAsync);
    const history = useHistory();
    const requestStatus = useSelector(getRequestStatusSelector);

    const handleSubmitForm = (credentials: Record<string, unknown>) => submitForm({ credentials, history });

    return (
        <Main flexGrow={1} maxW="xl" my={20}>
            <Heading align="center" mb={10}>
                Zarejestruj się
            </Heading>
            <Button colorScheme="blue" width="100%" size="lg" shadow="base" rightIcon={<FacebookIcon />}>
                Przez facebook
            </Button>

            <Flex align="center" my={8}>
                <Divider />
                <Text px={4}>lub</Text>
                <Divider />
            </Flex>

            <RegisterFrom onSubmit={handleSubmitForm} requestStatus={requestStatus} />

            <Text fontSize="sm" color="gray.500">
                <Text as="span" color="tomato" mr={1}>
                    *
                </Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda id sit nihil obcaecati fugit nisi
                mollitia iusto tempora quasi, sed recusandae, et dolor est harum inventore dolore eius laudantium iste.
            </Text>
        </Main>
    );
};
