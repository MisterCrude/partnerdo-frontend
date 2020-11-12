import React from 'react';

import { Box } from '@chakra-ui/core';
import Footer from '@components/Footer';
import Header from '@components/Header';
import ToolsBar from '@components/ToolsBar';

const isLoggedin = false;
const hasMessages = true;

export const Main: React.FC = ({ children }) => {
    return (
        <Box as="main">
            <Header isLoggedin={isLoggedin} hasMessages={hasMessages} />
            {children}
            <Footer />
            <ToolsBar hasMessages={hasMessages} isLoggedin={isLoggedin} mobileOnly={true} />
        </Box>
    );
};

export default Main;
