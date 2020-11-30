import React from 'react';
import { useSelector } from 'react-redux';

import { getIsLogged } from '@slices/userSlice';

import { Box } from '@chakra-ui/core';
import Footer from '@components/Footer';
import Header from '@components/Header';
import ToolsBar from '@components/ToolsBar';

const hasMessages = true;

export const Main: React.FC = ({ children }) => {
    const isLogged = useSelector(getIsLogged);

    return (
        <Box as="main">
            <Header isLoggedin={isLogged} hasMessages={hasMessages} />
            {children}
            <Footer />
            <ToolsBar hasMessages={hasMessages} isLoggedin={isLogged} mobileOnly={true} />
        </Box>
    );
};

export default Main;
