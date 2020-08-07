import React, { Component, Fragment } from "react";

class ManageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqDetails: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.faqDetails !== state.faqDetails) {
      return {
        faqDetails: props.faqDetails,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    return (
      <Fragment>
        <div style={{ padding: "30px" }}>
          <button
            className="btn btn-secondary"
            style={{ marginBottom: "15px" }}
          >
            Add a question
          </button>
          {this.state.faqDetails.length === 0
            ? ""
            : this.state.faqDetails.map((item, index) => (
                <div>
                  <span>
                    <h5 style={{ color: "#3dcd58", display: "inline-block" }}>
                      {`Q${index + 1})`}
                      {item.question}
                    </h5>
                    <div
                      style={{
                        display: "inline-block",
                      }}
                    >
                      <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                      />

                      <i
                        id={index}
                        class="fa fa-pencil-square-o"
                        aria-hidden="true"
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          color: "gray",
                        }}
                      ></i>
                      <i
                        id={index}
                        class="fa fa-trash-o"
                        aria-hidden="true"
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={(event) =>
                          this.props.handleFAQDelete(event, index)
                        }
                      ></i>
                    </div>
                  </span>

                  <p style={{ marginLeft: "5px" }}>{item.answer}</p>
                </div>
              ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ManageContent;
