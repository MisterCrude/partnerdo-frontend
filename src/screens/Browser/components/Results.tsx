import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '@config/app';

import { VStack } from '@chakra-ui/react';
import Card from '@components/Card';

interface IProps {
    isAuth: boolean;
}

// eslint-disable-next-line
const Results: React.FC<IProps> = ({ isAuth }) => {
    const history = useHistory();

    const handleUserClick = () => history.push(`${ROUTES.USER_PROFILE}/some-user-id`);
    const handleTitleClick = () => history.push(`${ROUTES.PROPOSALS}/some-proposal-id`);

    return (
        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
            <Card onUserClick={handleUserClick} onTitleClick={handleTitleClick} />
        </VStack>
    );
};

export default Results;
