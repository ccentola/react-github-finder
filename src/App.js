import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import About from './components/About';
import User from './components/User';
import Home from './components/Home';
import NotFound from './components/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => (
  <GithubState>
    <AlertState>
      <BrowserRouter>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className="ui container">
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route path="/user/:login" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AlertState>
  </GithubState>
);

export default App;
