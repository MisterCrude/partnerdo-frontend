import React, { useState, ChangeEvent } from 'react';
import { ACCEPTED_UPLOAD_IMAGE_FORMAT, AVATAR_FALLBACK_URL } from '@consts/app';
import { useUpdateEffect } from 'react-use';

import { Box, AspectRatio, Image, IconButton, Button, Text, Flex } from '@chakra-ui/react';
import { DeleteIcon, CloseIcon } from '@theme/customIcons';

export enum AvatarState {
    IDLE = 'idle',
    ADDED = 'added',
    DELETED = 'deleted',
}

export interface IAvatarInput {
    state: AvatarState;
    file: File;
    fileUrl: string;
}

interface IProps {
    avatarUrl: string;
    onChange: (avatarInput: IAvatarInput) => void;
}

const avatarFileInit = {
    state: AvatarState.IDLE,
    file: {} as File,
    fileUrl: '',
};

const AvatarInput: React.FC<IProps> = ({ avatarUrl, onChange }) => {
    const [avatarFile, setAvatarFile] = useState<IAvatarInput>(avatarFileInit);

    const isIdle = avatarFile.state === AvatarState.IDLE;
    const isAdded = avatarFile.state === AvatarState.ADDED;
    const isDeleted = avatarFile.state === AvatarState.DELETED;

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement & { files: FileList }>) => {
        if (target.files.length) {
            setAvatarFile({
                state: AvatarState.ADDED,
                file: target.files[0],
                fileUrl: URL.createObjectURL(target.files[0]),
            });
        } else {
            setAvatarFile(avatarFileInit);
        }
    };

    const handleClear = () => {
        setAvatarFile(avatarFileInit);
    };

    const handleDelete = () => {
        setAvatarFile({ ...avatarFileInit, state: AvatarState.DELETED });
    };

    const getAvatarPreview = () => {
        if (isIdle) return avatarUrl;
        if (isAdded) return avatarFile.fileUrl;
        return '';
    };

    useUpdateEffect(() => {
        onChange(avatarFile);
    }, [avatarFile]);

    useUpdateEffect(() => {
        if (avatarUrl || avatarUrl === '') {
            handleClear();
        }
    }, [avatarUrl]);

    return (
        <Box pos="relative">
            <AspectRatio maxW="100%" mb={{ base: 4, md: 8 }} ration={1}>
                <Image
                    alt="Jan Baraban"
                    borderRadius={6}
                    fallbackSrc={AVATAR_FALLBACK_URL}
                    objectFit="cover"
                    src={getAvatarPreview()}
                />
            </AspectRatio>

            {isIdle && avatarUrl && (
                <IconButton
                    aria-label="Delete"
                    colorScheme="orange"
                    d="flex"
                    fontSize={20}
                    icon={<DeleteIcon color="white" />}
                    pos="absolute"
                    right={2}
                    size="sm"
                    top={2}
                    onClick={handleDelete}
                />
            )}

            {(isAdded || isDeleted) && (
                <Flex align="center" mb={3}>
                    {isAdded && <Text wordBreak="break-word">{avatarFile.file.name}</Text>}
                    {isDeleted && <Text wordBreak="break-word">Avatar zostanie usunięty</Text>}
                    <IconButton
                        aria-label="remove-avatar"
                        h={6}
                        isRound
                        minH={6}
                        minW={6}
                        ml={2}
                        variant="ghost"
                        w={6}
                        onClick={handleClear}
                    >
                        <CloseIcon fontSize={22} color="red.500" />
                    </IconButton>
                </Flex>
            )}

            <Button p={0} pos="relative" w="100%" mb={4}>
                <Box textAlign="center" as="span" px={4}>
                    Zmień avatar
                </Box>
                <Box
                    accept={ACCEPTED_UPLOAD_IMAGE_FORMAT}
                    as="input"
                    opacity={0}
                    pos="absolute"
                    cursor="pointer"
                    height="100%"
                    name="avatar"
                    type="file"
                    w="100%"
                    onChange={handleChange}
                />
            </Button>
        </Box>
    );
};

export default AvatarInput;
