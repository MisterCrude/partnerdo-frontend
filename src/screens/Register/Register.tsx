import React from 'react';

import { Button, Container, Divider, Flex, Heading, Text } from '@chakra-ui/core';
import { FacebookIcon } from '@theme/customIcons';
import Main from '@layouts/Main';
import RegisterFrom from './components/RegisterForm';

export const Register: React.FC = () => {
    const handleSendForm = (data: Record<string, unknown>) => console.log(data);

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
