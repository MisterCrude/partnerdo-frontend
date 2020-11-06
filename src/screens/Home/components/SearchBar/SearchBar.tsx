import React from 'react';

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
} from '@chakra-ui/core';
import { SearchIcon, LocationIcon } from '@theme/customIcons';

const cities = [
    'Warszawa',
    'Kraków',
    'Łódź',
    'Wrocław',
    'Poznań',
    'Gdańsk',
    'Szczecin',
    'Bydgoszcz',
    'Lublin',
    'Białystok',
    'Katowice',
    'Gdynia',
    'Częstochowa',
    'Radom',
    'Toruń',
    'Sosnowiec',
    'Kielce',
    'Rzeszów',
    'Gliwice',
    'Zabrze',
    'Olsztyn',
    'Bielsko-Biała',
    'Bytom',
    'Zielona Góra',
    'Rybnik',
    'Ruda Śląska',
    'Opole',
    'Tychy',
    'Gorzów Wielkopolski',
    'Dąbrowa Górnicza',
    'Elbląg',
    'Płock',
    'Wałbrzych',
    'Włocławek',
    'Tarnów',
    'Chorzów',
    'Koszalin',
    'Kalisz',
    'Legnica',
    'Grudziądz',
    'Jaworzno',
    'Słupsk',
    'Jastrzębie-Zdrój',
    'Nowy Sącz',
    'Jelenia Góra',
    'Siedlce',
    'Mysłowice',
    'Konin',
    'Piotrków Trybunalski',
    'Piła',
    'Inowrocław',
    'Lubin',
    'Ostrów Wielkopolski',
    'Suwałki',
    'Ostrowiec Świętokrzyski',
    'Gniezno',
    'Stargard',
    'Głogów',
    'Siemianowice Śląskie',
    'Pabianice',
    'Leszno',
    'Zamość',
    'Łomża',
    'Chełm',
    'Tomaszów Mazowiecki',
    'Żory',
    'Ełk',
    'Pruszków',
    'Tarnowskie Góry',
    'Przemyśl',
    'Stalowa Wola',
    'Kędzierzyn-Koźle',
    'Mielec',
    'Tczew',
    'Bełchatów',
    'Biała Podlaska',
    'Świdnica',
    'Będzin',
    'Zgierz',
    'Piekary Śląskie',
    'Racibórz',
    'Legionowo',
    'Ostrołęka',
    'Świętochłowice',
    'Wejherowo',
    'Zawiercie',
    'Rumia',
    'Starachowice',
    'Skierniewice',
    'Wodzisław Śląski',
    'Piaseczno',
    'Starogard Gdański',
    'Puławy',
    'Tarnobrzeg',
    'Krosno',
    'Kołobrzeg',
    'Radomsko',
    'Dębica',
    'Skarżysko-Kamienna',
    'Otwock',
];

export const MobileSearch: React.FC = () => (
    <Box d={{ base: 'flex', md: 'none' }} px={8} flexDir="column">
        <Select icon={<LocationIcon fontSize={24} />} placeholder="Miasto" size="lg" mb={4}>
            {cities.map((city: string) => (
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
                <InputLeftElement pointerEvents="none" height="100%" children={<SearchIcon fontSize={24} />} />
                <Input
                    borderBottomRightRadius="none"
                    borderTopRightRadius="none"
                    placeholder="Jakie partnerstwa szukasz?"
                    size="lg"
                    type="phone"
                />
            </InputGroup>
            <InputGroup left="-1px">
                <InputLeftElement pointerEvents="none" height="100%" children={<LocationIcon fontSize={24} />} />
                <Input borderRadius="none" type="phone" size="lg" placeholder="Miasto" />
            </InputGroup>
            <Button borderLeftRadius="none" variant="outline" left="-2px" paddingX={4} size="lg">
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
