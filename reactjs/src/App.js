import React, { Component } from "react";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import store, { history } from "./store";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";

import RequireAuth from "./middlewares/RequireAuth";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default class App extends Component {
  handleLogoutClick() {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    window.location.href = "/login";
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Navbar bg="primary" variant="dark">
              <Navbar.Brand href="/dashboard">Covid Analyzer</Navbar.Brand>
              <Nav className="mr-auto" />
              <Nav.Link href="#"></Nav.Link>
              <NavDropdown
                title={
                  localStorage.getItem("username")
                    ? localStorage.getItem("username")
                    : ""
                }
                id="collasible-nav-dropdown"
                className="justify-content-end"
              >
                <NavDropdown.Item href="#" onClick={this.handleLogoutClick}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={RequireAuth(Home)} />
            <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
