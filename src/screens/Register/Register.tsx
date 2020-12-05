import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useDispatch from '@hooks/useDispatch';
import { registerUserAsync, getIsFetching } from '@slices/userSlice';

import { Button, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { FacebookIcon } from '@theme/customIcons';
import Main from '@layouts/Main';
import RegisterFrom from './components/RegisterForm';

export const Register: React.FC = () => {
    const sendForm = useDispatch(registerUserAsync);
    const history = useHistory();
    const isFetching = useSelector(getIsFetching);

    const handleSendForm = (credentials: Record<string, unknown>) => sendForm({ credentials, history });

    return (
        <Main>
            <Container as="section" flexGrow={1} my={20} px={8} maxW="xl">
                <Heading align="center" mb={10}>
                    Zarejestruj się
                </Heading>
                <Button colorScheme="blue" width="100%" size="lg" rightIcon={<FacebookIcon />}>
                    Przez facebook
                </Button>

                <Flex align="center" my={8}>
                    <Divider />
                    <Text px={4}>lub</Text>
                    <Divider />
                </Flex>

                <RegisterFrom onSubmit={handleSendForm} isFetching={isFetching} />

                <Text fontSize="sm" color="gray.500">
                    <Text as="span" color="red.600" mr={1}>
                        *
                    </Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda id sit nihil obcaecati fugit
                    nisi mollitia iusto tempora quasi, sed recusandae, et dolor est harum inventore dolore eius
                    laudantium iste.
                </Text>
            </Container>
        </Main>
    );
};
