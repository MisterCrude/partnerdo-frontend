import React from 'react';

import Main from '@layouts/Main';
import useDispatch from '@hooks/dispatch';
import { userLoginAsync } from '@slices/userSlice';
import { Button, Container, Divider, Flex, Heading, Input, Link, Text } from '@chakra-ui/core';
import { FacebookIcon } from '@theme/customIcons';
import PasswordField from '@components/PasswordField';

export const Login: React.FC = () => {
    const handleSendForm = useDispatch(userLoginAsync);

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

                <Input mb={{ base: 4, md: 8 }} type="email" size="lg" placeholder="email" />
                <PasswordField placeholder="hasło" />

                <Button
                    backgroundColor="gray.800"
                    color="white"
                    onClick={() =>
                        handleSendForm({
                            password: 'admin',
                            username: 'admin',
                        })
                    }
                    variant="solid"
                    width="100%"
                    size="lg"
                    mb={4}
                    _active={{ backgroundColor: 'gray.900' }}
                    _hover={{ backgroundColor: 'gray.600' }}
                >
                    Zaloguj się
                </Button>

                <Link>Przypomnij hasło</Link>
            </Container>
        </Main>
    );
};
