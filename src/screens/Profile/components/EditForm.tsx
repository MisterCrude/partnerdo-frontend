import React, { useState, ChangeEvent } from 'react';
import { isEqual, omit } from 'lodash/fp';
import { useForm } from 'react-hook-form';
import { useMount, useUpdateEffect } from 'react-use';
import * as yup from 'yup';
import { ACCEPTED_UPLOAD_IMAGE_FORMAT } from '@consts/app';
import { IProfile } from '@models/profile';
import { RequestStatus } from '@models/misc';
import { yupResolver } from '@hookform/resolvers/yup';

import { AspectRatio, Box, Button, Flex, Textarea, Text, Input, IconButton, Image } from '@chakra-ui/react';
import { EditIcon } from '@theme/customIcons';
import { FormErrorMessage } from '@components/Form';
import ModalFrame from '@components/ModalFrame';

const currentYear = new Date().getFullYear();

export interface IInputs {
    avatar: FileList;
    username: string;
    email: string;
    birthYear: string;
    firstName: string;
    lastName: string;
    description: string;
}

interface IProps {
    formData: IProfile;
    requestStatus: RequestStatus;
    onSubmit: (formData: IInputs) => void;
}

const validationSchema = yup.object().shape({
    username: yup.string().required('To pole jest wymagane'),
    birthYear: yup
        .number()
        .typeError('To pole jest wymagane')
        .required('To pole jest wymagane')
        .min(currentYear - 100, 'Nie poprawny rok urodzenia')
        .max(currentYear, 'Nie poprawny rok urodzenia'),
    firstName: yup.string().max(100, 'To pole jest wymagane'),
    lastName: yup.string().max(100, 'To pole jest wymagane'),
    description: yup.string().required('To pole jest wymagane').max(100, 'To pole jest wymagane'),
});

const EditForm: React.FC<IProps> = ({ formData, requestStatus, onSubmit }) => {
    const [isReceivingData, setIsReceivingData] = useState(false);
    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<IInputs>({
        resolver: yupResolver(validationSchema),
    });

    const { username, lastName, firstName, birthYear, description, email, avatar } = formData;

    const handleClickSave = () => {
        setIsReceivingData(true);
    };

    const handleChange = () => {
        const defaultData = omit(['id', 'avatar', 'email', 'gender'], {
            ...formData,
            birthYear: `${formData.birthYear}`,
        });
        const providedData = omit(['avatar'], getValues());
        const isSomeFieldChanged = !isEqual(providedData, defaultData);

        setIsDisabledSubmit(!isSomeFieldChanged);
    };

    const handleChangeAvatar = () => {
        setIsDisabledSubmit(false);
    };

    const isFetching = requestStatus === RequestStatus.FETCHING;
    const showSkeleton = isFetching && !isReceivingData;

    useUpdateEffect(() => {
        setIsDisabledSubmit(true);
    }, [formData]);

    return (
        <>
            {showSkeleton ? (
                <>Skeleton</>
            ) : (
                <Box as="form" d={{ base: 'block', md: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
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
                            <Input
                                accept={ACCEPTED_UPLOAD_IMAGE_FORMAT}
                                name="avatar"
                                ref={register}
                                type="file"
                                onChange={handleChangeAvatar}
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
                                        borderColor={errors.username ? 'tomato' : 'gray.200'}
                                        bgColor="white"
                                        name="username"
                                        placeholder="Podaj nowe hasło"
                                        size="lg"
                                        type="text"
                                    />
                                    {/* <FormErrorMessage name="username" errors={errors} /> */}
                                </Box>
                                <Box>
                                    <Input
                                        // borderColor={errors.username ? 'tomato' : 'gray.200'}
                                        // borderWidth={errors.username ? 1 : 0}
                                        bgColor="white"
                                        name="username"
                                        // ref={register}
                                        type="text"
                                        size="lg"
                                        placeholder="Powtórz nowe hasło"
                                    />
                                    {/* <FormErrorMessage name="username" errors={errors} /> */}
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
                                bgColor="white"
                                borderColor={errors.username ? 'tomato' : 'gray.200'}
                                defaultValue={username}
                                name="username"
                                placeholder="Nazwa użytkownika"
                                ref={register}
                                size="lg"
                                type="text"
                                onChange={handleChange}
                            />
                            <FormErrorMessage name="username" errors={errors} />
                        </Box>
                        <Box mb={{ base: 4, md: 8 }}>
                            <Input disabled name="email" placeholder="Email" size="lg" type="text" value={email} />
                            {/* <FormErrorMessage name="username" errors={errors} /> */}
                        </Box>
                        <Box mb={{ base: 4, md: 8 }}>
                            <Input
                                borderColor={errors.birthYear ? 'tomato' : 'gray.200'}
                                defaultValue={birthYear}
                                name="birthYear"
                                placeholder="Rok urodzenia"
                                ref={register}
                                size="lg"
                                type="number"
                                onChange={handleChange}
                            />
                            <FormErrorMessage name="birthYear" errors={errors} />
                        </Box>
                        <Box mb={{ base: 4, md: 8 }}>
                            <Input
                                borderColor={errors.firstName ? 'tomato' : 'gray.200'}
                                defaultValue={firstName}
                                name="firstName"
                                placeholder="Imię"
                                ref={register}
                                size="lg"
                                type="text"
                                onChange={handleChange}
                            />
                            <FormErrorMessage name="firstName" errors={errors} />
                        </Box>
                        <Box mb={{ base: 4, md: 8 }}>
                            <Input
                                borderColor={errors.lastName ? 'tomato' : 'gray.200'}
                                defaultValue={lastName}
                                name="lastName"
                                placeholder="Nazwisko"
                                ref={register}
                                size="lg"
                                type="text"
                                onChange={handleChange}
                            />
                            <FormErrorMessage name="lastName" errors={errors} />
                        </Box>
                        <Box mb={{ base: 4, md: 8 }}>
                            <Textarea
                                borderColor={errors.description ? 'tomato' : 'gray.200'}
                                defaultValue={description}
                                h={40}
                                name="description"
                                placeholder="O mnie"
                                ref={register}
                                resize="none"
                                size="lg"
                                type="text"
                                onChange={handleChange}
                            />
                            <FormErrorMessage name="description" errors={errors} />
                        </Box>
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            justify={{ base: 'space-between', md: 'flex-end' }}
                        >
                            <Button
                                colorScheme="orange"
                                disabled={isDisabledSubmit}
                                isLoading={isFetching}
                                mb={{ base: 4, md: 0 }}
                                type="submit"
                                onClick={handleClickSave}
                            >
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
            )}
        </>
    );
};

export default EditForm;
