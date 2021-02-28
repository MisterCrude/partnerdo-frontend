import React from 'react';
import { useSelector } from 'react-redux';

import { CATEGORIES_DATA } from '@consts/app';
import { CITIES, GENDER, AGE_GROUPS } from '@consts/filters';
import {
    fetchPageAsync,
    getPaginationPagesAmountSelect,
    getPaginationCurrentPageItems,
    getPaginationCountSelect,
} from '@slices/proposalSlice';
import { IOption } from '@models/app';
import { toOptions, scrollTop } from '@utils/misc';
import useDispatch from '@hooks/useDispatch';

import { Box, Text, Flex } from '@chakra-ui/react';
import { useMount } from 'react-use';
import Filters from './components/Filters';
import FiltersMobile from './components/FiltersMobile';
import Main from '@layouts/Main';
import Pagination from '@components/Pagination';
import Results from './components/Results';

const ages: IOption[] = toOptions(AGE_GROUPS);
const cities: IOption[] = toOptions(CITIES);
const categories: IOption[] = CATEGORIES_DATA.map(({ name }) => ({ value: name.toLocaleLowerCase(), label: name }));
const genders: IOption[] = toOptions(GENDER);

export const Browser: React.FC = () => {
    const fetchPage = useDispatch(fetchPageAsync);
    const pagesAmount = useSelector(getPaginationPagesAmountSelect);
    const itemsCount = useSelector(getPaginationCountSelect);
    const { proposals, fetching } = useSelector(getPaginationCurrentPageItems);

    const handleChangePage = (pageNumber: number) => {
        fetchPage(pageNumber);
        scrollTop();
    };

    useMount(() => {
        fetchPage(1);
    });

    return (
        <Main mt={{ base: 0, md: 10 }} mb={10}>
            <FiltersMobile>
                <Filters ages={ages} cities={cities} categories={categories} genders={genders} />
            </FiltersMobile>

            <Box mb={10} d={{ base: 'none', md: 'block' }}>
                <Filters ages={ages} cities={cities} categories={categories} genders={genders} />
            </Box>

            <Text mb={10}>
                Znaleziono <strong>{itemsCount}</strong> partnerstw pasujących do Ciebie
            </Text>

            <Results isFetching={fetching} results={proposals} />

            <Flex justify="center" mt={10}>
                <Pagination onChangePage={handleChangePage} pagesAmount={pagesAmount} />
            </Flex>
        </Main>
    );
};
