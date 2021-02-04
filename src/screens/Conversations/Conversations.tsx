import React from 'react';
import { useHistory } from 'react-router';

import { ROUTES } from '@config/app';

import { Flex, Text, VStack } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Pagination from '@components/Pagination';
import Breadcrumbs from '@components/Breadcrumbs';
import MessageBox from './components/MessageBox';

export const Conversations: React.FC = () => {
    const history = useHistory();

    const handleUserNameClick = () => history.push(`${ROUTES.USER_PROFILE}/some-user-id`);
    const handleTitleClick = () => history.push(`${ROUTES.CONVERSATIONS}/some-convs-id`);

    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Breadcrumbs crumbs={[{ title: 'Strona główna', link: ROUTES.PROPOSALS }]} current="Wiadomości" mb={6} />

            <VStack align="stretch" spacing={{ base: 4, md: 8 }}>
                <Text color="gray.800" fontSize="sm" fontWeight="bold">
                    Wczoraj
                </Text>
                <MessageBox
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                    newMessagesAmount={3}
                />
                <MessageBox
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                    newMessagesAmount={4}
                />
                <Text color="gray.800" fontSize="sm" fontWeight="bold">
                    Wtorek 23.12.20
                </Text>
                <MessageBox onTitleClick={handleTitleClick} onUserNameClick={handleUserNameClick} />
                <MessageBox onTitleClick={handleTitleClick} onUserNameClick={handleUserNameClick} />
                <MessageBox onTitleClick={handleTitleClick} onUserNameClick={handleUserNameClick} />
                <Text color="gray.800" fontSize="sm" fontWeight="bold">
                    Sobota 12.12.20
                </Text>
                <MessageBox onTitleClick={handleTitleClick} onUserNameClick={handleUserNameClick} />
                <MessageBox onTitleClick={handleTitleClick} onUserNameClick={handleUserNameClick} />
            </VStack>

            <Flex justify="center" mt={10}>
                <Pagination />
            </Flex>
        </Main>
    );
};
