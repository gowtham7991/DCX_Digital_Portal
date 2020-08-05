import React, { Component, Fragment } from "react";
import Pageheader from "./page-layout-elements/pageheader"; // page header module -- page title and header to be given
import * as Data from "./DATA.json"; // JSON data for the UI pages
import Navbar from "./page-layout-elements/navbar"; //module for the side navigation bar
import "./page-layout-elements/pagelayout.css"; //css file for the page layout
import VerticalTimeline from "./special-components/verticaltimeline";
import Widgets from "./UI-components/widgets";
import Table from "./UI-components/table";
import ExcelReader from "./special-components/excelToJSON/excel-json-converter";
// import "bootstrap/dist/css/bootstrap.css";  //install bootstrap and uncomment to start using bootstrap

//import the required modules from the directory

// a page consists a side nav bar, page header, and any tables or other stuff under the active area div.
// data is passed in as props from the parent page to all the components through the state.

class PageTemplate extends Component {
  constructor(props) {
    super(props);
    this.toggleclass = this.toggleclass.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      title: Data.templatepage.title, //set the title of the section
      active: false, //states the status of the toggle for the navigation bar
      navdetails: Data.templatepage.navdetails.URL, //set the details for the navigation bar from the JSON
      pagetitle: Data.templatepage.pagetitle, //set the page title
      isHidden: true,
      widgetdata: Data.templatepage.widgetdata,
      //set the state if any additional component is imported and pass the data to the child component
    };
  }

  //handles the toggle function for the navigation bar
  toggleclass() {
    let currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  componentWillMount() {
    //if the website need details from LEAP extract the details from the URL params and assign it to state variables here
    //function which extracts the url params based on the key
    function getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          vars[key] = value;
        }
      );
      return vars;
    }

    //make the api call to get the details about the logged in user - Authorization
  }

  //handles modal form close button -- updates parent state
  handleClose(val) {
    this.setState({ isHidden: val });
  }
  handleSelect(event) {
    var selectedValue = event.target.value;
    console.log("selected value", selectedValue);
    var widgetdata = this.state.widgetdata;
    widgetdata[2]["options"] = [1, 2, 3, 4, 5, 6];
    this.setState({ widgetdata: widgetdata });
  }
  render() {
    return (
      <Fragment>
        <Navbar
          active={this.state.active}
          navdetails={this.state.navdetails}
          ontoggle={this.toggleclass}
        />
        <div className={this.state.active ? "main1" : "main0"}>
          <div className="layout">
            <Pageheader
              title={this.state.title}
              pagetitle={this.state.pagetitle}
            />
          </div>
          <div className="activearea">
            <div className="data">
              <h7>your code goes here...</h7>

              {/* <Widgets widgetdata={this.state.widgetdata} /> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PageTemplate;
