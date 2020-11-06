import React from 'react';

import { Heading } from '@chakra-ui/core';
import Main from '@layouts/Main';
import SearchBar from './components/SearchBar';
import MainCategories from './components/MainCategories';
import NowOffers from './components/NewOffers';

export const Home: React.FC = () => {
    return (
        <Main>
            <Heading px={8} py={15} my={10} size="xl" align="center" lineHeight="3rem">
                Zajebisty portal jakiego jeszcze nie widziałeś
            </Heading>
            <SearchBar />
            <MainCategories />
            <NowOffers />
        </Main>
    );
};
