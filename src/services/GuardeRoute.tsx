import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IProps {
    component: React.FC;
    isAuth: boolean;
    redirectTo?: string;
}

const GuardedRoute: React.FC<IProps & RouteProps> = ({ component: Component, isAuth, redirectTo = '/', ...rest }) => {
    return <Route {...rest} render={(props) => (isAuth ? <Component {...props} /> : <Redirect to={redirectTo} />)} />;
};

export default GuardedRoute;
