import React from 'react';
import { useHistory } from 'react-router';

import { ROUTES } from '@config/app';

import { Flex, Text, VStack } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Pagination from '@components/Pagination';
import Breadcrumbs from '@components/Breadcrumbs';
import MessageBox, { Types } from './components/MessageBox';

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
                    title="Yszukuję partnera do głębolenistwakiego lenistwa"
                    category="Biznes"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=1"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                    newMessagesAmount={3}
                />
                <MessageBox
                    title="Poszukuj do głębokiego lenistwa"
                    category="Spors"
                    userName="Janina Barabanina"
                    userAvatarUrl="https://i.pravatar.cc/300?u=2"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                    newMessagesAmount={4}
                />
                <MessageBox
                    title="Poszukuję partnera do glenistwałębokiego lenistwa"
                    category="Sport"
                    userName="Ged Breg"
                    subtitle="wysłał Ci prpozycję na twoje partnerstwo"
                    userAvatarUrl="https://i.pravatar.cc/300?u=3"
                    newMessagesAmount={4}
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                    type={Types.SECONDARY}
                />
                <MessageBox
                    title="Poszukuję partneralenistwa"
                    category="Sport"
                    userName="Angus Jangus"
                    userAvatarUrl="https://i.pravatar.cc/300?u=4"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                    type={Types.REJECTED}
                />
                <MessageBox
                    title="Poszukuję partnera do głębokiego lenistwa"
                    category="Sport"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=5"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                    type={Types.REJECTED}
                />
                <MessageBox
                    title="Poszukuję partnerlen istwaleni stwalenistwalenis twanistwa"
                    category="Sport"
                    subtitle="wysłał Ci prpozycję na twoje partnerstwo"
                    userName="John John"
                    userAvatarUrl="https://i.pravatar.cc/300?u=6"
                    type={Types.SECONDARY}
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                />
                <Text color="gray.800" fontSize="sm" fontWeight="bold">
                    Wtorek 23.12.20
                </Text>
                <MessageBox
                    title="Poszukuję partnera do głęistwa"
                    category="Dzieci"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=7"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                />
                <MessageBox
                    title="Poszukuję partnera do głębokiego lenistwa"
                    category="Myzyka"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=8"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                />
                <MessageBox
                    title="Poszukuję partnera do głębokiego ębokiego lenistwa"
                    category="Sport"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=9"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                />
                <Text color="gray.800" fontSize="sm" fontWeight="bold">
                    Sobota 12.12.20
                </Text>
                <MessageBox
                    title="Poszukuję partnera do lenistwal enistwa wa"
                    category="Sport"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=10"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                />
                <MessageBox
                    title="Poszukuję partnera ębokiego ębokiego ębokiego enistwa"
                    category="Sport"
                    userName="Jan Baraban"
                    userAvatarUrl="https://i.pravatar.cc/300?u=11"
                    onTitleClick={handleTitleClick}
                    onUserNameClick={handleUserNameClick}
                />
            </VStack>

            <Flex justify="center" mt={10}>
                <Pagination />
            </Flex>
        </Main>
    );
};
