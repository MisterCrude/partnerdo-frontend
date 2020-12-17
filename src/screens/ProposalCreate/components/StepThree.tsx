import React from 'react';

import { VStack, Input, Textarea } from '@chakra-ui/react';

export const StepTwo: React.FC = () => (
    <VStack align="stretch" spacing={{ base: 6, md: 8 }} w="100%">
        <Input
            borderWidth={0}
            name="name"
            // ref={register}
            type="text"
            placeholder="Tytuł partnerstwa"
            size="lg"
            shadow="base"
        />
        <Textarea
            borderWidth={0}
            h={40}
            name="surname"
            // ref={register}
            resize="none"
            type="text"
            placeholder="Opis partnerstwa"
            size="lg"
            shadow="base"
        />
    </VStack>
);

export default StepTwo;
