import React from 'react';

import { ROUTES } from '@config/app';

import { Flex, Text, VStack } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Pagination from '@components/Pagination';
import Breadcrumbs from '@components/Breadcrumbs';
import MessageBox from './components/MessageBox';

export const Conversations: React.FC = () => {
    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs crumbs={[['Strona główna', ROUTES.BROWSER], 'Wiadomości']} mb={2} />

            <VStack align="stretch" spacing={{ base: 4, md: 8 }}>
                <Text color="gray.800" fontSize="sm" fontWeight="bold" textAlign="right">
                    Wczoraj
                </Text>
                <MessageBox newMessagesAmount={3} />
                <MessageBox newMessagesAmount={4} />
                <Text color="gray.800" fontSize="sm" fontWeight="bold" textAlign="right">
                    Wtorek 23.12.20
                </Text>
                <MessageBox />
                <MessageBox />
                <MessageBox />
                <Text color="gray.800" fontSize="sm" fontWeight="bold" textAlign="right">
                    Sobota 12.12.20
                </Text>
                <MessageBox />
                <MessageBox />
            </VStack>

            <Flex justify="center" mt={10}>
                <Pagination />
            </Flex>
        </Main>
    );
};
