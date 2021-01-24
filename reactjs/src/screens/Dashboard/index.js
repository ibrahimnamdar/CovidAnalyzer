import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "semantic-ui-react";
import { Bar, Line, Pie } from "react-chartjs-2";

import { getTweetScoresSaga } from "../../actions";

import styles from "./styles";

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
};

class Dashboard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getTweetScoresSaga();
  }

  render() {
    const { tweetScores } = this.props;
    console.log("tweetScores" + JSON.stringify(tweetScores));
    const data = {
      labels: tweetScores ? tweetScores.dates : [],
      datasets: [
        {
          label: "# of Votes",
          data: tweetScores ? tweetScores.tweet_scores : [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div>
        <div className="row dashboard">
          <div className="col-md-6">
            <Bar data={data} options={options} height={154.7} />
          </div>
          <div className="col-md-6">
            <div className="row">
              <Line data={data} options={options} height={75} />
            </div>
            <div className="row">
              <Pie data={data} options={options} height={75} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tweetScores: state.usersReducer.tweetScores,
});

const mapDispatchToProps = (dispatch) => ({
  getTweetScoresSaga: () => dispatch(getTweetScoresSaga()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
