import React from 'react';

import Main from '@layouts/Main';
import { Text, VStack } from '@chakra-ui/react';
import MessageBox from './components/MessageBox';

export const Conversations: React.FC = () => {
    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <VStack align="stretch" spacing={{ base: 4, md: 8 }}>
                <Text fontSize="sm" fontWeight="bold" color="orange.500">
                    Wczoraj
                </Text>
                <MessageBox newMessagesAmount={3} />
                <MessageBox newMessagesAmount={4} />
                <Text fontSize="sm" fontWeight="bold" color="orange.500">
                    Wtorek 23.12.20
                </Text>
                <MessageBox />
                <MessageBox />
                <MessageBox />
                <Text fontSize="sm" fontWeight="bold" color="orange.500">
                    Sobota 12.12.20
                </Text>
                <MessageBox />
                <MessageBox />
            </VStack>
        </Main>
    );
};
