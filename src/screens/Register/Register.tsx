import React from 'react';

import { Button, Container, Divider, Flex, Heading, Input, Text } from '@chakra-ui/core';
import Main from '@layouts/Main';
import { FacebookIcon } from '@theme/customIcons';
import PasswordField from '@components/PasswordField';

export const Register: React.FC = () => {
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

                <Input mb={{ base: 4, md: 8 }} type="text" size="lg" placeholder="username" />
                <Input mb={{ base: 4, md: 8 }} type="email" size="lg" placeholder="email" />
                <PasswordField placeholder="hasło" />
                <PasswordField placeholder="powtórz hasło" />

                <Button
                    backgroundColor="gray.800"
                    color="white"
                    variant="solid"
                    width="100%"
                    size="lg"
                    mb={{ base: 4, md: 8 }}
                    _active={{ backgroundColor: 'gray.900' }}
                    _hover={{ backgroundColor: 'gray.600' }}
                >
                    Zarejestruj się
                </Button>

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
