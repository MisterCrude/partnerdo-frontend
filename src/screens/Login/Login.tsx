import React from 'react';

import Main from '@layouts/Main';
import { Box, Button, Container, Divider, Flex, Heading, Input, Link, Text } from '@chakra-ui/core';
import { FacebookIcon } from '@theme/customIcons';

export const Login: React.FC = () => {
    return (
        <Main>
            <Container my={20}>
                <Heading align="center" mb={10}>
                    Zaloguj się
                </Heading>
                <Button
                    colorScheme="blue"
                    width="100%"
                    // backgroundColor="gray.800"
                    // color="white"
                    // variant="solid"
                    // _active={{ backgroundColor: 'gray.900' }}
                    // _hover={{ backgroundColor: 'gray.600' }}
                    size="lg"
                    rightIcon={<FacebookIcon />}
                >
                    Przez facebook
                </Button>

                <Flex align="center" my={8}>
                    <Divider />
                    <Text px={2}>lub </Text>
                    <Divider />
                </Flex>

                <Input mb={8} type="email" size="lg" placeholder="email" />
                <Input mb={8} type="password" size="lg" placeholder="hasło" />

                <Button
                    backgroundColor="gray.800"
                    color="white"
                    variant="solid"
                    width="100%"
                    size="lg"
                    mb={4}
                    _active={{ backgroundColor: 'gray.900' }}
                    _hover={{ backgroundColor: 'gray.600' }}
                >
                    Zaloguj się
                </Button>

                <Box mb={8}>
                    <Link>Przypominj hasło</Link>
                </Box>

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
