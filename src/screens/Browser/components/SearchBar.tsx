import React, { ChangeEvent, useState } from 'react';
import { useDebounce } from 'react-use';

import { Input, InputGroup, InputLeftElement, InputRightElement, Button } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@theme/customIcons';

interface IProps {
    showClearButton: boolean;
    onChange: (name: string, data: string | number | string[]) => void;
    onClear: () => void;
}

const TYPE_DELAY = 300;

const SearchBar: React.FC<IProps> = ({ showClearButton, onChange, onClear }) => {
    const [search, setSearch] = useState<string>('');

    const handleChangeSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setSearch(value);
    const handleClear = () => {
        onClear();
    };

    useDebounce(
        () => {
            onChange('search', search);
        },
        TYPE_DELAY,
        [search]
    );

    return (
        <InputGroup mb={{ base: 4, md: 8 }}>
            <InputLeftElement pointerEvents="none" h="100%">
                <SearchIcon fontSize={24} color="gray.300" />
            </InputLeftElement>
            <Input
                bgColor="white"
                placeholder="Jakiego partnerstwa szukasz?"
                size="lg"
                name="search"
                onChange={handleChangeSearch}
            />
            {showClearButton && (
                <InputRightElement width="auto" h="100%" pr={2}>
                    <Button colorScheme="orange" variant="outline" size="sm" onClick={handleClear}>
                        Wyczyść <CloseIcon ml={1} />
                    </Button>
                </InputRightElement>
            )}
        </InputGroup>
    );
};

export default SearchBar;
