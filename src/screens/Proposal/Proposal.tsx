import React from 'react';

import { ROUTES } from '@config/app';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { AspectRatio, Box, Button, Flex, Heading, Image, Stack, Tag, Textarea, Text } from '@chakra-ui/react';
import { CalendarIcon, LocationIcon } from '@theme/customIcons';
import ModalFrame from '@components/ModalFrame';
import Main from '@layouts/Main';
import Breadcrumbs from '@components/Breadcrumbs';

interface IProps {
    isAuth?: boolean;
}

export const Proposal: React.FC<IProps> = ({ isAuth = false }) => {
    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    };

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs
                crumbs={[{ title: 'Strona główna', link: ROUTES.BROWSER }]}
                current="Poszukuję partnera do głębokiego lenistwa"
                mb={8}
            />

            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8 }} mb={{ base: 4, md: 8 }}>
                <Box w={200} maxW="100%">
                    <AspectRatio maxW="100%" mb={3} ration={1}>
                        <Image
                            alt="Jan Baraban"
                            borderRadius={6}
                            objectFit="cover"
                            src="https://bit.ly/sage-adebayo"
                            fallbackSrc="https://via.placeholder.com/300"
                        />
                    </AspectRatio>
                    <Heading
                        size="md"
                        as={RouterLink}
                        to={`${ROUTES.USER_PROFILE}/some-user-id`}
                        mx={1}
                        _hover={{ textDecor: 'underline' }}
                    >
                        Jan baraban
                    </Heading>
                </Box>
                <Box>
                    <Heading as="h2" size="lg" mb={1}>
                        Poszukuję partnera do głębokiego lenistwa
                    </Heading>
                    <Box color="gray.500" mb={2}>
                        <LocationIcon mr={1} pos="relative" top="-1px" /> Warszawa, Bemowo
                    </Box>
                    <Tag borderRadius="full" bgColor="orange.500" px={4} variant="solid">
                        Sport
                    </Tag>
                </Box>
            </Stack>

            <Box flexGrow={1}>
                <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium repellat, laudantium officia
                    facere nesciunt eum dicta sint vel neque placeat saepe mollitia iste at harum corporis eaque
                    voluptatibus accusantium culpa. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dignissimos nobis ea odio nesciunt perspiciatis, repellendus similique, optio assumenda ducimus non
                    veritatis, fugiat at repudiandae modi sapiente corrupti facere tempora iusto. Lorem ipsum dolor sit,
                    amet consectetur adipisic
                </Text>

                <Flex justify="flex-end" my={4}>
                    <Box as="span" color="gray.500" fontSize="sm">
                        <CalendarIcon mr={1} mt={-1} fontSize="md" /> 01.12.2020
                    </Box>
                </Flex>

                <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between">
                    <Button onClick={handleBack}>Wróć</Button>

                    {isAuth ? (
                        <ModalFrame
                            actionTitle="Wyślij"
                            buttonProps={{
                                bgColor: 'gray.800',
                                color: 'white',
                                variant: 'solid',
                                _active: { bgColor: 'gray.800' },
                                _hover: { bgColor: 'gray.600' },
                            }}
                            modalTitle="Poszukuję partnera do głębokiego lenistwa"
                            onAction={() => {
                                console.log(1);
                            }}
                            size="5xl"
                            triggerTitle="Złóż ofertę"
                        >
                            <>
                                <Textarea
                                    borderWidth={0}
                                    h={72}
                                    name="surname"
                                    mb={1}
                                    // ref={register}
                                    resize="none"
                                    type="text"
                                    placeholder="Twoja odpowiedź"
                                    size="lg"
                                    shadow="base"
                                />
                            </>
                        </ModalFrame>
                    ) : (
                        <Button
                            as={RouterLink}
                            to={ROUTES.LOGIN}
                            bgColor="gray.800"
                            color="white"
                            variant="solid"
                            _active={{ bgColor: 'gray.800' }}
                            _hover={{ bgColor: 'gray.600' }}
                        >
                            Złóż ofertę
                        </Button>
                    )}
                </Flex>
            </Box>
        </Main>
    );
};
