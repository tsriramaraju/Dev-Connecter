import React, { Fragment, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Register from './components/auth/Registration';
import Login from './components/auth/Login';
import Alert from './components/UI elements/Alert';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './utils/setAuthHeader';
import { loadUser } from './redux/actions/auth';
import Privateroute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Developers from './components/developers/Developers';
import Profile from './components/profile/Profile';
import Createprofile from './components/profile udates/CreateProfile';
import AddEducation from './components/profile udates/AddEducation';
import AddExperience from './components/profile udates/AddExperience';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/developers" exact component={Developers} />
          <Route path="/profile/:id" exact component={Profile} />
          <Privateroute path="/dashboard" exact component={Dashboard} />
          <Privateroute path="/createprofile" exact component={Createprofile} />
          <Privateroute path="/addeducation" exact component={AddEducation} />
          <Privateroute path="/addexperience" exact component={AddExperience} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
