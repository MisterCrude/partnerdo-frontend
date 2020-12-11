import React from 'react';

import { VStack } from '@chakra-ui/react';
import Card from '@components/Card';

const Results: React.FC = () => {
    return (
        <VStack alignItems="stretch" spacing={8}>
            <Card />
            <Card />
            <Card />
            <Card />
        </VStack>
    );
};

export default Results;
