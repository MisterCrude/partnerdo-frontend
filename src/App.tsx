import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch, useHistory } from 'react-router-dom';

import { ROUTES } from '@config/app';
import GuardedRoute from '@services/GuardeRoute';
import { getIsAuth } from '@slices/userSlice';

import Conversations from '@screens/Conversations';
import ConversationMessages from '@screens/ConversationMessages';
import Browser from '@screens/Browser';
import Faq from '@screens/Faq';
import Home from '@screens/Home';
import Login from '@screens/Login';
import Profile from '@screens/Profile';
import PageNotFound from '@screens/PageNotFound';
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
                <Route component={Home} key="Home" path={ROUTES.HOME} />,
            ]}
            <Route component={Browser} path={ROUTES.BROWSER} exact />
            <Route component={Faq} path={ROUTES.FAQ} />

            <GuardedRoute exact component={Conversations} path={ROUTES.CONVERSATIONS} isAuth={isAuth} />
            <GuardedRoute
                component={ConversationMessages}
                path={`${ROUTES.CONVERSATIONS}/:conversationId`}
                isAuth={isAuth}
            />
            <GuardedRoute component={ProposalCreate} path={ROUTES.CONVERSATIONS} isAuth={isAuth} />
            <Route path={ROUTES.PROPOSAL}>
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

// TODO: try to remove .eslintrc and devDependencies

// TODO: add  "pre-push": "yarn test" to package.json
const App: React.FC = () => {
    const isAuth = useSelector(getIsAuth);

    return (
        <BrowserRouter>
            <RoutesSwitcher isAuth={isAuth} />
        </BrowserRouter>
    );
};

export default App;
