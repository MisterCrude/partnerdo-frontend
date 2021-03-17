import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '@consts/routes';
import { GENDER, AGE_GROUPS } from '@consts/filters';
import {
    fetchPageAsync,
    getCurrentPageProposalsSelector,
    getPagesAmountSelector,
    getProposalCountSelector,
    getRequestStatusSelector,
} from '@slices/proposalSlice';
import { getCategoriesSelector, getCitiesSelector, getCityAreasSelector } from '@slices/filtersSlice';
import { IOption } from '@models/app';
import { keys } from 'lodash/fp';
import { RequestStatus } from '@models/misc';
import { toOptions } from '@utils/convert';
import { scrollTop } from '@utils/misc';
import useDispatch from '@hooks/useDispatch';

import { Box, Text, Flex } from '@chakra-ui/react';
import { useMount } from 'react-use';
import Filters from './components/Filters';
import FiltersMobile from './components/FiltersMobile';
import Main from '@layouts/Main';
import Pagination from '@components/Pagination';
import Results from './components/Results';

const ages: IOption[] = keys(AGE_GROUPS).map((item) => ({ value: item, label: AGE_GROUPS[item] }));
// const categories: IOption[] = CATEGORIES_DATA.map(({ name }) => ({ value: name.toLocaleLowerCase(), label: name }));
const genders: IOption[] = keys(GENDER).map((item) => ({ value: item, label: GENDER[item] }));

export const Browser: React.FC = () => {
    // const [cityAreas, serSityAreas] = useState<any>([]);
    const history = useHistory();
    const fetchPage = useDispatch<number>(fetchPageAsync);
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

    const handleChangePage = (pageNumber: number) => {
        fetchPage(pageNumber);
        scrollTop();
    };
    const handleAuthorNameClick = (authorId: string) => history.push(`${ROUTES.USER_PROFILE}/${authorId}`);
    const handleTitleClick = () => history.push(`${ROUTES.PROPOSALS}/some-propposal-id`);

    useMount(() => {
        fetchPage();
    });

    useEffect(() => {
        // getCityAreas();
    }, [getCityAreas]);

    return (
        <Main mt={{ base: 0, md: 10 }} mb={10}>
            <FiltersMobile>
                <Filters ages={ages} cities={cityOprions} categories={categoryOprions} genders={genders} />
            </FiltersMobile>

            <Box mb={10} d={{ base: 'none', md: 'block' }}>
                <Filters ages={ages} cities={cityOprions} categories={categoryOprions} genders={genders} />
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
