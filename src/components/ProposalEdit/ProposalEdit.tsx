import React from 'react';

import { CATEGORIES_DATA } from '@consts/app';
import { CITIES } from '@consts/filters';
import { IOption } from '@models/app';

import { Box, Grid, Input, Textarea } from '@chakra-ui/react';
import MenuSelect from '@components/MenuSelect';

// TODO remove this fake data
const cities: IOption[] = CITIES.map((item) => ({ value: item, label: item }));
const categories: IOption[] = CATEGORIES_DATA.map(({ name }) => ({ value: name.toLocaleLowerCase(), label: name }));

export const ProposalEdit: React.FC = () => (
    <>
        <Box mb={{ base: 4, md: 8 }}>
            <Input
                // borderColor={errors.username ? 'tomato' : 'gray.200'}
                // borderWidth={errors.username ? 1 : 0}
                borderWidth={0}
                name="name"
                // ref={register}
                type="text"
                placeholder="Nazwa partnerstwa"
                size="lg"
                shadow="base"
            />
            {/* {errors.email && (
                    <Text color="tomato" fontSize={15}>
                        {errors.email.message}
                    </Text>
                )} */}
        </Box>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 8 }} mb={{ base: 4, md: 8 }}>
            <MenuSelect options={cities} palceholder="Miasto" />
            <MenuSelect options={cities} palceholder="Dzielnica" />
            <MenuSelect options={categories} palceholder="Kategoria" />
        </Grid>
        <Box>
            <Textarea
                // borderColor={errors.username ? 'tomato' : 'gray.200'}
                // borderWidth={errors.username ? 1 : 0}
                borderWidth={0}
                h={64}
                name="surname"
                // ref={register}
                resize="none"
                type="text"
                placeholder="Opis partnerstwa"
                size="lg"
                shadow="base"
            />
            {/* {errors.email && (
                    <Text color="tomato" fontSize={15}>
                        {errors.email.message}
                    </Text>
                )} */}
        </Box>
    </>
);
