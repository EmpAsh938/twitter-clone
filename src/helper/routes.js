import { Route, Redirect } from "react-router-dom"


export const ProtectedRoute = ({ children, user, ...rest }) => {
  return (
    <Route
    {...rest}
    render={({ location }) => {
      if (user) {
        return children;
      }
      return (
        <Redirect
        to={{
          pathname: "/signin",
          state: { from: location },
        }}
        />
        )
      }}
      />
      )
    }
    export const UserRedirect = ({ children, user, ...rest }) => {
      return (
      <Route
        {...rest}
        render={({ location }) => {
          if (!user) {
            return children;
          }
          return (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: location },
              }}
            />
          )
        }}
      />
    )
  }