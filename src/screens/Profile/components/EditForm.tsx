import React from 'react';

import { IUser } from '@models/user';

import { AspectRatio, Box, Button, Flex, Textarea, Text, Input, IconButton, Image } from '@chakra-ui/react';
import { EditIcon } from '@theme/customIcons';
import ModalFrame from '@components/ModalFrame';

export interface IProps extends IUser {
    someField?: boolean;
}

const EditForm: React.FC<IProps> = ({
    avatar,
    birthYear,
    description,
    email,
    firstName,
    lastName,
    shortDescription,
    username,
}) => {
    return (
        <Box d={{ base: 'block', md: 'flex' }}>
            <Box mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }} mx={{ base: 'auto' }} w={300} maxW="100%">
                <Box pos="relative">
                    <AspectRatio maxW="100%" mb={{ base: 4, md: 8 }} ration={1}>
                        <Image
                            alt="Jan Baraban"
                            borderRadius={6}
                            objectFit="cover"
                            src={avatar}
                            fallbackSrc="https://via.placeholder.com/300"
                        />
                    </AspectRatio>
                    <IconButton
                        aria-label="Edit"
                        d="flex"
                        fontSize={20}
                        size="sm"
                        icon={<EditIcon color="gray.800" />}
                        pos="absolute"
                        top={2}
                        right={2}
                    />
                </Box>

                <ModalFrame
                    actionTitle="Zapisz hasło"
                    buttonProps={{
                        bgColor: 'gray.800',
                        d: { base: 'none', md: 'block' },
                        color: 'white',
                        w: '100%',
                        mb: { base: 4, md: 8 },
                        variant: 'solid',
                        _active: { bgColor: 'gray.800' },
                        _hover: { bgColor: 'gray.600' },
                    }}
                    modalTitle="Zmiana hasła"
                    size="lg"
                    triggerTitle="Zmień hasło"
                    onAction={() => {
                        console.log(1);
                    }}
                >
                    <>
                        <Box mb={{ base: 4, md: 8 }}>
                            <Input
                                // borderColor={errors.username ? 'tomato' : 'gray.200'}
                                // borderWidth={errors.username ? 1 : 0}
                                // ref={register}
                                bgColor="white"
                                borderWidth={0}
                                name="username"
                                placeholder="Podaj nowe hasło"
                                shadow="base"
                                size="lg"
                                type="text"
                            />
                            {/* {errors.username && (
                    <Text color="tomato" fontSize={15}>
                        {errors.username.message}
                    </Text>
                )} */}
                        </Box>
                        <Box>
                            <Input
                                // borderColor={errors.username ? 'tomato' : 'gray.200'}
                                // borderWidth={errors.username ? 1 : 0}
                                borderWidth={0}
                                bgColor="white"
                                name="username"
                                // ref={register}
                                type="text"
                                size="lg"
                                shadow="base"
                                placeholder="Powtórz nowe hasło"
                            />
                            {/* {errors.username && (
                    <Text color="tomato" fontSize={15}>
                        {errors.username.message}
                    </Text>
                )} */}
                        </Box>
                    </>
                </ModalFrame>

                <ModalFrame
                    actionTitle="Tak, usuń"
                    buttonProps={{
                        d: { base: 'none', md: 'block' },
                        colorScheme: 'red',
                        variant: 'link',
                        fontWeight: 300,
                    }}
                    modalTitle="Usuwanie konta"
                    triggerTitle="Usuń konto"
                    onAction={() => {
                        console.log(1);
                    }}
                >
                    <Text>Czy napawne checesz usunąć swoje konto?</Text>
                </ModalFrame>
            </Box>

            <Box flexGrow={1}>
                <Box mb={{ base: 4, md: 8 }}>
                    <Input
                        // borderColor={errors.username ? 'tomato' : 'gray.200'}
                        // borderWidth={errors.username ? 1 : 0}
                        // ref={register}
                        bgColor="white"
                        borderWidth={0}
                        name="username"
                        placeholder="Nazwa użytkownika"
                        shadow="base"
                        size="lg"
                        type="text"
                        value={username}
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
                        // ref={register}
                        borderWidth={0}
                        name="email"
                        placeholder="Email"
                        shadow="base"
                        size="lg"
                        type="text"
                        value={email}
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
                        // ref={register}
                        borderWidth={0}
                        name="yearOfBirth"
                        placeholder="Rok urodzenia"
                        shadow="base"
                        size="lg"
                        type="text"
                        value={birthYear}
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
                        // ref={register}
                        borderWidth={0}
                        name="name"
                        placeholder="Imię"
                        shadow="base"
                        size="lg"
                        type="text"
                        value={firstName || ''}
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
                        // ref={register}
                        borderWidth={0}
                        name="surname"
                        placeholder="Nazwisko"
                        shadow="base"
                        size="lg"
                        type="text"
                        value={lastName || ''}
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
                        // ref={register}
                        borderWidth={0}
                        h={20}
                        name="shortDescription"
                        placeholder="Krótki opis"
                        resize="none"
                        shadow="base"
                        size="lg"
                        type="text"
                        value={shortDescription || ''}
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
                        // ref={register}
                        borderWidth={0}
                        h={40}
                        name="surname"
                        placeholder="O mnie"
                        resize="none"
                        shadow="base"
                        size="lg"
                        type="text"
                        value={description || ''}
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
                        bgColor="gray.800"
                        color="white"
                        w="100%"
                        variant="solid"
                        mb={{ base: 4, md: 0 }}
                        _active={{ bgColor: 'gray.800' }}
                        _hover={{ bgColor: 'gray.600' }}
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
