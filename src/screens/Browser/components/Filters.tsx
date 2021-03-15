import React from 'react';

import { Grid, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { IOption } from '@models/app';
import { SearchIcon } from '@theme/customIcons';
import MenuSelect from '@components/MenuSelect';
import MenuMultiSelect from '@components/MenuMultiSelect';

interface IProps {
    ages: IOption[];
    cities: IOption[];
    categories: IOption[];
    genders: IOption[];
}

const Filters: React.FC<IProps> = ({ ages, cities, categories, genders }) => (
    <>
        <InputGroup mb={{ base: 4, md: 8 }}>
            <InputLeftElement pointerEvents="none" h="100%">
                <SearchIcon fontSize={24} color="gray.300" />
            </InputLeftElement>
            <Input borderWidth={0} bgColor="white" placeholder="Jakiego partnerstwa szukasz?" size="lg" shadow="md" />
        </InputGroup>

        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, minmax(0, 1fr))' }}
            gap={{ base: 4, md: 8 }}
        >
            <MenuMultiSelect options={categories} palceholder="Kategoria" />
            <MenuSelect options={cities} palceholder="Miasto" />
            <MenuMultiSelect options={cities} palceholder="Dzielnica" />
            <MenuMultiSelect options={ages} palceholder="Zakres wiekowy" />
            <MenuMultiSelect options={genders} palceholder="Płeć" />
        </Grid>
    </>
);

export default Filters;
