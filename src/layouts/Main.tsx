import React from 'react';
import { useSelector } from 'react-redux';

import { getIsLogged, logoutUser } from '@slices/userSlice';
import useDispatch from '@hooks/dispatch';

import { Box } from '@chakra-ui/core';
import Footer from '@components/Footer';
import Header from '@components/Header';
import ToolsBar from '@components/ToolsBar';

const hasMessages = true;

export const Main: React.FC = ({ children }) => {
    const isLogged = useSelector(getIsLogged);
    const logout = useDispatch(logoutUser);

    return (
        <Box as="main">
            <Header isLoggedin={isLogged} hasMessages={hasMessages} onLogout={logout} />
            {children}
            <Footer />
            <ToolsBar hasMessages={hasMessages} isLoggedin={isLogged} mobileOnly={true} />
        </Box>
    );
};

export default Main;
