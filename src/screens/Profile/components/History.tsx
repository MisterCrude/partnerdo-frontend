import React from 'react';

import Card, { Types } from '@components/Card';
import { VStack, Flex } from '@chakra-ui/react';
import Pagination from '@components/Pagination';

const History: React.FC = () => {
    return (
        <>
            <VStack align="stretch" spacing={{ base: 4, md: 8 }} mb={4}>
                <Card
                    address="Warszawa, Bemowo"
                    content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                    category="Sport"
                    publishDate="01.10.2020"
                    title="Poszukuję partnera do głębokiego lenistwa"
                    type={Types.DONE}
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    userSlogan="Kanapowy sportowiec i mamusin przystojniak"
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
                    type={Types.DONE}
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    userSlogan="Kanapowy sportowiec i mamusin przystojniak"
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
                    type={Types.DONE}
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    userSlogan="Kanapowy sportowiec i mamusin przystojniak"
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

export default History;
