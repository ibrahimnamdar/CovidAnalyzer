import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'semantic-ui-react';
import { Bar, Line, Pie } from 'react-chartjs-2'

import { getUsersSaga } from '../../actions';

import styles from './styles';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

class Dashboard extends Component {

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


export default Dashboard;
