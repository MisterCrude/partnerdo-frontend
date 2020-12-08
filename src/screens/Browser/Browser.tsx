import React from 'react';

import { CITIES, GENDER, AGE_GROUPS, CATEGORIES_DATA } from '@config/app';
import { IOption } from '@models/app';
import { toOptions } from '@utils/misc';

import { Box, Container, Text } from '@chakra-ui/react';
import Main from '@layouts/Main';
import Filters from './components/Filters';
import Results from './components/Results';

const cities: IOption[] = toOptions(CITIES);
const genders: IOption[] = toOptions(GENDER);
const ages: IOption[] = toOptions(AGE_GROUPS);
const categories: IOption[] = CATEGORIES_DATA.map(({ name }) => ({ value: name.toLocaleLowerCase(), label: name }));

export const Browser: React.FC = () => {
    return (
        <Main>
            <Container as="section" flexGrow={1} px={8} maxW="7xl">
                <Box my={10}>
                    <Filters ages={ages} cities={cities} categories={categories} genders={genders} />
                </Box>

                <Text fontSize="md">
                    Znaleziono <strong>245,667</strong> partnerstw pasujących do Ciebie
                </Text>

                <Box my={10}>
                    <Results />
                </Box>

                <Text align="center" color="gray.600" fontSize="lg" mb={12}>
                    <strong>240</strong> partnerstw z <strong>245,09</strong>
                </Text>
            </Container>
        </Main>
    );
};
