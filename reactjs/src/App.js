import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import store, { history } from './store';
import { Navbar, Nav } from 'react-bootstrap'
import Login from './screens/Login';

import "bootstrap/dist/css/bootstrap.css"
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="#Dashboard">Covid Analyzer</Navbar.Brand>
              <Nav className="mr-auto">
              </Nav>
            </Navbar>
            <Route exact path="/" component={Login} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
