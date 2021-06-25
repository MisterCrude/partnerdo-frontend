import { Avatar, Flex, Text, FlexProps } from '@chakra-ui/react';

export interface IProps {
    avatarUrl: string;
    title: string;
    styles?: FlexProps;
    subtitle?: string;
    onClick?: () => void;
}

export const UserBadge = ({ avatarUrl, title, subtitle, onClick, styles = {} }: IProps) => {
    return (
        <Flex {...styles}>
            <Avatar src={avatarUrl} />
            <Flex ml="3" justify="center" direction="column">
                <Text
                    d="inline"
                    fontWeight="bold"
                    onClick={onClick}
                    _hover={!!onClick ? { cursor: 'pointer', textDecor: 'underline' } : {}}
                >
                    {title}
                </Text>
                {subtitle && <Text fontSize="sm">{subtitle}</Text>}
            </Flex>
        </Flex>
    );
};
