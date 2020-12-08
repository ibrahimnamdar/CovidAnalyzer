import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap'

import { getUsersSaga } from '../../actions';

import styles from './styles';

class Login extends Component {

  render() {
    return (
      <div>
        <form>
          <h1>Covid Analyzer</h1>
          <Button variant="success">Login</Button>
          <Button variant="primary">Register</Button>
        </form>
      </div>
    );
  }
}


export default Login;
