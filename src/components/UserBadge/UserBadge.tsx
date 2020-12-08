import React from 'react';

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface IProps {
    avatarUrl: string;
    title: string;
    subtitle: string | React.ReactNode;
}

export const UserBadge: React.FC<IProps> = ({ avatarUrl, title, subtitle }) => (
    <Flex>
        <Avatar src={avatarUrl} />
        <Box ml="3" overflow="hidden">
            <Text fontWeight="bold">{title}</Text>
            <Text fontSize="sm" isTruncated>
                {subtitle}
            </Text>
        </Box>
    </Flex>
);
