import React from 'react';

import { ROUTES } from '@config/app';

import { useHistory } from 'react-router-dom';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface IProps {
    avatarUrl: string;
    title: string;
    subtitle: string | React.ReactNode;
}

export const UserBadge: React.FC<IProps> = ({ avatarUrl, title, subtitle }) => {
    const history = useHistory();

    const handleClick = () => history.push(`${ROUTES.USER_PROFILE}/some-user-id`);

    return (
        <Flex>
            <Avatar src={avatarUrl} />
            <Box ml="3" overflow="hidden">
                <Text d="inline" fontWeight="bold" onClick={handleClick} _hover={{ textDecor: 'underline' }}>
                    {title}
                </Text>
                <Text fontSize="sm" isTruncated d="flex">
                    {subtitle}
                </Text>
            </Box>
        </Flex>
    );
};
