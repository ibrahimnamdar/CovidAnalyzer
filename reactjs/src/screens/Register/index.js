import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'semantic-ui-react';
import { Bar, Line, Pie } from 'react-chartjs-2'

import { getUsersSaga } from '../../actions';

import styles from './styles';

class Register extends Component {

  render() {
    return (
      <div>
        <h1>Very early work in progress</h1>
        <div className='row'>
          <div className='col-md-6'>
            <Bar data={data} options={options} height={154.7} />
          </div>
          <div className='col-md-6'>
            <div className='row' >
              <Line data={data} options={options} height={75} />
            </div>
            <div className='row'  >
              <Pie data={data} options={options} height={75} />

            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Register;
