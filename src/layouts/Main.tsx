import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { logoutProfileAsync } from '@slices/profileSlice';
import { isAuthSelector } from '@selectors/profileSelectors';
import { hasNotificationSelector } from '@selectors/chatroomSelectors';
import useDispatch from '@hooks/useDispatch';

import { BoxProps, Container, Flex } from '@chakra-ui/react';
import Footer from '@components/Footer';
import Header from '@components/Header';
import ToolsBar from '@components/ToolsBar';

export const Main = (props: BoxProps) => {
    const history = useHistory();
    const isAuth = useSelector(isAuthSelector);
    const hasNotification = useSelector(hasNotificationSelector);
    const logout = useDispatch<History>(logoutProfileAsync);
    const children = props.children;

    const handleLogout = () => logout(history);

    return (
        <Flex as="main" minH="100vh" flexDir="column">
            <Header isAuth={isAuth} hasNotification={hasNotification} onLogout={handleLogout} />
            <Container as="section" px={{ base: 4, sm: 8 }} maxW="7xl" flexGrow={1} {...props}>
                {children}
            </Container>
            <Footer />
            <ToolsBar hasNotification={hasNotification} isAuth={isAuth} mobileOnly={true} />
        </Flex>
    );
};

export default Main;
