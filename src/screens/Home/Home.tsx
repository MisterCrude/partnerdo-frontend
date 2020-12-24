import React from 'react';

import { Center, Heading } from '@chakra-ui/react';
import Main from '@layouts/Main';
import SearchBar from './components/SearchBar';
import MainCategories from './components/MainCategories';
import NewProposals from './components/NewProposals';

export const Home: React.FC = () => {
    return (
        <Main>
            <Center as="section" flexDirection="column" minH="87vh">
                <Heading
                    align="center"
                    lineHeight={{ base: '3.5rem', md: '4.5rem' }}
                    mb={{ base: 12, md: 20 }}
                    fontSize={{ base: '2.5rem', md: '3.5rem' }}
                >
                    Zajebisty portal jakiego jeszcze nie widziałeś
                </Heading>
                <SearchBar />
            </Center>
            <MainCategories />
            <NewProposals />
        </Main>
    );
};
