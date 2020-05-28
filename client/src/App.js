import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, userLogout } from "./actions/authActions";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/create-profile/AddExperience";
import AddEducation from "./components/create-profile/AddEducation";
function App() {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decode = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decode));
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      store.dispatch(userLogout());
    }
  }

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Route exact component={Landing} path="/" />
          <div className="container">
            <Route exact component={Login} path="/login" />
            <Route exact component={Register} path="/register" />
            <Switch>
              <PrivateRoute exact component={Dashboard} path="/dashboard" />
              <PrivateRoute
                exact
                component={CreateProfile}
                path="/create-profile"
              />
              <PrivateRoute
                exact
                component={EditProfile}
                path="/edit-profile"
              />
              <PrivateRoute
                exact
                component={AddExperience}
                path="/add-experience"
              />

              <PrivateRoute
                exact
                component={AddEducation}
                path="/add-education"
              />
            </Switch>
          </div>

          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
