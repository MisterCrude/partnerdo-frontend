import Card, { Types } from '@components/Card';
import { VStack, Flex } from '@chakra-ui/react';
import Pagination from '@components/Pagination';

const History = () => {
    return (
        <>
            <VStack align="stretch" spacing={{ base: 4, md: 8 }} mb={4}>
                <Card
                    address="Warszawa, Bemowo"
                    categoryName="Sport"
                    content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                    publishDate="01.10.2020"
                    title="Poszukuję partnera do głębokiego lenistwa"
                    type={Types.DONE}
                    shortUserDesc="Jak w tytule, szukam partnera do głęboki..."
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    onTitleClick={() => {
                        return null;
                    }}
                />
                <Card
                    address="Warszawa, Bemowo"
                    categoryName="Sport"
                    content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                    publishDate="01.10.2020"
                    title="Poszukuję partnera do głębokiego lenistwa"
                    type={Types.DONE}
                    shortUserDesc="Jak w tytule, szukam partnera do głęboki..."
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    onTitleClick={() => {
                        return null;
                    }}
                />
                <Card
                    address="Warszawa, Bemowo"
                    categoryName="Sport"
                    content="Jak w tytule, szukam partnera do głębokiego lenistwa zukuję partnerłębokiego lenistwa oszukuję partnera do głębokiego lenistwa Poszuk partnera ..."
                    publishDate="01.10.2020"
                    title="Poszukuję partnera do głębokiego lenistwa"
                    type={Types.DONE}
                    shortUserDesc="Jak w tytule, szukam partnera do głęboki..."
                    userAvatarUrl="https://bit.ly/sage-adebayo"
                    userName="Jan Baraban"
                    onTitleClick={() => {
                        return null;
                    }}
                />
            </VStack>
            <Flex justify="center" mt={10}>
                <Pagination
                    isFetching={false}
                    pagesAmount={1}
                    onChangePage={() => {
                        return null;
                    }}
                />
            </Flex>
        </>
    );
};

export default History;
