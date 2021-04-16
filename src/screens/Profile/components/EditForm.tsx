import React, { useState } from 'react';
import { isEqual, omit } from 'lodash/fp';
import { useForm } from 'react-hook-form';
import { useUpdateEffect, useMount } from 'react-use';
import * as yup from 'yup';
import { IProfile } from '@models/profile';
import { RequestStatus } from '@models/misc';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Button, Flex, Textarea, Text, Input } from '@chakra-ui/react';
import { FormErrorMessage } from '@components/Form';
import ModalFrame from '@components/ModalFrame';
import AvatarInput, { IAvatarInput, AvatarState } from './AvatarInput';

export interface IInputs {
    avatar: IAvatarInput;
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

const currentYear = new Date().getFullYear();

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
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isFormChanged, setIsFormChanged] = useState({
        avatar: false,
        inputs: false,
    });
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<IInputs>({
        resolver: yupResolver(validationSchema),
    });

    const { username, lastName, firstName, birthYear, description, email, avatar } = formData;

    const isDisableSubmit = !isFormChanged.avatar && !isFormChanged.inputs;
    const isFetching = requestStatus === RequestStatus.FETCHING;
    const showSkeleton = (isFetching || requestStatus === RequestStatus.IDLE) && !isFetchingData;
    const showError = requestStatus === RequestStatus.ERROR;

    const handleClickSave = () => {
        setIsFetchingData(true);
    };

    const handleChange = () => {
        const defaultData = omit(['id', 'avatar', 'email', 'gender'], {
            ...formData,
            birthYear: `${formData.birthYear}`,
        });
        const userData = omit(['avatar'], getValues());
        const isFieldsEqual = isEqual(userData, defaultData);

        setIsFormChanged((prevState) => ({ ...prevState, inputs: !isFieldsEqual }));
    };

    const handleChangeAvatar = (avatarInput: IAvatarInput) => {
        const isAvatarChanged = avatarInput.state !== AvatarState.IDLE;

        setIsFormChanged((prevState) => ({ ...prevState, avatar: isAvatarChanged }));
        setValue('avatar', avatarInput);
    };

    useUpdateEffect(() => {
        setIsFormChanged({
            avatar: false,
            inputs: false,
        });
    }, [formData]);

    useMount(() => {
        register('avatar');
    });

    return (
        <>
            {showError && <>Error</>}
            {showSkeleton && !showError ? (
                <>Skeleton</>
            ) : (
                <Box as="form" d={{ base: 'block', md: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
                    <Box mr={{ base: 0, md: 8 }} mb={{ base: 8, md: 0 }} mx={{ base: 'auto' }} w={300} maxW="100%">
                        <AvatarInput avatarUrl={avatar} onChange={handleChangeAvatar} />
                        <FormErrorMessage name="username" errors={errors} />

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
                                disabled={isDisableSubmit}
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

            {/* )} */}
        </>
    );
};

export default EditForm;
