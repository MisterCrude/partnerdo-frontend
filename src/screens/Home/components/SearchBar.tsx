import React from 'react';

import { CITIES } from '@config/app';

import { Button, InputGroup, InputLeftElement, Input, Grid, Select } from '@chakra-ui/react';
import { SearchIcon } from '@theme/customIcons';

export const SearchBar: React.FC = () => (
    <Grid
        gap={4}
        mb={{ base: 12, md: 28 }}
        templateColumns={{ base: '1fr', md: 'minmax(auto, 45rem) auto 100px' }}
        templateRows={{ base: 'repeat(1fr, 3)', md: '1fr' }}
        w="100%"
    >
        <InputGroup>
            <InputLeftElement pointerEvents="none" h="100%" children={<SearchIcon fontSize={24} color="gray.300" />} />
            <Input
                borderWidth={0}
                backgroundColor="white"
                placeholder="Jakiego partnerstwa szukasz?"
                size="lg"
                shadow="base"
            />
        </InputGroup>

        <Select borderWidth={0} backgroundColor="white" placeholder="Miasto" size="lg" shadow="base">
            {CITIES.map((city: string) => (
                <option key={city} value={city}>
                    {city}
                </option>
            ))}
        </Select>

        <Button borderWidth={0} colorScheme="orange" size="lg" shadow="base">
            Szukaj
        </Button>
    </Grid>
);

export default SearchBar;
