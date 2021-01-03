import React from 'react';
import { useSelector } from 'react-redux';

import { CITIES, GENDER, AGE_GROUPS, CATEGORIES_DATA } from '@config/app';
import { IOption } from '@models/app';
import { toOptions } from '@utils/misc';
import { getIsAuth } from '@slices/userSlice';

import { Box, Text, Flex } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Pagination from '@components/Pagination';
import Filters from './components/Filters';
import FiltersMobile from './components/FiltersMobile';
import Results from './components/Results';

const ages: IOption[] = toOptions(AGE_GROUPS);
const cities: IOption[] = toOptions(CITIES);
const categories: IOption[] = CATEGORIES_DATA.map(({ name }) => ({ value: name.toLocaleLowerCase(), label: name }));
const genders: IOption[] = toOptions(GENDER);

export const Browser: React.FC = () => {
    // TODO replace isAuth by propsals data
    const isAuth = useSelector(getIsAuth);

    return (
        <Main mt={{ base: 0, md: 10 }} mb={10}>
            <FiltersMobile>
                <Filters ages={ages} cities={cities} categories={categories} genders={genders} />
            </FiltersMobile>

            <Box mb={10} d={{ base: 'none', md: 'block' }}>
                <Filters ages={ages} cities={cities} categories={categories} genders={genders} />
            </Box>

            <Text fontSize="md" mb={10}>
                Znaleziono <strong>245,667</strong> partnerstw pasujących do Ciebie
            </Text>

            <Results isAuth={isAuth} />

            <Flex justify="center" mt={10}>
                <Pagination />
            </Flex>
        </Main>
    );
};
