import React, { Fragment } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Register from './components/Registration';
import Login from './components/Login';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
);

export default App;
