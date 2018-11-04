import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

import { Provider } from "react-redux";
import store from "./store";

import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddAnimal from './components/animals/AddAnimal';
import EditAnimal from './components/animals/EditAnimal';
import AnimalDetails from './components/animals/AnimalDetails';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <div className="container">
              <Switch>
                <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                <Route exact path="/animal/add" component={UserIsAuthenticated(AddAnimal)} />
                <Route exact path="/animal/edit/:id" component={UserIsAuthenticated(EditAnimal)} />
                <Route exact path="/animal/:id" component={UserIsAuthenticated(AnimalDetails)} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
