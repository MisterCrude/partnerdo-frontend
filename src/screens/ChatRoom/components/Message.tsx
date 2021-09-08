import { Box, Text, Flex } from '@chakra-ui/react';

interface IProps {
    message: string;
    sentTime: string;
    author?: string;
}

const Message = ({ author, message, sentTime }: IProps) => (
    <Box alignSelf={author ? 'flex-start' : 'flex-end'} width="80%">
        <Flex justify="space-between" mb={1}>
            <Text color={author ? 'orange.500' : 'gray.800'} fontSize="xs" fontWeight="bold">
                {author || 'Twoja wiadomość'}
            </Text>
            <Text fontSize="xs">{sentTime}</Text>
        </Flex>
        <Box bgColor={author ? 'orange.50' : 'gray.50'} borderWidth={1} borderRadius="lg" px={4} py={2}>
            <Text>{message}</Text>
        </Box>
    </Box>
);

export default Message;
