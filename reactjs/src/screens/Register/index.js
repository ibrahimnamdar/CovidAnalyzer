import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import { registerUserSaga } from "../../actions";

import styles from "./styles";

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  constructor() {
    super();
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
  }

  handleBtnOnClick() {
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords don't match");
    } else {
      this.props.registerUserSaga({
        username: this.state.username,
        password: this.state.password,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container align">
          <div className="row">
            <div className="col-md-6">
              <Form>
                <h2>Register</h2>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      this.state.username = e.target.value;
                    }}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      this.state.password = e.target.value;
                    }}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm Your Password</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      this.state.confirmPassword = e.target.value;
                    }}
                    type="password"
                    placeholder="Confirm Your Password"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={this.handleBtnOnClick}
                >
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.usersReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  registerUserSaga: (data) => dispatch(registerUserSaga(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
