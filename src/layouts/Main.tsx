import React from 'react';
import { useSelector } from 'react-redux';

import { getIsAuth, logoutUser } from '@slices/userSlice';
import useDispatch from '@hooks/dispatch';

import { Box } from '@chakra-ui/core';
import Footer from '@components/Footer';
import Header from '@components/Header';
import ToolsBar from '@components/ToolsBar';

const hasMessages = true;

export const Main: React.FC = ({ children }) => {
    const isAuth = useSelector(getIsAuth);
    const logout = useDispatch(logoutUser);

    return (
        <Box as="main">
            <Header isAuth={isAuth} hasMessages={hasMessages} onLogout={logout} />
            {children}
            <Footer />
            <ToolsBar hasMessages={hasMessages} isAuth={isAuth} mobileOnly={true} />
        </Box>
    );
};

export default Main;
