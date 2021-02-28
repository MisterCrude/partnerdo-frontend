import React from 'react';

import { CITIES } from '@consts/filters';
import { IOption } from '@models/app';
import { toOptions } from '@utils/misc';

import { VStack } from '@chakra-ui/react';
import MenuSelect from '@components/MenuSelect';

const cities: IOption[] = toOptions(CITIES);

export const StepThree: React.FC = () => (
    <VStack align="stretch" spacing={{ base: 6, md: 8 }} w="100%">
        <MenuSelect options={cities} palceholder="Miasto" />
        <MenuSelect options={cities} palceholder="Dzielnica" />
    </VStack>
);

export default StepThree;
