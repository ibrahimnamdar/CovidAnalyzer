import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "semantic-ui-react";
import { Bar, Line } from "react-chartjs-2";
import { getSearchDataSaga } from "../../actions";
import { List, Image, Icon } from "semantic-ui-react";
import { ListGroup, Form } from "react-bootstrap";

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

class Search extends Component {
  state = {
    keyword: "",
    loading: false,
  };

  constructor() {
    super();
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
  }

  handleBtnOnClick() {
    this.state.loading = true;
    this.props.getSearchDataSaga(this.state.keyword);
  }

  render() {
    const { searchData } = this.props;

    let frequentEntities = searchData;
    let latestTweets = searchData ? searchData.tweets : {};
    this.state.loading = searchData ? searchData.loading : true;
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

    return (
      <div>
        {this.state.loading && (
          <div
            style={{
              position: "absolute",
              left: "10%",
              width: "100%",
              height: "100%",
              display: "block",
              backgroundColor: "white",
              zIndex: "998",
            }}
          >
            <img
              src="/loading.gif"
              style={{
                position: "absolute",
                width: "500px",
                height: "500px",
                zIndex: "999",
                left: "30%",
                top: "5%",
              }}
            />
            <h2
              style={{
                position: "absolute",
                zIndex: "999",
                left: "37%",
                top: "45%",
              }}
            >
              This may take a while...
            </h2>
          </div>
        )}

        <div className="row" style={{ padding: "15px" }}>
          <div className="col-md-12">
            <Form style={{ position: "relative", left: "10%" }}>
              <h2>Search</h2>
              <Form.Group controlId="formBasicSearch">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Search for a keyword related to covid (e.g. vaccine)
                </Form.Label>
                <Form.Control
                  onChange={(e) => {
                    this.state.keyword = e.target.value;
                  }}
                  type="text"
                  placeholder="Search"
                  style={{ width: "20%" }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="button"
                onClick={this.handleBtnOnClick}
                style={{ backgroundColor: "#005379", color: "white" }}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
        <div className="row dashboard">
          <div className="col-md-12">
            <Bar data={dataBarGraph} options={options} height={100} />
          </div>
        </div>
        <div className="row statistics-search">
          <div className="col-md-6">
            <Button
              type="button"
              variant="primary"
              style={{
                backgroundColor: "#005379",
                color: "white",
                cursor: "default",
                "min-width": "70%",
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
        </div>
        <div className="row tweets-search">
          <div className="col-md-12">
            <ListGroup>
              <ListGroup.Item
                style={{ backgroundColor: "#005379", color: "white" }}
              >
                <Icon size="large" name="list" />
                Recent Tweets
              </ListGroup.Item>
              {latestTweets &&
                latestTweets.length > 0 &&
                latestTweets.map(({ text }, i) => (
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
  searchData: state.usersReducer.searchData,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchDataSaga: (keyword) => dispatch(getSearchDataSaga(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
