import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { getIsAuthSelector, logoutProfileAsync } from '@slices/profileSlice';
import { getHasNewMessageSelector } from '@slices/chatroomsSlice';
import useDispatch from '@hooks/useDispatch';

import { BoxProps, Container, Flex } from '@chakra-ui/react';
import Footer from '@components/Footer';
import Header from '@components/Header';
import ToolsBar from '@components/ToolsBar';

export const Main = (props: BoxProps) => {
    const history = useHistory();
    const isAuth = useSelector(getIsAuthSelector);
    const hasMessages = useSelector(getHasNewMessageSelector);
    const logout = useDispatch<History>(logoutProfileAsync);
    const children = props.children;

    const handleLogout = () => logout(history);

    return (
        <Flex as="main" minH="100vh" flexDir="column">
            <Header isAuth={isAuth} hasMessages={hasMessages} onLogout={handleLogout} />
            <Container as="section" px={{ base: 4, sm: 8 }} maxW="7xl" flexGrow={1} {...props}>
                {children}
            </Container>
            <Footer />
            <ToolsBar hasMessages={hasMessages} isAuth={isAuth} mobileOnly={true} />
        </Flex>
    );
};

export default Main;
