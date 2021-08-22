import { useState } from 'react';
import { GENDER, AGE_GROUPS } from '@consts/filters';
import { ROUTES } from '@consts/routes';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUnmount, useUpdateEffect } from 'react-use';
import { fetchPageAsync } from '@slices/proposalSlice';
import {
    currentPageProposalListSelector,
    getPagesAmountSelector,
    proposalCountSelector,
    proposalListRequestStatusSelector,
} from '@selectors/proposalSelectors';
import { categoryListSelector, cityListSelector, cityAreaListSelector } from '@selectors/filterSelectors';
import { resetPagination as reset } from '@slices/proposalSlice';
import { IFilterData } from '@typing/proposal';
import { IOption } from '@typing/app';
import { keys, isEqual, omit } from 'lodash/fp';
import { RequestStatus } from '@typing/api';
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

const ageOptions: IOption[] = keys(AGE_GROUPS)
    .sort()
    .map((item) => ({ value: item, label: AGE_GROUPS[item] }));
const genderOptions: IOption[] = keys(GENDER).map((item) => ({ value: item, label: GENDER[item] }));

const initFilterData: IFilterData = {
    age: [],
    categories: [],
    city: '',
    cityAreas: [],
    gender: [],
    pageNumber: 0,
    search: '',
};

export const Browser = () => {
    const [cityAreasOptions, setCityAreasOptions] = useState<IOption[]>([]);
    const [filtersData, setFiltersData] = useState<IFilterData>(initFilterData);
    const history = useHistory();

    const fetchPage = useDispatch<IFilterData>(fetchPageAsync);
    const resetPagination = useDispatch(reset);
    const pagesAmount = useSelector(getPagesAmountSelector);
    const proposalsCount = useSelector(proposalCountSelector);
    const currentPageProposalList = useSelector(currentPageProposalListSelector);
    const categoryList = useSelector(categoryListSelector);
    const cityList = useSelector(cityListSelector);
    const proposalListRequestStatus = useSelector(proposalListRequestStatusSelector);
    const getCityAreaList = useSelector(cityAreaListSelector);

    const categoryOptions = toOptions(categoryList);
    const cityOptions = toOptions(cityList);
    const isShowClearButton = !isEqual(omit('pageNumber', initFilterData), omit('pageNumber', filtersData));

    const showError = proposalListRequestStatus === RequestStatus.ERROR;
    const showContent = proposalListRequestStatus === RequestStatus.SUCCESS;
    const showSkeleton =
        proposalListRequestStatus === RequestStatus.FETCHING || proposalListRequestStatus === RequestStatus.IDLE;

    const handleChangePage = (pageNumber: number) => {
        scrollTop();
        setFiltersData((prevState) => ({ ...prevState, pageNumber }));
    };
    const handleChangeFilters = (name: string, data: string | Array<string>) => {
        setFiltersData((prevState) => ({ ...prevState, [name]: data, pageNumber: 0 }));
    };
    const handleClear = (name?: string) => {
        setFiltersData((prevState) =>
            name
                ? {
                      ...prevState,
                      [name]: initFilterData[name as keyof IFilterData],
                      pageNumber: 0,
                  }
                : initFilterData
        );
    };
    const handleAuthorNameClick = (authorId: string) => history.push(`${ROUTES.USER_PROFILE}/${authorId}`);
    const handleTitleClick = (proposalId: string) => history.push(`${ROUTES.PROPOSALS}/${proposalId}`);

    useUpdateEffect(() => {
        setCityAreasOptions(filtersData.city ? toOptions(getCityAreaList(filtersData.city)) : []);
        /**
         * Initial proposals fetch doing here.
         * After fetchin filters useUpdateEffect triggered and fetch proposals list.
         */
        fetchPage(filtersData);
    }, [filtersData]);

    useUnmount(() => {
        resetPagination();
    });

    return (
        <Main mt={{ base: 0, md: 10 }} mb={10}>
            <FiltersMobile>
                <Filters
                    ageOptions={ageOptions}
                    categoryOptions={categoryOptions}
                    cityOptions={cityOptions}
                    cityAreaOptions={cityAreasOptions}
                    genderOptions={genderOptions}
                    filtersData={filtersData}
                    onChange={handleChangeFilters}
                    onClear={handleClear}
                />
            </FiltersMobile>
            <Box mb={10} d={{ base: 'none', md: 'block' }}>
                <SearchBar onChange={handleChangeFilters} onClear={handleClear} showClearButton={isShowClearButton} />
                <Filters
                    ageOptions={ageOptions}
                    categoryOptions={categoryOptions}
                    cityOptions={cityOptions}
                    cityAreaOptions={cityAreasOptions}
                    filtersData={filtersData}
                    genderOptions={genderOptions}
                    onChange={handleChangeFilters}
                    onClear={handleClear}
                />
            </Box>

            {showSkeleton && <>Skeleton</>}
            {showError && <>Error</>}
            {showContent && (
                <>
                    <Text mb={10}>
                        Znaleziono <strong>{proposalsCount}</strong> partnerstw pasujących do Ciebie
                    </Text>

                    <Results
                        onAuthorNameClick={handleAuthorNameClick}
                        onTitleClick={handleTitleClick}
                        results={currentPageProposalList}
                    />
                </>
            )}

            <Flex justify="center" mt={10}>
                <Pagination isFetching={showSkeleton} onChangePage={handleChangePage} pagesAmount={pagesAmount} />
            </Flex>
        </Main>
    );
};
