import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'

import { getUsersSaga } from '../../actions';

import styles from './styles';

class Login extends Component {

  render() {
    return (
      <div>
        <div className="container align">
          <div className="row">
            <div className="col-md-6">
              <Form>
                <Form.Text>Covid Analyzer</Form.Text>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
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


export default Login;
