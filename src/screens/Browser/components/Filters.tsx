import { IFilterData } from '@typing/proposal';

import { Grid } from '@chakra-ui/react';
import { IOption } from '@typing/app';
import MenuSelect from '@components/MenuSelect';
import MenuMultiSelect from '@components/MenuMultiSelect';

interface IProps {
    ageOptions: IOption[];
    categoryOptions: IOption[];
    cityOptions: IOption[];
    cityAreaOptions: IOption[];
    genderOptions: IOption[];
    filtersData: IFilterData;
    onChange: (name: string, data: string | Array<string>) => void;
    onClear?: (name: string) => void;
}

const Filters = ({
    ageOptions,
    categoryOptions,
    cityOptions,
    cityAreaOptions,
    genderOptions,
    filtersData,
    onChange,
    onClear,
}: IProps) => {
    const handleClear = onClear;
    const handleChange = onChange;

    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, minmax(0, 1fr))' }}
            gap={{ base: 4, md: 8 }}
        >
            <MenuMultiSelect
                name="categories"
                options={categoryOptions}
                palceholder="Kategoria"
                selected={filtersData['categories']}
                onChange={handleChange}
                onClear={handleClear}
            />
            <MenuSelect
                options={cityOptions}
                palceholder="Miasto"
                name="city"
                selected={filtersData['city']}
                onChange={handleChange}
                onClear={handleClear}
            />
            <MenuMultiSelect
                name="cityAreas"
                options={cityAreaOptions}
                palceholder="Dzielnica"
                selected={filtersData['cityAreas']}
                onChange={handleChange}
                onClear={handleClear}
            />
            <MenuMultiSelect
                name="age"
                options={ageOptions}
                palceholder="Zakres wiekowy"
                selected={filtersData['age']}
                onChange={handleChange}
                onClear={handleClear}
            />
            <MenuMultiSelect
                name="gender"
                options={genderOptions}
                palceholder="Płeć"
                selected={filtersData['gender']}
                onChange={handleChange}
                onClear={handleClear}
            />
        </Grid>
    );
};

export default Filters;
