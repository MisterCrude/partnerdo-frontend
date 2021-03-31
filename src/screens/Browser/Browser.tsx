import React, { useState } from 'react';
import { GENDER, AGE_GROUPS } from '@consts/filters';
import { ROUTES } from '@consts/routes';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import {
    fetchPageAsync,
    getCurrentPageProposalsSelector,
    getPagesAmountSelector,
    getProposalCountSelector,
    getRequestStatusSelector,
} from '@slices/proposalSlice';
import { getCategoriesSelector, getCitiesSelector, getCityAreasSelector } from '@slices/filtersSlice';
import { IFiltersData } from '@models/proposal';
import { IOption } from '@models/app';
import { keys, isEqual, omit } from 'lodash/fp';
import { RequestStatus } from '@models/misc';
import { scrollTop } from '@utils/misc';
import { toOptions } from '@utils/convert';
import useDispatch from '@hooks/useDispatch';

import { Box, Text, Flex } from '@chakra-ui/react';
import Filters from './components/Filters';
import FiltersMobile from './components/FiltersMobile';
import Main from '@layouts/Main';
import Pagination from '@components/Pagination';
import Results from './components/Results';
import SearchBar from './components/SearchBar';

const ages: IOption[] = keys(AGE_GROUPS)
    .sort()
    .map((item) => ({ value: item, label: AGE_GROUPS[item] }));
const genders: IOption[] = keys(GENDER).map((item) => ({ value: item, label: GENDER[item] }));

const initFiltersData: IFiltersData = {
    age: [],
    categories: [],
    city: '',
    cityAreas: [],
    gender: [],
    pageNumber: 0,
    search: '',
};

export const Browser: React.FC = () => {
    const [cityAreas, setCityAreas] = useState<IOption[]>([]);
    const [filtersData, setFiltersData] = useState<IFiltersData>(initFiltersData);
    const history = useHistory();
    const fetchPage = useDispatch<IFiltersData>(fetchPageAsync);
    const pagesAmount = useSelector(getPagesAmountSelector);
    const proposalsCount = useSelector(getProposalCountSelector);
    const proposals = useSelector(getCurrentPageProposalsSelector);
    const categories = useSelector(getCategoriesSelector);
    const cities = useSelector(getCitiesSelector);
    const requestStatus = useSelector(getRequestStatusSelector);
    const getCityAreas = useSelector(getCityAreasSelector);

    const categoryOprions = toOptions(categories);
    const cityOprions = toOptions(cities);
    const isFetching = requestStatus === RequestStatus.FETCHING;
    const isShowClearButton = !isEqual(omit('pageNumber', initFiltersData), omit('pageNumber', filtersData));

    const handleChangePage = (pageNumber: number) => {
        scrollTop();
        setFiltersData((prevState) => ({ ...prevState, pageNumber }));
    };
    const handleChangeFilters = (name: string, data: string | number | Array<string | number>) => {
        setFiltersData((prevState) => ({ ...prevState, [name]: data, pageNumber: 0 }));
    };
    const handleClear = (name?: string) => {
        setFiltersData((prevState) =>
            name
                ? {
                      ...prevState,
                      [name]: initFiltersData[name as keyof IFiltersData],
                      pageNumber: 0,
                  }
                : initFiltersData
        );
    };

    const handleAuthorNameClick = (authorId: string) => history.push(`${ROUTES.USER_PROFILE}/${authorId}`);
    const handleTitleClick = () => history.push(`${ROUTES.PROPOSALS}/some-propposal-id`);

    useMount(() => {
        fetchPage(filtersData);
    });

    useUpdateEffect(() => {
        setCityAreas(filtersData.city ? toOptions(getCityAreas(filtersData.city)) : []);
        fetchPage(filtersData);
    }, [filtersData]);

    return (
        <Main mt={{ base: 0, md: 10 }} mb={10}>
            <FiltersMobile>
                <Filters
                    ages={ages}
                    categories={categoryOprions}
                    cities={cityOprions}
                    cityAreas={cityAreas}
                    filtersData={filtersData}
                    genders={genders}
                    onChange={handleChangeFilters}
                    onClear={handleClear}
                />
            </FiltersMobile>
            <Box mb={10} d={{ base: 'none', md: 'block' }}>
                <SearchBar onChange={handleChangeFilters} onClear={handleClear} showClearButton={isShowClearButton} />
                <Filters
                    ages={ages}
                    categories={categoryOprions}
                    cities={cityOprions}
                    cityAreas={cityAreas}
                    filtersData={filtersData}
                    genders={genders}
                    onChange={handleChangeFilters}
                    onClear={handleClear}
                />
            </Box>
            <Text mb={10}>
                Znaleziono <strong>{proposalsCount}</strong> partnerstw pasujących do Ciebie
            </Text>
            <Results
                isFetching={isFetching}
                onAuthorNameClick={handleAuthorNameClick}
                onTitleClick={handleTitleClick}
                results={proposals}
            />

            <Flex justify="center" mt={10}>
                <Pagination isFetching={isFetching} onChangePage={handleChangePage} pagesAmount={pagesAmount} />
            </Flex>
        </Main>
    );
};
