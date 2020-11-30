import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// import useDispatch from '@hooks/dispatch';
// import { getIsAppload, appLoadAsync } from '@slices/homeSlice';
// import { getIsAppload } from '@slices/homeSlice';
import { ROUTES } from '@config/app';
import GuardedRoute from '@services/GuardeRoute';
import { getIsLogged } from '@slices/userSlice';

import Conversations from '@screens/Home';
import Browser from '@screens/Browser';
import Faq from '@screens/Faq';
import Home from '@screens/Home';
import Login from '@screens/Login';
import Profile from '@screens/Profile';
import PageNotFound from '@screens/PageNotFound';
import Proposal from '@screens/Proposal';
import Register from '@screens/Register';
import RemindPassword from '@screens/RemindPassword';
import UserProfile from '@screens/UserProfile';

// TODO: try to remove .eslintrc and devDependencies

// TODO: add  "pre-push": "yarn test" to package.json
const App: React.FC = () => {
    const isLogged = useSelector(getIsLogged);

    // useEffect(() => {
    // dispatchLoadAppAsync(true);
    // });

    return (
        <BrowserRouter>
            <Switch>
                <Route path={ROUTES.BROWSER} component={Browser} exact />
                <Route path={ROUTES.FAQ} component={Faq} />
                <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.REGISTER} component={Register} />
                <Route path={ROUTES.REMIND_PASSWORD} component={RemindPassword} exact />
                <GuardedRoute isLogged={isLogged} component={Conversations} path={ROUTES.CONVERSATIONS} exact />
                <GuardedRoute isLogged={!isLogged} component={Home} path={ROUTES.HOME} />
                <GuardedRoute isLogged={isLogged} component={Proposal} path={ROUTES.PROPOSAL} />
                <GuardedRoute isLogged={isLogged} component={UserProfile} path={ROUTES.USER} />
                <GuardedRoute isLogged={isLogged} component={Profile} path={ROUTES.PROFILE} />
                <Route component={PageNotFound} path={ROUTES.NOT_FOUND} />
                <Redirect from="/*" to={ROUTES.NOT_FOUND} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
