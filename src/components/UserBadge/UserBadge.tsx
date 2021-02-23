import React from 'react';

import { Avatar, Box, Flex, Text, FlexProps } from '@chakra-ui/react';

export interface IProps {
    avatarUrl: string;
    subtitle: string;
    title: string;
    styles?: FlexProps;
    onClick?: () => void;
}

export const UserBadge: React.FC<IProps> = ({ avatarUrl, title, subtitle, onClick, styles = {} }) => {
    return (
        <Flex {...styles}>
            <Avatar src={avatarUrl} />
            <Box ml="3">
                <Text
                    d="inline"
                    fontWeight="bold"
                    onClick={onClick}
                    _hover={!!onClick ? { cursor: 'pointer', textDecor: 'underline' } : {}}
                >
                    {title}
                </Text>
                <Text fontSize="sm">{subtitle}</Text>
            </Box>
        </Flex>
    );
};
