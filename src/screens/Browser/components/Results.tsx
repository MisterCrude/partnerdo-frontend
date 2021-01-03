import React from 'react';

import { VStack } from '@chakra-ui/react';
import Card from '@components/Card';

interface IProps {
    isAuth: boolean;
}

const Results: React.FC<IProps> = ({ isAuth }) => {
    return (
        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
            <Card userId={isAuth ? 'some-user-id' : ''} />
            <Card userId={isAuth ? 'some-user-id' : ''} />
            <Card userId={isAuth ? 'some-user-id' : ''} />
            <Card userId={isAuth ? 'some-user-id' : ''} />
        </VStack>
    );
};

export default Results;
