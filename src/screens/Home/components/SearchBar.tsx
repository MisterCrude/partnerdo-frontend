import React from 'react';

import { CITIES } from '@config/app';
import { IOption } from '@models/app';

import { Button, Grid, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@theme/customIcons';
import MenuSelect from '@components/MenuSelect';

const cities: IOption[] = CITIES.map((city: string) => ({ value: city, label: city }));

export const SearchBar: React.FC = () => (
    <Grid
        gap={4}
        mb={{ base: 12, md: 28 }}
        templateColumns={{ base: '1fr', md: 'minmax(auto, 45rem) minmax(auto, 25rem) 100px' }}
        w="100%"
    >
        <InputGroup>
            <InputLeftElement pointerEvents="none" h="100%" children={<SearchIcon fontSize={24} color="gray.300" />} />
            <Input
                borderWidth={0}
                bgColor="white"
                h="55px"
                placeholder="Jakiego partnerstwa szukasz?"
                size="lg"
                shadow="base"
            />
        </InputGroup>

        <MenuSelect isRadio options={cities} height="55px" palceholder="Miasto" />

        <Button borderWidth={0} colorScheme="orange" size="lg" shadow="base" h="55px">
            Szukaj
        </Button>
    </Grid>
);

export default SearchBar;
