import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "semantic-ui-react";
import { Bar, Line } from "react-chartjs-2";
import { getTweetScoresSaga, getFrequentEntitiesSaga } from "../../actions";
import { List, Image, Icon } from "semantic-ui-react";
import { ListGroup } from "react-bootstrap";
import styles from "./styles";
import ReactWordcloud from "react-wordcloud";

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

class MostUsedWords extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getFrequentEntitiesSaga();
  }

  render() {
    const words = [
      {
        text: "told",
        value: 64,
      },
      {
        text: "mistake",
        value: 11,
      },
      {
        text: "thought",
        value: 16,
      },
      {
        text: "bad",
        value: 17,
      },
      {
        text: "correct",
        value: 10,
      },
      {
        text: "day",
        value: 54,
      },
      {
        text: "prescription",
        value: 12,
      },
      {
        text: "time",
        value: 77,
      },
      {
        text: "thing",
        value: 45,
      },
      {
        text: "left",
        value: 19,
      },
      {
        text: "pay",
        value: 13,
      },
      {
        text: "people",
        value: 32,
      },
      {
        text: "month",
        value: 22,
      },
      {
        text: "again",
        value: 35,
      },
      {
        text: "review",
        value: 24,
      },
      {
        text: "call",
        value: 38,
      },
      {
        text: "doctor",
        value: 70,
      },
      {
        text: "asked",
        value: 26,
      },
      {
        text: "finally",
        value: 14,
      },
      {
        text: "insurance",
        value: 29,
      },
      {
        text: "week",
        value: 41,
      },
      {
        text: "called",
        value: 49,
      },
      {
        text: "problem",
        value: 20,
      },
      {
        text: "going",
        value: 59,
      },
      {
        text: "help",
        value: 49,
      },
      {
        text: "felt",
        value: 45,
      },
      {
        text: "discomfort",
        value: 11,
      },
      {
        text: "lower",
        value: 22,
      },
      {
        text: "severe",
        value: 12,
      },
      {
        text: "free",
        value: 38,
      },
      {
        text: "better",
        value: 54,
      },
      {
        text: "muscle",
        value: 14,
      },
      {
        text: "neck",
        value: 41,
      },
      {
        text: "root",
        value: 24,
      },
      {
        text: "adjustment",
        value: 16,
      },
      {
        text: "therapy",
        value: 29,
      },
      {
        text: "injury",
        value: 20,
      },
      {
        text: "excruciating",
        value: 10,
      },
      {
        text: "chronic",
        value: 13,
      },
      {
        text: "chiropractor",
        value: 35,
      },
      {
        text: "treatment",
        value: 59,
      },
      {
        text: "tooth",
        value: 32,
      },
      {
        text: "chiropractic",
        value: 17,
      },
      {
        text: "dr",
        value: 77,
      },
      {
        text: "relief",
        value: 19,
      },
      {
        text: "shoulder",
        value: 26,
      },
      {
        text: "nurse",
        value: 17,
      },
      {
        text: "room",
        value: 22,
      },
      {
        text: "hour",
        value: 35,
      },
      {
        text: "wait",
        value: 38,
      },
      {
        text: "hospital",
        value: 11,
      },
      {
        text: "eye",
        value: 13,
      },
      {
        text: "test",
        value: 10,
      },
      {
        text: "appointment",
        value: 49,
      },
      {
        text: "medical",
        value: 19,
      },
      {
        text: "question",
        value: 20,
      },
      {
        text: "office",
        value: 64,
      },
      {
        text: "care",
        value: 54,
      },
      {
        text: "minute",
        value: 29,
      },
      {
        text: "waiting",
        value: 16,
      },
      {
        text: "patient",
        value: 59,
      },
      {
        text: "health",
        value: 49,
      },
      {
        text: "alternative",
        value: 24,
      },
      {
        text: "holistic",
        value: 19,
      },
      {
        text: "traditional",
        value: 20,
      },
      {
        text: "symptom",
        value: 29,
      },
      {
        text: "internal",
        value: 17,
      },
      {
        text: "prescribed",
        value: 26,
      },
      {
        text: "acupuncturist",
        value: 16,
      },
      {
        text: "pain",
        value: 64,
      },
      {
        text: "integrative",
        value: 10,
      },
      {
        text: "herb",
        value: 13,
      },
      {
        text: "sport",
        value: 22,
      },
      {
        text: "physician",
        value: 41,
      },
      {
        text: "herbal",
        value: 11,
      },
      {
        text: "eastern",
        value: 12,
      },
      {
        text: "chinese",
        value: 32,
      },
      {
        text: "acupuncture",
        value: 45,
      },
      {
        text: "prescribe",
        value: 14,
      },
      {
        text: "medication",
        value: 38,
      },
      {
        text: "western",
        value: 35,
      },
      {
        text: "sure",
        value: 38,
      },
      {
        text: "work",
        value: 64,
      },
      {
        text: "smile",
        value: 17,
      },
      {
        text: "teeth",
        value: 26,
      },
      {
        text: "pair",
        value: 11,
      },
      {
        text: "wanted",
        value: 20,
      },
      {
        text: "frame",
        value: 13,
      },
      {
        text: "lasik",
        value: 10,
      },
      {
        text: "amazing",
        value: 41,
      },
      {
        text: "fit",
        value: 14,
      },
      {
        text: "happy",
        value: 22,
      },
      {
        text: "feel",
        value: 49,
      },
      {
        text: "glasse",
        value: 19,
      },
      {
        text: "vision",
        value: 12,
      },
      {
        text: "pressure",
        value: 16,
      },
      {
        text: "find",
        value: 29,
      },
      {
        text: "experience",
        value: 59,
      },
      {
        text: "year",
        value: 70,
      },
      {
        text: "massage",
        value: 35,
      },
      {
        text: "best",
        value: 54,
      },
      {
        text: "mouth",
        value: 20,
      },
      {
        text: "staff",
        value: 64,
      },
      {
        text: "gum",
        value: 10,
      },
      {
        text: "chair",
        value: 12,
      },
      {
        text: "ray",
        value: 22,
      },
      {
        text: "dentistry",
        value: 11,
      },
      {
        text: "canal",
        value: 13,
      },
      {
        text: "procedure",
        value: 32,
      },
      {
        text: "filling",
        value: 26,
      },
      {
        text: "gentle",
        value: 19,
      },
      {
        text: "cavity",
        value: 17,
      },
      {
        text: "crown",
        value: 14,
      },
      {
        text: "cleaning",
        value: 38,
      },
      {
        text: "hygienist",
        value: 24,
      },
      {
        text: "dental",
        value: 59,
      },
      {
        text: "charge",
        value: 24,
      },
      {
        text: "cost",
        value: 29,
      },
      {
        text: "charged",
        value: 13,
      },
      {
        text: "spent",
        value: 17,
      },
      {
        text: "paying",
        value: 14,
      },
      {
        text: "pocket",
        value: 12,
      },
      {
        text: "dollar",
        value: 11,
      },
      {
        text: "business",
        value: 32,
      },
      {
        text: "refund",
        value: 10,
      },
    ];
    const { tweetScores, frequentEntities } = this.props;
    console.log("tweetScores" + JSON.stringify(frequentEntities));
    const options = {
      enableTooltip: true,
      deterministic: false,
      fontSizes: [10, 120],
      fontStyle: "normal",
      fontWeight: "normal",
      padding: 1,
      rotations: 3,
      rotationAngles: [0, 90],
      scale: "sqrt",
      spiral: "archimedean",
      transitionDuration: 1000,
    };
    return (
      <div>
        <div
          className="row"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            left: "40%",
          }}
        >
          <div className="col-md-12">
            <h1>Most Used Words During The Pandemic</h1>
          </div>
        </div>
        <div
          className="row"
          style={{
            width: "100%",
            height: "100%",
            "min-height": "1080px",
            position: "relative",
            left: "4.1%",
            top: "-70px",
          }}
        >
          <div className="col-md-12">
            <ReactWordcloud words={words} options={options} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tweetScores: state.usersReducer.tweetScores,
  frequentEntities: state.usersReducer.frequentEntities,
});

const mapDispatchToProps = (dispatch) => ({
  getFrequentEntitiesSaga: () => dispatch(getFrequentEntitiesSaga()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MostUsedWords);