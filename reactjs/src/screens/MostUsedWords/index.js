import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "semantic-ui-react";
import { Bar, Line } from "react-chartjs-2";
import { getMostUsedWordsSaga } from "../../actions";
import { List, Image, Icon } from "semantic-ui-react";
import { ListGroup } from "react-bootstrap";
import styles from "./styles";
import ReactWordcloud from "react-wordcloud";

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
    this.props.getMostUsedWordsSaga();
  }

  render() {
    const { mostUsedWords } = this.props;

    const options = {
      enableTooltip: true,
      deterministic: false,
      fontSizes: [20, 240],
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
            minHeight: "1080px",
            position: "relative",
            left: "4.1%",
            top: "-60px",
          }}
        >
          <div className="col-md-12">
            <ReactWordcloud
              words={mostUsedWords ? mostUsedWords.most_used_words : {}}
              options={options}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mostUsedWords: state.usersReducer.mostUsedWords,
});

const mapDispatchToProps = (dispatch) => ({
  getMostUsedWordsSaga: () => dispatch(getMostUsedWordsSaga()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MostUsedWords);
