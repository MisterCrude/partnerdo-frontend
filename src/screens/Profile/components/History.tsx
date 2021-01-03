import React from 'react';

import Card from '@components/Card';
import { VStack, Flex } from '@chakra-ui/react';
import Pagination from '@components/Pagination';

const History: React.FC = () => {
    return (
        <>
            <VStack align="stretch" spacing={{ base: 4, md: 8 }} mb={4}>
                <Card />
                <Card />
                <Card />
            </VStack>
            <Flex justify="center" mt={10}>
                <Pagination />
            </Flex>
        </>
    );
};

export default History;
