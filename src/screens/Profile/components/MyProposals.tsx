import React from 'react';

import Card, { Types } from '@components/Card';
import { VStack, Flex } from '@chakra-ui/react';
import Pagination from '@components/Pagination';

const MyProposals: React.FC = () => {
    return (
        <>
            <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }} mb={4}>
                <Card
                    address="Warszawa, Bemowo"
                    content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                    category="Sport"
                    publishDate="01.10.2020"
                    title="Poszukuję partnera do głębokiego lenistwa"
                    type={Types.EDITABLE}
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    partDescription="Kawałek opisu z profilu bla bla..."
                    onTitleClick={() => {
                        return null;
                    }}
                />
                <Card
                    address="Warszawa, Bemowo"
                    content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                    category="Sport"
                    publishDate="01.10.2020"
                    title="Poszukuję partnera do głębokiego lenistwa"
                    type={Types.EDITABLE}
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    partDescription="Kawałek opisu z profilu bla bla..."
                    onTitleClick={() => {
                        return null;
                    }}
                />
                <Card
                    address="Warszawa, Bemowo"
                    content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                    category="Sport"
                    publishDate="01.10.2020"
                    title="Poszukuję partnera do głębokiego lenistwa"
                    type={Types.UNPUBLISH}
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    partDescription="Kawałek opisu z profilu bla bla..."
                    onTitleClick={() => {
                        return null;
                    }}
                />
            </VStack>

            <Flex justify="center" mt={10}>
                <Pagination />
            </Flex>
        </>
    );
};

export default MyProposals;
