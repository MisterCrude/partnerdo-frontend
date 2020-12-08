import React from 'react';

import { CITIES, GENDER, AGE_GROUPS } from '@config/app';
import { IOption } from '@models/app';
import { toOptions } from '@utils/misc';

import { Box, Grid, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@theme/customIcons';
import MenuSelect from '@components/MenuSelect';

const cities: IOption[] = toOptions(CITIES);
const gender: IOption[] = toOptions(GENDER);
const ageGroups: IOption[] = toOptions(AGE_GROUPS);

const Filters: React.FC = () => (
    <Box mt={10} mb={5}>
        <InputGroup mb={6}>
            <InputLeftElement pointerEvents="none" h="100%" children={<SearchIcon fontSize={24} color="gray.300" />} />
            <Input
                borderWidth={0}
                backgroundColor="white"
                placeholder="Jakiego partnerstwa szukasz?"
                size="lg"
                shadow="base"
            />
        </InputGroup>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
            <MenuSelect isRadio options={cities} palceholder="Miasto" />

            <MenuSelect isRadio options={cities} palceholder="Dzielnica" />

            <MenuSelect options={ageGroups} palceholder="Zakres wiekowy" />

            <MenuSelect options={gender} palceholder="Płeć" />
        </Grid>
    </Box>
);

export default Filters;
