import React from 'react';

import Card from '@components/Card';
import { VStack, Flex } from '@chakra-ui/react';
import Pagination from '@components/Pagination';

const MyProposals: React.FC = () => {
    return (
        <>
            <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }} mb={4}>
                <Card isEditable isHeadLess />
                <Card isEditable isHeadLess />
                <Card isEditable isHeadLess />
                <Card isEditable isHeadLess />
                <Card isEditable isHeadLess />
            </VStack>

            <Flex justify="center" mt={10}>
                <Pagination />
            </Flex>
        </>
    );
};

export default MyProposals;
