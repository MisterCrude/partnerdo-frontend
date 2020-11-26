import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// import useDispatch from '@hooks/dispatch';
// import { getIsAppload, appLoadAsync } from '@slices/homeSlice';
// import { getIsAppload } from '@slices/homeSlice';
import { ROUTES } from '@config/app';

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
    // const dispatchLoadAppAsync = useDispatch<typeof appLoadAsync, boolean>(appLoadAsync);
    // const selectIsAppload: boolean = useSelector(getIsAppload);

    useEffect(() => {
        // dispatchLoadAppAsync(true);
    });

    return (
        <BrowserRouter>
            <Switch>
                <Route path={ROUTES.BROWSER} component={Browser} exact />
                <Route path={ROUTES.HOME} component={Home} />
                <Route path={ROUTES.FAQ} component={Faq} />
                <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.REGISTER} component={Register} />
                <Route path={ROUTES.REMIND_PASSWORD} component={RemindPassword} exact />
                <Route path={ROUTES.CONVERSATIONS} component={Conversations} exact />
                <Route path={ROUTES.PROPOSAL} component={Proposal} />
                <Route path={ROUTES.USER} component={UserProfile} />
                <Route path={ROUTES.PROFILE} component={Profile} />
                <Route path={ROUTES.NOT_FOUND} component={PageNotFound} />
                <Redirect from="/*" to={ROUTES.NOT_FOUND} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
