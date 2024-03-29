import { useState } from 'react';
import { IOption } from '@typing/app';
import { RecordNamedItem } from '@typing/misc';
import { toOptions } from '@utils/convert';
import { useUpdateEffect, useMount } from 'react-use';

import { VStack, HStack, Box, Button } from '@chakra-ui/react';
import MenuSelect from '@components/MenuSelect';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

interface IProps {
    citires: IOption[];
    defaultData: Record<string, string>;
    cityAreasGetter: (cityId: string) => RecordNamedItem[];
    onChangeStep: (nextStep: number) => void;
    onSave: (fieldsData: Record<string, string>) => void;
}

export const StepThreeForm = ({ defaultData, citires, cityAreasGetter, onSave, onChangeStep }: IProps) => {
    const [city, setCity] = useState('');
    const [cityArea, setCityArea] = useState('');
    const [cityAreasOptions, setCityAreasOptions] = useState<IOption[]>([]);

    const disableNextButton = !(city && cityArea);

    const handleCityChange = (_: string, value: string) => setCity(value);
    const handleCityAreaChange = (_: string, value: string) => setCityArea(value);
    const handleForward = () => {
        onSave({ city, cityArea });
        onChangeStep(2);
    };
    const handleBack = () => onChangeStep(0);

    useUpdateEffect(() => {
        setCityAreasOptions(city ? toOptions(cityAreasGetter(city)) : []);
    }, [city]);

    useMount(() => {
        defaultData.city && setCity(defaultData.city);
        defaultData.cityArea && setCityArea(defaultData.cityArea);
    });

    return (
        <>
            <Box alignItems="center" d="flex" my={{ base: 16 }} minH={{ base: 0, md: 260 }}>
                <VStack align="stretch" spacing={{ base: 6, md: 8 }} w="100%">
                    <MenuSelect
                        options={citires}
                        palceholder="Miasto"
                        name="city"
                        selected={city}
                        onChange={handleCityChange}
                    />
                    <MenuSelect
                        options={cityAreasOptions}
                        palceholder="Dzielnica"
                        name="cityArea"
                        selected={cityArea}
                        onChange={handleCityAreaChange}
                    />
                </VStack>
            </Box>

            <HStack spacing={8} justify="space-between">
                <Button
                    flexGrow={{ base: 1, md: 0 }}
                    leftIcon={<ChevronLeftIcon />}
                    onClick={handleBack}
                    variant="ghost"
                >
                    Wstecz
                </Button>

                <Button
                    bgColor="gray.800"
                    color="white"
                    disabled={disableNextButton}
                    flexGrow={{ base: 1, md: 0 }}
                    rightIcon={<ChevronRightIcon />}
                    variant="outline"
                    onClick={disableNextButton ? undefined : handleForward}
                    _active={{ bgColor: 'gray.800' }}
                    _hover={{ bgColor: 'gray.600' }}
                >
                    Dalej
                </Button>
            </HStack>
        </>
    );
};

export default StepThreeForm;
