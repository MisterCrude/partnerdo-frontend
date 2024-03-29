import { CITIES } from '@consts/filters';
import { IOption } from '@typing/app';

import { Button, Grid, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@theme/customIcons';
import MenuSelect from '@components/MenuSelect';

const cities: IOption[] = CITIES.map((city: string) => ({ value: city, label: city }));

export const SearchBar = () => (
    <Grid
        gap={4}
        mb={{ base: 12, md: 28 }}
        templateColumns={{ base: '1fr', md: 'minmax(auto, 45rem) minmax(auto, 25rem) 100px' }}
        w="100%"
    >
        <InputGroup>
            <InputLeftElement h="100%" pointerEvents="none">
                <SearchIcon fontSize={24} color="gray.300" />
            </InputLeftElement>
            <Input bgColor="white" h="55px" placeholder="Jakiego partnerstwa szukasz?" size="lg" />
        </InputGroup>

        <MenuSelect
            options={cities}
            height="55px"
            palceholder="Miasto"
            name="city"
            selected="sss"
            onChange={() => null}
        />

        <Button borderWidth={0} colorScheme="orange" size="lg" shadow="base" h="55px">
            Szukaj
        </Button>
    </Grid>
);

export default SearchBar;
