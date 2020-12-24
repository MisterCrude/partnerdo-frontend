import React from 'react';

import { Box, Text, Flex } from '@chakra-ui/react';

interface IProps {
    message: string;
    sentTime: string;
    author?: string;
}

const Message: React.FC<IProps> = ({ author, message, sentTime }) => (
    <Box alignSelf={author ? 'flex-start' : 'flex-end'} width="80%">
        <Flex justify="space-between" mb={1}>
            <Text color={author ? 'orange.500' : 'gray.800'} fontSize="xs" fontWeight="bold">
                {author || 'Twoja wiadomość'}
            </Text>
            <Text fontSize="xs">{sentTime}</Text>
        </Flex>
        <Box
            borderWidth={author ? 0 : 1}
            backgroundColor={author ? 'gray.50' : 'white'}
            borderRadius="lg"
            px={4}
            py={2}
        >
            {message}
        </Box>
    </Box>
);

export default Message;
