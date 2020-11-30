import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IProps {
    component: React.FC;
    isLogged: boolean;
    redirectTo?: string;
}

const GuardedRoute: React.FC<IProps & RouteProps> = ({ component: Component, isLogged, redirectTo = '/', ...rest }) => {
    return <Route {...rest} render={(props) => (isLogged ? <Component {...props} /> : <Redirect to={redirectTo} />)} />;
};

export default GuardedRoute;
