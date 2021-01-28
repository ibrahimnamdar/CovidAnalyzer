import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import { getTokenSaga } from "../../actions";

import styles from "./styles";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  constructor() {
    super();
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
  }

  handleBtnOnClick() {
    this.props.getTokenSaga({
      username: this.state.username,
      password: this.state.password,
    });
  }

  render() {
    const { token } = this.props;

    return (
      <div style={{ "min-height": "1000px" }}>
        <div style={{ width: "50%", margin: "5% 0 0 35%" }}>
          <div className="row">
            <div className="col-md-6">
              <Form>
                <h2>Login</h2>
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
                <Button
                  variant="primary"
                  type="button"
                  onClick={this.handleBtnOnClick}
                >
                  Submit
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
  getTokenSaga: (data) => dispatch(getTokenSaga(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
