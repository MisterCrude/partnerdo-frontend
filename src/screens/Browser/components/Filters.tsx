import React from 'react';

import { Grid, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { IOption } from '@models/app';
import { SearchIcon } from '@theme/customIcons';
import MenuSelect from '@components/MenuSelect';

interface IProps {
    ages: IOption[];
    cities: IOption[];
    categories: IOption[];
    genders: IOption[];
}

const Filters: React.FC<IProps> = ({ ages, cities, categories, genders }) => (
    <>
        <InputGroup mb={{ base: 4, md: 8 }}>
            <InputLeftElement pointerEvents="none" h="100%" children={<SearchIcon fontSize={24} color="gray.300" />} />
            <Input
                borderWidth={0}
                backgroundColor="white"
                placeholder="Jakiego partnerstwa szukasz?"
                size="lg"
                shadow="base"
            />
        </InputGroup>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }} gap={{ base: 4, md: 8 }}>
            <MenuSelect options={categories} palceholder="Kategoria" selected={['sdsd']} />
            <MenuSelect isRadio options={cities} palceholder="Miasto" selected={['sdsd']} />
            <MenuSelect options={cities} palceholder="Dzielnica" selected={['sdsd']} />
            <MenuSelect options={ages} palceholder="Zakres wiekowy" />
            <MenuSelect options={genders} palceholder="Płeć" />
        </Grid>
    </>
);

export default Filters;
