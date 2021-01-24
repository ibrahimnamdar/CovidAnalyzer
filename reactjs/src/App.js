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
import Landing from "./screens/Landing";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

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
                style={{ color: "#FFFFFF" }}
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
            <Sidebar.Pushable
              as={Segment}
              style={{
                height: "1000px",
                margin: "0 0 0 -10px",
                border: "none",
                padding: "0",
              }}
            >
              <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                vertical
                visible
                width="thin"
                style={{ backgroundColor: "#005379" }}
              >
                <Menu.Item as="a" href="/">
                  <Icon name="home" />
                  Home
                </Menu.Item>
                <Menu.Item as="a" href="/dashboard">
                  <Icon name="chart area" />
                  Dashboard
                </Menu.Item>
                <Menu.Item as="a">
                  <Icon name="search" />
                  Search
                </Menu.Item>
                <Menu.Item as="a">
                  <Icon name="cloud" />
                  Most Used Words
                </Menu.Item>
              </Sidebar>

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/dashboard"
                component={RequireAuth(Dashboard)}
              />
            </Sidebar.Pushable>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
