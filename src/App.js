import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { LANDING, SIGNIN, SIGNUP, HOME } from "./helper/paths";
import { ProtectedRoute, UserRedirect } from "./helper/routes";
import { setLogStatus } from "./redux/appSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('authUser'));
    if (getUser) {
      dispatch(setLogStatus(getUser));
    }
  }, [])
  const user = useSelector(state => state.app.isLoggedIn);

  return (
    <Router>
      <Switch>
        <UserRedirect path={LANDING} user={user} exact>
          <Account />

        </UserRedirect>
        <UserRedirect path={SIGNIN} user={user} >
          <SignIn />

        </UserRedirect>
        <UserRedirect path={SIGNUP} user={user}>
          <SignUp />

        </UserRedirect>
        <ProtectedRoute path={HOME} user={user}>
          <Home />
        </ProtectedRoute>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
