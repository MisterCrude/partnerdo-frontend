import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { getIsAuth } from '@slices/userSlice';

interface IProps {
    component: React.FC;
    redirectTo?: string;
}

const GuardedRoute: React.FC<IProps & RouteProps> = ({ component: Component, redirectTo = '/', ...rest }) => {
    const isAuth = useSelector(getIsAuth);

    return <Route {...rest} render={(props) => (isAuth ? <Component {...props} /> : <Redirect to={redirectTo} />)} />;
};

export default GuardedRoute;
