import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '@consts/routes';
import { GENDER, AGE_GROUPS } from '@consts/filters';
import {
    fetchPageAsync,
    getPaginationPagesAmountSelect,
    getPaginationCurrentPageItems,
    getProposalCountSelect,
} from '@slices/proposalSlice';
import { keys } from 'lodash/fp';
import { getCategoriesSelector, getCitiesSelector, getCityAreasSelector } from '@slices/filtersSlice';
import { IOption } from '@models/app';
import { scrollTop, recordToOptions } from '@utils/misc';
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
    const fetchPage = useDispatch(fetchPageAsync);
    const pagesAmount = useSelector(getPaginationPagesAmountSelect);
    const itemsCount = useSelector(getProposalCountSelect);
    const { proposals, fetching } = useSelector(getPaginationCurrentPageItems);
    const categories = useSelector(getCategoriesSelector);
    const cities = useSelector(getCitiesSelector);
    const getCityAreas = useSelector(getCityAreasSelector);

    const categoryOprions = recordToOptions(categories);
    const cityOprions = recordToOptions(cities);

    const handleChangePage = (pageNumber: number) => {
        fetchPage(pageNumber);
        scrollTop();
    };
    const handleAuthorNameClick = () => history.push(`${ROUTES.USER_PROFILE}/some-user-id`);
    const handleTitleClick = () => history.push(`${ROUTES.PROPOSALS}/some-proposal-id`);

    useMount(() => {
        fetchPage(1);
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
                Znaleziono <strong>{itemsCount}</strong> partnerstw pasujących do Ciebie
            </Text>

            <Results
                isFetching={fetching}
                results={proposals}
                onTitleClick={handleTitleClick}
                onAuthorNameClick={handleAuthorNameClick}
            />

            <Flex justify="center" mt={10}>
                <Pagination onChangePage={handleChangePage} pagesAmount={pagesAmount} isFetching={fetching} />
            </Flex>
        </Main>
    );
};
