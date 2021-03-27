import React from 'react';
import { IFiltersData } from '@models/proposal';

import { Grid } from '@chakra-ui/react';
import { IOption } from '@models/app';
import MenuSelect from '@components/MenuSelect';
import MenuMultiSelect from '@components/MenuMultiSelect';

interface IProps {
    ages: IOption[];
    categories: IOption[];
    cities: IOption[];
    cityAreas: IOption[];
    genders: IOption[];
    filtersData: IFiltersData;
    onChange: (name: string, data: string | number | Array<string | number>) => void;
    onClear?: (name: string) => void;
}

const Filters: React.FC<IProps> = ({
    ages,
    categories,
    cities,
    cityAreas,
    filtersData,
    genders,
    onChange,
    onClear,
}) => {
    const handleClear = onClear;
    const handleChange = onChange;

    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, minmax(0, 1fr))' }}
            gap={{ base: 4, md: 8 }}
        >
            <MenuMultiSelect
                name="categories"
                options={categories}
                palceholder="Kategoria"
                selected={filtersData['categories']}
                onChange={handleChange}
                onClear={handleClear}
            />
            <MenuSelect
                options={cities}
                palceholder="Miasto"
                name="city"
                selected={filtersData['city']}
                onChange={handleChange}
                onClear={handleClear}
            />
            <MenuMultiSelect
                name="cityAreas"
                options={cityAreas}
                palceholder="Dzielnica"
                selected={filtersData['cityAreas']}
                onChange={handleChange}
                onClear={handleClear}
            />
            <MenuMultiSelect
                name="age"
                options={ages}
                palceholder="Zakres wiekowy"
                selected={filtersData['age']}
                onChange={handleChange}
                onClear={handleClear}
            />
            <MenuMultiSelect
                name="gender"
                options={genders}
                palceholder="Płeć"
                selected={filtersData['gender']}
                onChange={handleChange}
                onClear={handleClear}
            />
        </Grid>
    );
};

export default Filters;
