import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";

import styles from "./styles";

class Login extends Component {
  render() {
    return (
      <div>
        <Jumbotron style={{ width: "50%", margin: "10% 0 0 25%" }}>
          <h1>Welcome to CovidAnalyzer!</h1>
          <p>
            CovidAnalyzer lets you see the latest statistics about the current
            covid situation. It uses Twitter API to get information and analyzes
            the data using Natural Language Processing methods.
          </p>
          <p>
            <Button
              style={{ backgroundColor: "#457FA8" }}
              href="/login"
              variant="primary"
            >
              Login
            </Button>
            <p>
              Don't have an account? Click <a href="/register">here</a> to
              register!
            </p>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Login;
