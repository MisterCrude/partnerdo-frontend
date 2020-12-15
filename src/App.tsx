import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { ROUTES } from '@config/app';
import GuardedRoute from '@services/GuardeRoute';
import { getIsAuth } from '@slices/userSlice';

import Conversations from '@screens/Home';
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
import UserProfile from '@screens/UserProfile';

// TODO: try to remove .eslintrc and devDependencies

// TODO: add  "pre-push": "yarn test" to package.json
const App: React.FC = () => {
    const isAuth = useSelector(getIsAuth);

    return (
        <BrowserRouter>
            <Switch>
                {!isAuth && [
                    <Route component={Login} key="Login" path={ROUTES.LOGIN} />,
                    <Route component={Register} key="Register" path={ROUTES.REGISTER} />,
                    <Route component={RemindPassword} key="RemindPassword" path={ROUTES.REMIND_PASSWORD} exact />,
                    <Route component={Home} key="Home" path={ROUTES.HOME} />,
                ]}
                <Route component={Browser} path={ROUTES.BROWSER} exact />
                <Route component={Faq} path={ROUTES.FAQ} />

                <GuardedRoute exact component={Conversations} path={ROUTES.CONVERSATIONS} isAuth={isAuth} />
                <GuardedRoute exact component={Proposal} path={ROUTES.PROPOSAL} isAuth={isAuth} />
                <GuardedRoute component={ProposalCreate} path={ROUTES.PROPOSAL_CREATE} isAuth={isAuth} />
                <GuardedRoute component={UserProfile} path={ROUTES.USER} isAuth={isAuth} />
                <GuardedRoute component={Profile} path={ROUTES.PROFILE} isAuth={isAuth} />

                <Route component={PageNotFound} path={ROUTES.NOT_FOUND} />
                <Redirect from="/*" to={ROUTES.NOT_FOUND} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
