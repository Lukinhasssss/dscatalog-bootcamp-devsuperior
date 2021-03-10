import React from 'react'
import { Route, Redirect } from 'react-router-dom';

type Props = {
  children: React.ReactNode
  path: string
}

const PrivateRoute = ({ children, path }: Props) => {
  const isAuthenticated = false

  return (
    <Route
      path={ path }
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin/auth/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute