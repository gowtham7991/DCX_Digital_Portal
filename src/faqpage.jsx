import React, { Component, Fragment } from "react";
import Pageheader from "./page-layout-elements/pageheader"; // page header module -- page title and header to be given
import * as Data from "./DATA.json"; // JSON data for the UI pages
import Navbar from "./page-layout-elements/navbar"; //module for the side navigation bar
import "./page-layout-elements/pagelayout.css"; //css file for the page layout
import VerticalTimeline from "./special-components/verticaltimeline";
import Widgets from "./UI-components/widgets";
import Table from "./UI-components/table";
import ExcelReader from "./special-components/excelToJSON/excel-json-converter";
import Card from "./special-components/card";
import TopNavBar from "./page-layout-elements/topnavbar";
import "bootstrap/dist/css/bootstrap.css";
import AdminPanel from "./adminpanel";
import ManageContent from "./managecontent";

class FAQPage extends Component {
  constructor(props) {
    super(props);
    this.toggleclass = this.toggleclass.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleAdminPanel = this.handleAdminPanel.bind(this);
    this.handleManageContent = this.handleManageContent.bind(this);
    this.handleFAQDelete = this.handleFAQDelete.bind(this);

    this.state = {
      title: Data.templatepage.title, //set the title of the section
      active: false, //states the status of the toggle for the navigation bar
      navdetails: Data.templatepage.navdetails.URL, //set the details for the navigation bar from the JSON
      pagetitle: Data.templatepage.pagetitle, //set the page title
      isHidden: true,
      widgetdata: Data.templatepage.widgetdata,
      faqDetails: [
        {
          question: "Why is the iRewards Program frozen?",
          answer:
            "APC had to temporarily freeze it’s iRewards Loyalty Program in order to do some essential maintenance on the backend portal.",
        },
        {
          question: "When will the iRewards Program be available again??",
          answer:
            "Unfortunately, the essential maintenance work required, is taking longer than expected – we hope to have an update on unfreezing the portal in the coming weeks.",
        },
        {
          question: "Can my partner earn iRewards points?",
          answer:
            "Yes, your partners can still to earn gamification or sales points.  Please ensure that they continue to upload their invoices for verification.",
        },
        {
          question: "Can my partner redeem rewards/prizes?",
          answer:
            "Currently your partner cannot redeem rewards or prizes from the iRewards Program. This functionality will be restored when the program unfreezes.",
        },
        {
          question: "Who can I contact for further information?",
          answer:
            "If you need further information, please contact your Regional Channel Marketing & Programs Lead -  Europe: Maeve Fox; NAM: Gail Fredrickson; Mexico & CCA:	Eileen Foley; International:	Mohita Hattangady",
        },
      ],
      pageState: "FAQ",
      //set the state if any additional component is imported and pass the data to the child component
    };
  }

  //handles the toggle function for the navigation bar
  toggleclass() {
    let currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  componentDidMount() {
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

  addQuestion() {
    var currfaqDetails = this.state.faqDetails;
    console.log("faq before", currfaqDetails);
    var newQuestion = { question: "test question", answer: "test answer" };
    currfaqDetails.push(newQuestion);
    console.log("faq after", currfaqDetails);
    this.setState({ faqDetails: currfaqDetails });
  }

  handleAdminPanel(value) {
    console.log("in parent in handleAdminpanel", value);
    this.setState({ pageState: value });
  }

  handleManageContent(value) {
    console.log("in parent in handleManageContent", value);
    this.setState({ pageState: value });
  }

  handleFAQDelete(event, index) {
    var currfaqDetails = this.state.faqDetails;
    currfaqDetails.splice(index, 1);
    this.setState({ faqDetails: currfaqDetails });
    console.log("details are", index);
  }

  render() {
    return (
      <Fragment>
        <div className="data">
          <TopNavBar handleAdminPanel={this.handleAdminPanel} />
          {/* <button onClick={() => this.setState({ pageState: "adminpanel" })}>
            Convert
          </button> */}
          <div class="page-content">
            {this.state.pageState === "FAQ" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                  padding: "30px",
                  gridGap: "50px",
                }}
              >
                {this.state.faqDetails.map((item) => (
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card question={item.question} answer={item.answer} />
                  </div>
                ))}
              </div>
            ) : this.state.pageState === "adminpanel" ? (
              <AdminPanel handleManageContent={this.handleManageContent} />
            ) : (
              <ManageContent
                faqDetails={this.state.faqDetails}
                handleFAQDelete={this.handleFAQDelete}
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FAQPage;
