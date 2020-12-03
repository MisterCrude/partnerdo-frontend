import React from 'react';

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface IProps {
    avatarUrl: string;
    name: string;
    slogan: string;
}

export const UserBadge: React.FC<IProps> = ({ avatarUrl, name, slogan }) => (
    <Flex p="6">
        <Avatar src={avatarUrl} />
        <Box ml="3" overflow="hidden">
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm" isTruncated>
                {slogan}
            </Text>
        </Box>
    </Flex>
);
