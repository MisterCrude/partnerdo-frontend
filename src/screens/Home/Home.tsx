import React from 'react';

import { Heading } from '@chakra-ui/react';
import Main from '@layouts/Main';
import SearchBar from './components/SearchBar';
import MainCategories from './components/MainCategories';
import NowOffers from './components/NewOffers';

export const Home: React.FC = () => {
    return (
        <Main>
            <Heading px={8} my={{ base: 10, md: 20 }} size="xl" align="center" lineHeight="3rem">
                Zajebisty portal jakiego jeszcze nie widziałeś
            </Heading>
            <SearchBar />
            <MainCategories />
            <NowOffers />
        </Main>
    );
};
