import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import { getIsAuth, logoutUserAsync } from '@slices/userSlice';
import useDispatch from '@hooks/dispatch';

import { Flex } from '@chakra-ui/core';
import Footer from '@components/Footer';
import Header from '@components/Header';
import ToolsBar from '@components/ToolsBar';

const hasMessages = true;

export const Main: React.FC = ({ children }) => {
    const history = useHistory();
    const isAuth = useSelector(getIsAuth);
    const logout = useDispatch<History>(logoutUserAsync);

    const handleLogout = () => logout(history);

    return (
        <Flex as="main" minH="100vh" flexDir="column">
            <Header isAuth={isAuth} hasMessages={hasMessages} onLogout={handleLogout} />
            {children}
            <Footer />
            <ToolsBar hasMessages={hasMessages} isAuth={isAuth} mobileOnly={true} />
        </Flex>
    );
};

export default Main;
