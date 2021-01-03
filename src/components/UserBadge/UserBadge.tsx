import React from 'react';

import { ROUTES } from '@config/app';

import { useHistory } from 'react-router-dom';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface IProps {
    avatarUrl: string;
    title: string;
    subtitle: string | React.ReactNode;
    userId?: string;
}

export const UserBadge: React.FC<IProps> = ({ avatarUrl, title, subtitle, userId }) => {
    const history = useHistory();

    const handleClick = () => {
        userId && history.push(`${ROUTES.USER_PROFILE}/${userId}`);
    };

    return (
        <Flex>
            <Avatar src={avatarUrl} />
            <Box ml="3" overflow="hidden">
                <Text
                    d="inline"
                    fontWeight="bold"
                    onClick={handleClick}
                    _hover={userId ? { cursor: 'pointer', textDecor: 'underline' } : {}}
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
