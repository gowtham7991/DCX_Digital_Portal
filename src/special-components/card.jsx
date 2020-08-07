import React, { Component, Fragment } from "react";
import "./card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      answer: this.props.answer,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.question !== state.question && props.answer !== state.answer) {
      return {
        question: props.question,
        answer: props.answer,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    return (
      <Fragment>
        <div class="card-container">
          <div
            class="card-question  "
            style={{
              position: "relative",
              margin: "0px",
              left: "0px",
              top: "0px",
              backgroundColor: "#3dcd58",
              borderRadius: "10px 10px 0px 0px",
              padding: "5px",
              height: "50px",
            }}
          >
            <p
              style={{
                color: "white",
                textAlign: "left",
                margin: "0px",
              }}
              class="question"
            >
              {this.state.question}
            </p>
          </div>
          <div>
            <p
              style={{
                color: "black",
                textAlign: "left",
                margin: "0px",
                padding: "10px",
              }}
              class="answer"
            >
              {this.state.answer}
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Card;
