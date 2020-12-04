import React from 'react';

import { CITIES } from '@config/app';

import {
    Box,
    Button,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    Flex,
    Grid,
    Select,
} from '@chakra-ui/react';
import { SearchIcon, LocationIcon } from '@theme/customIcons';

export const MobileSearch: React.FC = () => (
    <Box d={{ base: 'flex', md: 'none' }} px={8} flexDir="column">
        <Select icon={<LocationIcon fontSize={24} />} placeholder="Miasto" size="lg" mb={4}>
            {CITIES.map((city: string) => (
                <option key={city} value={city}>
                    {city}
                </option>
            ))}
        </Select>
        <InputGroup mb={4}>
            <Input type="phone" size="lg" placeholder="Jakie partnerstwa szukasz?" />
            <InputRightElement pointerEvents="none" height="100%" children={<SearchIcon fontSize={24} />} />
        </InputGroup>
        <Button colorScheme="orange" variat="outline" size="lg">
            Szukaj
        </Button>
    </Box>
);

export const DesktopSearch: React.FC = () => (
    <Box as={Flex} paddingX={8} display={{ base: 'none', md: 'flex' }} justifyContent="center">
        <Grid gridTemplateColumns="2fr minmax(23ch, 1fr) minmax(8ch, 12ch)" maxWidth="100%" width="70rem">
            <InputGroup>
                <InputLeftElement pointerEvents="none" h="100%" children={<SearchIcon fontSize={24} />} />
                <Input
                    borderBottomRightRadius="none"
                    borderTopRightRadius="none"
                    borderWidth={2}
                    h="4rem"
                    placeholder="Jakie partnerstwa szukasz?"
                    type="phone"
                />
            </InputGroup>
            <InputGroup left="-2px">
                <InputLeftElement pointerEvents="none" height="100%" children={<LocationIcon fontSize={24} />} />
                <Input borderRadius="none" borderWidth={2} h="4rem" type="phone" size="lg" placeholder="Miasto" />
            </InputGroup>
            <Button borderLeftRadius="none" borderWidth={2} h="4rem" variant="outline" left="-4px" px={4} size="lg">
                Szukaj
            </Button>
        </Grid>
    </Box>
);

export const SearchBar: React.FC = () => (
    <Box as="section" mb={{ base: 32, md: 48 }}>
        <MobileSearch />
        <DesktopSearch />
    </Box>
);

export default SearchBar;
