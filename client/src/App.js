import React from "react";
import "./App.css";

import Navbar from "./components/Navigation/Nav";
import Home from "./pages/Home/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import store from "./store/store";
import PrivateRoute from "./utils/privateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";

class App extends React.Component {
  componentDidMount() {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
      }
    }
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="wrapper">
          <Switch>
            <Route exact="true" path="/home">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
