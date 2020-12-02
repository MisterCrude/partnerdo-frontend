import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useDispatch from '@hooks/dispatch';
import { registerUserAsync } from '@slices/userSlice';
import { getAlert } from '@slices/alertSlice';
import { isEmpty } from 'lodash/fp';

import { Button, Container, Divider, Flex, Heading, Text, useToast } from '@chakra-ui/core';
import { FacebookIcon } from '@theme/customIcons';
import Main from '@layouts/Main';
import RegisterFrom from './components/RegisterForm';

export const Register: React.FC = () => {
    const history = useHistory();
    const toast = useToast();
    const sendForm = useDispatch(registerUserAsync);
    const alert = useSelector(getAlert, shallowEqual);

    const handleSendForm = (credentials: Record<string, unknown>) => sendForm({ credentials, history });

    useEffect(() => {
        if (!isEmpty(alert)) {
            toast({
                position: 'top-right',
                title: alert.title,
                description: alert.message,
                status: alert.status,
                duration: 3000,
                isClosable: true,
            });
        }
    }, [alert, toast]);

    return (
        <Main>
            <Container my={20} px={8}>
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

                <RegisterFrom onSubmit={handleSendForm} />

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
