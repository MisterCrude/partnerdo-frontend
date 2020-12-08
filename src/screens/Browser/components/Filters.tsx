import React from 'react';

import { Box, Grid, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { SearchIcon } from '@theme/customIcons';

const Filters: React.FC = () => (
    <Box my={10}>
        <InputGroup mb={6}>
            <InputLeftElement pointerEvents="none" h="100%" children={<SearchIcon fontSize={24} color="gray.300" />} />
            <Input
                borderWidth={0}
                backgroundColor="white"
                placeholder="Jakiego partnerstwa szukasz?"
                size="lg"
                shadow="base"
            />
        </InputGroup>

        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Select borderWidth={0} backgroundColor="white" placeholder="Zakres wiekowy" size="lg" shadow="base" />
            <Select borderWidth={0} backgroundColor="white" placeholder="Zakres wiekowy" size="lg" shadow="base" />
            <Select borderWidth={0} backgroundColor="white" placeholder="Zakres wiekowy" size="lg" shadow="base" />
        </Grid>
    </Box>
);

export default Filters;
