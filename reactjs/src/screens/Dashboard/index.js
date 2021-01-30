import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "semantic-ui-react";
import { Bar, Line } from "react-chartjs-2";
import {
  getTweetScoresSaga,
  getFrequentEntitiesSaga,
  getLatestTweetsSaga,
} from "../../actions";
import { List, Image, Icon } from "semantic-ui-react";
import { ListGroup } from "react-bootstrap";
import styles from "./styles";

function dynamicColors() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}

function poolColors(a) {
  var pool = [];
  for (let i = 0; i < a; i++) {
    pool.push(dynamicColors());
  }
  return pool;
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
};

class Dashboard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getTweetScoresSaga();
    this.props.getFrequentEntitiesSaga();
    this.props.getLatestTweetsSaga();
  }

  render() {
    const { tweetScores, frequentEntities, latestTweets } = this.props;

    const dataBarGraph = {
      labels: frequentEntities ? frequentEntities.keys : [],
      datasets: [
        {
          label: "Top 20 Most Used Words About Covid",
          data: frequentEntities ? frequentEntities.values : [],
          backgroundColor: poolColors(
            frequentEntities && frequentEntities.keys
              ? frequentEntities.keys.length
              : 0
          ),
          borderColor: poolColors(
            frequentEntities && frequentEntities.keys
              ? frequentEntities.keys.length
              : 0
          ),
          borderWidth: 1,
        },
      ],
    };

    const dataLineGraph = {
      labels: tweetScores ? tweetScores.dates : [],
      datasets: [
        {
          label: "Tweet Positivity By Day (out of 1)",
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
            <Bar data={dataBarGraph} options={options} height={161} />
          </div>
          <div className="col-md-6">
            <div className="row">
              <Line data={dataLineGraph} options={options} height={154.7} />
            </div>
          </div>
        </div>
        <div className="row statistics">
          <div className="col-md-6">
            <Button
              variant="primary"
              style={{
                backgroundColor: "#005379",
                color: "white",
                cursor: "default",
                "min-width": "45%",
              }}
            >
              <Icon size="big" name="line graph" />
              Most used word recently (except covid) :{" "}
              <span style={{ fontSize: "16px" }}>
                {frequentEntities && frequentEntities.keys
                  ? frequentEntities.keys[1]
                  : "covid"}
              </span>
            </Button>
          </div>
          <div className="col-md-6" style={{ right: "5%" }}>
            <Button
              variant="primary"
              style={{
                backgroundColor: "#005379",
                color: "white",
                cursor: "default",
                "min-width": "45%",
              }}
            >
              <Icon size="big" name="smile" />
              Average of Tweet Score Positivity:{" "}
              {tweetScores ? tweetScores.average_tweet_score : ""} / 10
            </Button>
          </div>
        </div>
        <div className="row tweets">
          <div className="col-md-12">
            <ListGroup>
              <ListGroup.Item
                style={{ backgroundColor: "#005379", color: "white" }}
              >
                <Icon size="large" name="list" />
                Recent Tweets
              </ListGroup.Item>
              {latestTweets &&
                latestTweets.results &&
                latestTweets.results.length > 0 &&
                latestTweets.results.map(({ text }, i) => (
                  <ListGroup.Item key={i}>
                    <Icon
                      size="large"
                      name="twitter"
                      style={{ "padding-right": "30px", color: "#1DA1F2" }}
                    />
                    {text}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tweetScores: state.usersReducer.tweetScores,
  frequentEntities: state.usersReducer.frequentEntities,
  latestTweets: state.usersReducer.latestTweets,
});

const mapDispatchToProps = (dispatch) => ({
  getTweetScoresSaga: () => dispatch(getTweetScoresSaga()),
  getFrequentEntitiesSaga: () => dispatch(getFrequentEntitiesSaga()),
  getLatestTweetsSaga: () => dispatch(getLatestTweetsSaga()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
