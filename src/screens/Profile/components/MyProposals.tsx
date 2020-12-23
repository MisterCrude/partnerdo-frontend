import React from 'react';

import Card from '@components/Card';
import { VStack } from '@chakra-ui/react';

const MyProposals: React.FC = () => {
    return (
        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }} mb={4}>
            <Card isEditable isHeadLess />
            <Card isEditable isHeadLess />
            <Card isEditable isHeadLess />
            <Card isEditable isHeadLess />
            <Card isEditable isHeadLess />
        </VStack>
    );
};

export default MyProposals;
