import React, { Component, Fragment } from "react";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <div
          class="action-area"
          style={{
            margin: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button
            className="btn btn-success"
            style={{ backgroundColor: "#3dcd58", width: "200px" }}
            onClick={() => console.log("clicked manage users")}
          >
            Manage Users
          </button>
          <button
            className="btn btn-success"
            style={{
              backgroundColor: "#3dcd58",
              marginLeft: "100px",
              width: "200px",
            }}
            onClick={() => this.props.handleManageContent("managecontent")}
          >
            Manage Content
          </button>
        </div>
      </Fragment>
    );
  }
}

export default AdminPanel;
