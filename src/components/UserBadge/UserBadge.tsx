import React from 'react';

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export interface IProps {
    avatarUrl: string;
    subtitle: string;
    title: string;
    onClick?: () => void;
}

export const UserBadge: React.FC<IProps> = ({ avatarUrl, title, subtitle, onClick }) => {
    return (
        <Flex w="100%">
            <Avatar src={avatarUrl} />
            <Box ml="3" overflow="hidden">
                <Text
                    d="inline"
                    fontWeight="bold"
                    onClick={onClick}
                    _hover={!!onClick ? { cursor: 'pointer', textDecor: 'underline' } : {}}
                >
                    {title}
                </Text>
                <Text fontSize="sm" isTruncated d="flex">
                    {subtitle}
                </Text>
            </Box>
        </Flex>
    );
};
