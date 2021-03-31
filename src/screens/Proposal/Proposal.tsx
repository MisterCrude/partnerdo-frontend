import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { ROUTES } from '@consts/routes';

import { AspectRatio, Box, Button, Divider, Flex, Heading, Image, Stack, Tag, Textarea, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { CalendarIcon, LocationIcon } from '@theme/customIcons';
import Breadcrumbs from '@components/Breadcrumbs';
import Main from '@layouts/Main';
import ModalFrame from '@components/ModalFrame';

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
                crumbs={[{ title: isAuth ? 'Strona główna' : 'Lista partnerstw', link: ROUTES.PROPOSALS }]}
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

                <Divider d={{ base: 'block', md: 'none' }} />

                <Box>
                    <Heading as="h2" size="lg" mb={2}>
                        Poszukuję partnera do głębokiego lenistwa
                    </Heading>
                    <Box color="gray.500">
                        <LocationIcon mr={1} pos="relative" top="-1px" /> Warszawa, Bemowo
                    </Box>
                    <Box color="gray.500" fontSize="sm" mb={2}>
                        <CalendarIcon mr={1} mt={-1} fontSize="md" /> 01.12.2020
                    </Box>
                    <Tag borderRadius="full" bgColor="orange.500" px={4} variant="solid">
                        Sport
                    </Tag>
                </Box>
            </Stack>

            <Box flexGrow={1}>
                <Text mb={6}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium repellat, laudantium officia
                    facere nesciunt eum dicta sint vel neque placeat saepe mollitia iste at harum corporis eaque
                    voluptatibus accusantium culpa. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dignissimos nobis ea odio nesciunt perspiciatis, repellendus similique, optio assumenda ducimus non
                    veritatis, fugiat at repudiandae modi sapiente corrupti facere tempora iusto. Lorem ipsum dolor sit,
                    amet consectetur adipisic
                </Text>

                <Flex align={{ base: 'stretch', md: 'center' }} justify="space-between">
                    <Button
                        onClick={handleBack}
                        flexGrow={{ base: 1, md: 0 }}
                        mr={4}
                        variant="unstyled"
                        leftIcon={<ChevronLeftIcon />}
                    >
                        Wróć
                    </Button>

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
                                    h={72}
                                    name="surname"
                                    mb={1}
                                    // ref={register}
                                    resize="none"
                                    type="text"
                                    placeholder="Twoja odpowiedź"
                                    size="lg"
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
