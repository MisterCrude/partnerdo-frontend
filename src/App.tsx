import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { getIsAuthSelector } from '@slices/profileSlice';
import { ROUTES } from '@consts/routes';
import { useSelector } from 'react-redux';
import GuardedRoute from '@services/GuardeRoute';

import Browser from '@screens/Browser';
import Conversation from '@screens/Conversation';
import Chat from '@screens/Chat';
import Faq from '@screens/Faq';
import Home from '@screens/Home';
import Login from '@screens/Login';
import PageNotFound from '@screens/PageNotFound';
import Profile from '@screens/Profile';
import Proposal from '@screens/Proposal';
import ProposalCreate from '@screens/ProposalCreate';
import Register from '@screens/Register';
import RemindPassword from '@screens/RemindPassword';
import RemindPasswordNew from '@screens/RemindPasswordNew';
import UserProfile from '@screens/UserProfile';

interface IProps {
    isAuth: boolean;
}

const RoutesSwitcher: React.FC<IProps> = ({ isAuth }) => {
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, [history]);

    return (
        <Switch>
            {!isAuth && [
                <Route component={Login} key="Login" path={ROUTES.LOGIN} />,
                <Route component={Register} key="Register" path={ROUTES.REGISTER} />,
                <Route component={RemindPassword} key="RemindPassword" path={ROUTES.REMIND_PASSWORD} exact />,
                <Route component={RemindPasswordNew} key="RemindPasswordNew" path={ROUTES.REMIND_PASSWORD_NEW} exact />,
                <Route component={Home} exact key="Home" path={ROUTES.ROOT} />,
            ]}
            <Route component={Browser} path={ROUTES.PROPOSALS} exact />

            <Route path={ROUTES.FAQ}>
                <Faq isAuth={isAuth} />
            </Route>

            <GuardedRoute exact component={Chat} path={ROUTES.CHAT} isAuth={isAuth} />
            <GuardedRoute component={Conversation} path={`${ROUTES.CHAT}/:conversationId`} isAuth={isAuth} />
            <GuardedRoute component={ProposalCreate} path={ROUTES.PROPOSALS_CREATE} isAuth={isAuth} />
            <Route path={ROUTES.PROPOSALS}>
                <Proposal isAuth={isAuth} />
            </Route>
            <GuardedRoute component={UserProfile} path={ROUTES.USER_PROFILE} isAuth={isAuth} />
            <GuardedRoute component={Profile} path={ROUTES.PROFILE} isAuth={isAuth} />

            <Route path={ROUTES.NOT_FOUND}>
                <PageNotFound isAuth={isAuth} />
            </Route>
            <Redirect from="/*" to={ROUTES.NOT_FOUND} />
        </Switch>
    );
};

const App: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector);

    return (
        <BrowserRouter>
            <RoutesSwitcher isAuth={isAuth} />
        </BrowserRouter>
    );
};

export default App;
