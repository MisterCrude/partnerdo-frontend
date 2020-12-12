import React from 'react';

import { AspectRatio, Box, Button, Textarea, Input, IconButton, Image, Flex } from '@chakra-ui/react';
import { EditIcon } from '@theme/customIcons';

const EditForm: React.FC = () => {
    return (
        <Box d={{ base: 'block', md: 'flex' }}>
            <Box mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }} mx={{ base: 'auto' }} w={300} maxW="100%">
                <Box position="relative">
                    <AspectRatio maxW="100%" mb={{ base: 4, md: 8 }} ration={1}>
                        <Image
                            alt="Jan Baraban"
                            borderRadius={6}
                            objectFit="cover"
                            src="https://bit.ly/sage-adebayo"
                            fallbackSrc="https://via.placeholder.com/300"
                        />
                    </AspectRatio>
                    <IconButton
                        aria-label="Edit"
                        d="flex"
                        backgroundColor="gray.800"
                        fontSize={20}
                        size="sm"
                        icon={<EditIcon color="white" />}
                        position="absolute"
                        top={2}
                        right={2}
                        _active={{ backgroundColor: 'gray.800' }}
                        _hover={{ backgroundColor: 'gray.600' }}
                    />
                </Box>

                <Button
                    backgroundColor="gray.800"
                    d={{ base: 'none', md: 'block' }}
                    color="white"
                    w="100%"
                    mb={{ base: 4, md: 8 }}
                    variant="solid"
                    _active={{ backgroundColor: 'gray.800' }}
                    _hover={{ backgroundColor: 'gray.600' }}
                >
                    Zmień hasło
                </Button>

                <Button d={{ base: 'none', md: 'block' }} colorScheme="red" variant="link" fontWeight={300}>
                    Usuń konto
                </Button>
            </Box>
            <Box flexGrow={1}>
                <Box mb={{ base: 4, md: 8 }}>
                    <Input
                        // borderColor={errors.username ? 'tomato' : 'gray.200'}
                        // borderWidth={errors.username ? 1 : 0}
                        borderWidth={0}
                        backgroundColor="white"
                        name="username"
                        // ref={register}
                        type="text"
                        size="lg"
                        shadow="base"
                        placeholder="Nazwa użytkownika"
                    />
                    {/* {errors.username && (
                    <Text color="tomato" fontSize={15}>
                        {errors.username.message}
                    </Text>
                )} */}
                </Box>
                <Box mb={{ base: 4, md: 8 }}>
                    <Input
                        // borderColor={errors.username ? 'tomato' : 'gray.200'}
                        // borderWidth={errors.username ? 1 : 0}
                        borderWidth={0}
                        name="email"
                        // ref={register}
                        type="text"
                        placeholder="Email *"
                        size="lg"
                        shadow="base"
                    />
                    {/* {errors.email && (
                    <Text color="tomato" fontSize={15}>
                        {errors.email.message}
                    </Text>
                )} */}
                </Box>
                <Box mb={{ base: 4, md: 8 }}>
                    <Input
                        // borderColor={errors.username ? 'tomato' : 'gray.200'}
                        // borderWidth={errors.username ? 1 : 0}
                        borderWidth={0}
                        name="name"
                        // ref={register}
                        type="text"
                        placeholder="Imię"
                        size="lg"
                        shadow="base"
                    />
                    {/* {errors.email && (
                    <Text color="tomato" fontSize={15}>
                        {errors.email.message}
                    </Text>
                )} */}
                </Box>
                <Box mb={{ base: 4, md: 8 }}>
                    <Input
                        // borderColor={errors.username ? 'tomato' : 'gray.200'}
                        // borderWidth={errors.username ? 1 : 0}
                        borderWidth={0}
                        name="surname"
                        // ref={register}
                        type="text"
                        placeholder="Nazwisko"
                        size="lg"
                        shadow="base"
                    />
                    {/* {errors.email && (
                    <Text color="tomato" fontSize={15}>
                        {errors.email.message}
                    </Text>
                )} */}
                </Box>
                <Box mb={{ base: 4, md: 8 }}>
                    <Textarea
                        // borderColor={errors.username ? 'tomato' : 'gray.200'}
                        // borderWidth={errors.username ? 1 : 0}
                        borderWidth={0}
                        h={40}
                        name="surname"
                        // ref={register}
                        resize="none"
                        type="text"
                        placeholder="O mnie"
                        size="lg"
                        shadow="base"
                    />
                    {/* {errors.email && (
                    <Text color="tomato" fontSize={15}>
                        {errors.email.message}
                    </Text>
                )} */}
                </Box>
                <Flex direction={{ base: 'column', md: 'row' }} justify={{ base: 'space-between', md: 'flex-end' }}>
                    <Button colorScheme="orange" mb={{ base: 4, md: 0 }}>
                        Zapisz zmiany
                    </Button>
                    <Button
                        d={{ base: 'block', md: 'none' }}
                        backgroundColor="gray.800"
                        color="white"
                        w="100%"
                        variant="solid"
                        mb={{ base: 4, md: 0 }}
                        _active={{ backgroundColor: 'gray.800' }}
                        _hover={{ backgroundColor: 'gray.600' }}
                    >
                        Zmień hasło
                    </Button>
                    <Button
                        colorScheme="red"
                        d={{ base: 'block', md: 'none' }}
                        fontWeight={300}
                        height={10}
                        variant="link"
                    >
                        Usuń konto
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default EditForm;
