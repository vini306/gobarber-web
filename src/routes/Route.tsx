import React from 'react';
import {
  RouteProps as ReactDOMRouterProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDOMRouterProps {
  isPrivated?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivated = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivated === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivated ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
