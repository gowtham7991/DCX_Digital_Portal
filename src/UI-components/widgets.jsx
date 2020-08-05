import React, { Component, Fragment } from "react";
import "./widgets.css";
import { Formik, FieldArray, Field } from "formik"; //instal formik and yup for form handling and validation -- uncomment when installed
import * as Yup from "yup";
import MultiSelect from "react-multi-select-component";
import "bootstrap/dist/css/bootstrap.css"; //install bootstrap and then uncomment to make use of the library

class Widgets extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    var curryear =
      today.getFullYear() > 10
        ? today.getFullYear()
        : "0" + today.getFullYear();
    var currmonth =
      today.getMonth() + 1 > 10
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1);
    var currday = today.getDate() > 9 ? today.getDate() : "0" + today.getDate();
    var currdate = curryear + "/" + currmonth + "/" + currday;
    var maxDate = curryear + 1 + "/" + currmonth + "/" + currday;
    this.state = {
      widgetdata: this.props.widgetdata,
      today: currdate,
      maxDate: maxDate,
    };
  }

  //handles any update in the props which are made in the parent
  static getDerivedStateFromProps(props, state) {
    if (props.widgetdata !== state.widgetdata) {
      return {
        widgetdata: props.widgetdata,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
  render() {
    let keys = {}; //holds our intivial values to bind the form data
    var myselected = [];
    //loop over the widgets data to populate initial values
    this.state.widgetdata.map((widget, index) =>
      widget.category == "button"
        ? ""
        : widget.category == "checkbox-tree"
        ? ((keys[`${widget.parent.name}`] = false),
          widget.children.map(
            (child, index) => (keys[`${child.name}`] = false)
          ))
        : widget.category == "checkbox-question"
        ? widget.options.map(
            (option, index) => (keys[`${option.name}`] = false)
          )
        : widget.category == "select"
        ? (keys[`${widget.name}`] = widget["options"][0])
        : widget.category === "dynamic-inputs"
        ? (keys[`${widget.name}`] = widget.values)
        : widget.category == "fieldset"
        ? widget.fields.map((field, index) =>
            field.name === "req-sesa"
              ? (keys[`${field.name}`] = this.props.req_sesaid)
              : field.name === "req-name"
              ? (keys[`${field.name}`] = this.props.req_username)
              : field.name === "req-title"
              ? (keys[`${field.name}`] = this.props.req_title)
              : field.name === "req-businessdiv"
              ? (keys[`${field.name}`] = this.props.req_businessdiv)
              : field.name === "req-phone"
              ? (keys[`${field.name}`] = this.props.req_ph)
              : field.name === "manager-sesa"
              ? (keys[`${field.name}`] = this.props.manager_sesaid)
              : field.name === "manager-name"
              ? (keys[`${field.name}`] = this.props.manager_username)
              : field.name === "manager-title"
              ? (keys[`${field.name}`] = this.props.manager_title)
              : field.name === "manager-businessdiv"
              ? (keys[`${field.name}`] = this.props.manager_businessdiv)
              : field.name === "manager-phone"
              ? (keys[`${field.name}`] = this.props.manager_ph)
              : (keys[`${field.name}`] = "")
          )
        : widget.category == "multi-select"
        ? (keys[`${widget.name}`] = [])
        : widget.name === "expiry-date"
        ? (keys[`${widget.name}`] = this.state.maxDate)
        : (keys[`${widget.name}`] = "")
    );

    //loop to create the validation schema
    this.state.widgetdata.map((widget, index) => "");

    //validation schema for the form fields
    let formValidationSchema = Yup.object().shape({});

    return (
      <div>
        <Formik
          initialValues={
            this.props.initialValues === null ||
            this.props.initialValues === undefined
              ? keys
              : this.props.initialValues
          }
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setTimeout(() => {
              //write your on submit func here

              console.log("values", values);

              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="widgets">
                {this.state.widgetdata.map((widget, index) => {
                  if (widget.category === "input") {
                    return (
                      <div className="widget">
                        <legend>{widget.legend}</legend>
                        <label htmlFor={widget.name} id={widget.type}>
                          {widget.label}
                        </label>
                        <input
                          type={widget.type}
                          id={widget.id}
                          name={widget.name}
                          value={values[`${widget.name}`]}
                          onChange={(e) => (
                            this.props.handleFileUpload(e), handleChange(e)
                          )}
                          onBlur={(e) => (
                            handleBlur(e), this.props.passReqForm(values)
                          )}
                          placeholder={widget.placeholder}
                          className={
                            errors[`${widget.name}`] &&
                            touched[`${widget.name}`] &&
                            "error"
                          }
                          disabled={this.props.isdisabled}
                        />
                        {errors[`${widget.name}`] &&
                          touched[`${widget.name}`] && (
                            <div className="input-feedback">{errors.Name}</div>
                          )}
                      </div>
                    );
                  } else if (widget.category === "select") {
                    return (
                      <div className="widget">
                        <label htmlFor={widget.name}>{widget.label}</label>
                        <select
                          id={widget.id}
                          name={widget.name}
                          value={values[`${widget.name}`]}
                          onChange={handleChange}
                          onBlur={(e) => (
                            handleBlur(e), this.props.passReqForm(values)
                          )}
                          disabled={this.props.isdisabled}
                        >
                          {widget.options.map((option, index) =>
                            option === values[`${widget.name}`] ? (
                              <option value={option} selected key={index}>
                                {option}
                              </option>
                            ) : (
                              <option value={option}>{option}</option>
                            )
                          )}
                        </select>
                      </div>
                    );
                  } else if (widget.category === "multi-select") {
                    return (
                      <div className="widget">
                        <label htmlFor={widget.name}>{widget.label}</label>

                        <MultiSelect
                          options={widget.options}
                          value={values[`${widget.name}`]}
                          onChange={(selected) => (
                            this.setState({ [`${widget.name}`]: selected }),
                            (values[`${widget.name}`] = selected),
                            this.props.passReqForm(values)
                          )}
                          labelledBy={"Select"}
                          name={widget.name}
                          id={widget.id}
                          disabled={this.props.isdisabled}
                        />
                      </div>
                    );
                  } else if (widget.category === "radio") {
                    return (
                      <div className="widget">
                        <label>{widget.label}</label>
                        {widget.options.map((option, index) => (
                          <div>
                            <input
                              type="radio"
                              id={option.id}
                              name={option.name}
                              value={values[`${option.id}`]}
                              onChange={handleChange}
                              onBlur={(e) => (
                                handleBlur(e), this.props.passReqForm(values)
                              )}
                              disabled={this.props.isdisabled}
                            />
                            <label
                              for="male"
                              style={{ display: "inline-block " }}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    );
                  } else if (widget.category === "textarea") {
                    return (
                      <div className="widget">
                        <label for={widget.name}>{widget.label}</label>
                        <textarea
                          rows={widget.rows}
                          cols={widget.cols}
                          id={widget.id}
                          name={widget.name}
                          value={values[`${widget.name}`]}
                          placeholder={widget.placeholder}
                          onChange={handleChange}
                          onBlur={(e) => (
                            handleBlur(e), this.props.passReqForm(values)
                          )}
                          disabled={this.props.isdisabled}
                        />
                        {errors[`${widget.name}`] &&
                          touched[`${widget.name}`] && (
                            <div className="input-feedback">{errors.Name}</div>
                          )}
                      </div>
                    );
                  } else if (widget.category === "checkbox") {
                    return (
                      <div className="checkbox">
                        <legend>{widget.legend}</legend>
                        <input
                          type={widget.type}
                          id={widget.id}
                          name={widget.name}
                          checked={values[`${widget.name}`]}
                          onChange={handleChange}
                          onBlur={(e) => (
                            handleBlur(e), this.props.passReqForm(values)
                          )}
                          disabled={this.props.isdisabled}
                        />

                        <label>{widget.label}</label>
                      </div>
                    );
                  } else if (widget.category === "checkbox-tree") {
                    return (
                      <div className="widget">
                        <input
                          type={widget.parent.type}
                          id={widget.parent.id}
                          name={widget.parent.name}
                          checked={values[`${widget.parent.name}`]}
                          onChange={handleChange}
                          onBlur={(e) => (
                            handleBlur(e), this.props.passReqForm(values)
                          )}
                          disabled={this.props.isdisabled}
                        />
                        <label>{widget.parent.label}</label>
                        <div class="suboption" style={{ marginLeft: "30px" }}>
                          {widget.children.map((child, index) => (
                            <div>
                              <input
                                type={child.type}
                                id={child.id}
                                name={child.name}
                                checked={values[`${widget.name}`]}
                                onChange={handleChange}
                                onBlur={(e) => (
                                  handleBlur(e), this.props.passReqForm(values)
                                )}
                                disabled={this.props.isdisabled}
                              />
                              <label>{child.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } else if (widget.category === "checkbox-question") {
                    return (
                      <div className="widget">
                        <label>{widget.question}</label>
                        <div class="options" style={{ marginLeft: "30px" }}>
                          {widget.options.map((option, index) => (
                            <div>
                              <input
                                type={option.type}
                                id={option.id}
                                name={option.name}
                                checked={values[`${widget.name}`]}
                                onChange={handleChange}
                                onBlur={(e) => (
                                  handleBlur(e), this.props.passReqForm(values)
                                )}
                                style={{ display: "inline-block" }}
                                disabled={this.props.isdisabled}
                              />
                              <label style={{ display: "inline-block" }}>
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } else if (widget.category === "fieldset") {
                    return (
                      <div className="fieldset">
                        <label>{widget.label}</label>
                        <div
                          className="fields "
                          style={{
                            border: "1px solid #CCC",
                            borderRadius: "4px",
                            padding: "4px",
                            width: "90%",
                            margin: "0px",
                          }}
                        >
                          {widget.fields.map((field, index) => (
                            <div>
                              <label htmlFor={field.name} id="field">
                                {field.label}
                              </label>
                              <input
                                type={field.type}
                                id={"field"}
                                name={field.name}
                                value={values[`${field.name}`]}
                                onChange={handleChange}
                                onBlur={(e) => (
                                  handleBlur(e), this.props.passReqForm(values)
                                )}
                                placeholder={widget.placeholder}
                                className={
                                  errors[`${field.name}`] &&
                                  touched[`${field.name}`] &&
                                  "error"
                                }
                                min="0"
                                disabled={this.props.isdisabled}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } else if (widget.category === "download-link") {
                    return (
                      <div className="widget">
                        <div class="download-link">
                          <a href={widget.href} download>
                            {widget.label}
                          </a>
                        </div>
                      </div>
                    );
                  } else if (widget.category === "upload-link") {
                    return (
                      <div class="widget">
                        <div class="upload-container">
                          <label
                            htmlFor="image-input"
                            style={{
                              margin: "0px",
                              width: "120px",
                              backgroundColor: "#007bff",
                              color: "white",
                              borderRadius: "4px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            {widget.label}
                          </label>
                          <input
                            style={{
                              border: "2px",
                              borderColor: "black",
                              borderStyle: "solid",
                              padding: "2px",
                              margin: "5px",
                              display: "none",
                            }}
                            type="file"
                            name="image-input"
                            id="image-input"
                            onChange={(e) => this.props.handleFileUpload(e)}
                          />
                        </div>
                      </div>
                    );
                  } else if (widget.category === "dynamic-inputs") {
                    if (widget.name === "id-set") {
                      if (
                        values["Destination_Consume"] ===
                          "Data Exploration in SE laptop" ||
                        values["Destination_Consume"] ===
                          "Email / Transfer data internally" ||
                        values["Destination_Consume"] ===
                          "Email or transfer data to external to SE" ||
                        values["Destination_Consume"] === "Others"
                      ) {
                        return (
                          <div class="dynamic-inputs">
                            <FieldArray
                              name={widget.name}
                              render={(arrayHelpers) => (
                                <div>
                                  <label>{widget.legend}</label>
                                  {values[`${widget.name}`] &&
                                  values[`${widget.name}`].length > 0 ? (
                                    values[`${widget.name}`].map(
                                      (friend, index) => (
                                        <div
                                          key={index}
                                          style={{ marginBottom: "5px" }}
                                        >
                                          <Field
                                            name={`${widget.name}.${index}`}
                                            style={{
                                              padding: "3px",
                                              borderRadius: "3px",
                                            }}
                                          />
                                          <button
                                            className="btn btn-secondary btn-sm"
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            } // remove a friend from the list
                                            style={{
                                              marginLeft: "5px",
                                              width: "25px",
                                            }}
                                          >
                                            -
                                          </button>
                                          <button
                                            style={{
                                              marginLeft: "5px",
                                              width: "25px",
                                            }}
                                            className="btn btn-secondary btn-sm"
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.insert(index + 1, "")
                                            } // insert an empty string at a position
                                          >
                                            +
                                          </button>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <button
                                      className="btn btn-secondary btn-sm"
                                      type="button"
                                      onClick={() => arrayHelpers.push("")}
                                    >
                                      {/* show this when user has removed all friends from the list */}
                                      Add an item
                                    </button>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        );
                      }
                    } else {
                      return (
                        <div class="dynamic-inputs">
                          <FieldArray
                            name={widget.name}
                            render={(arrayHelpers) => (
                              <div>
                                <label>{widget.legend}</label>
                                {values[`${widget.name}`] &&
                                values[`${widget.name}`].length > 0 ? (
                                  values[`${widget.name}`].map(
                                    (friend, index) => (
                                      <div
                                        key={index}
                                        style={{ marginBottom: "5px" }}
                                      >
                                        <Field
                                          name={`${widget.name}.${index}`}
                                          style={{
                                            padding: "3px",
                                            borderRadius: "3px",
                                          }}
                                        />
                                        <button
                                          className="btn btn-secondary btn-sm"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          } // remove a friend from the list
                                          style={{
                                            marginLeft: "5px",
                                            width: "25px",
                                          }}
                                        >
                                          -
                                        </button>
                                        <button
                                          style={{
                                            marginLeft: "5px",
                                            width: "25px",
                                          }}
                                          className="btn btn-secondary btn-sm"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.insert(index + 1, "")
                                          } // insert an empty string at a position
                                        >
                                          +
                                        </button>
                                      </div>
                                    )
                                  )
                                ) : (
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    type="button"
                                    onClick={() => arrayHelpers.push("")}
                                  >
                                    {/* show this when user has removed all friends from the list */}
                                    Add an item
                                  </button>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      );
                    }
                  } else if (widget.type === "Submit") {
                    return (
                      <div class="button">
                        <button
                          id={widget.type}
                          type={widget.type}
                          disabled={isSubmitting}
                        >
                          {widget.type}
                        </button>
                      </div>
                    );
                  } else if (widget.category === "comment-section") {
                    return (
                      <div className="textarea">
                        <label for={widget.name}>{widget.label}</label>
                        <textarea
                          rows={widget.rows}
                          cols={widget.cols}
                          id={widget.id}
                          name={widget.name}
                          value={values[`${widget.name}`]}
                          placeholder={widget.placeholder}
                          onChange={handleChange}
                          onBlur={(e) => (
                            handleBlur(e), this.props.passReqForm(values)
                          )}
                          disabled={this.props.isdisabled}
                        />
                        {errors[`${widget.name}`] &&
                          touched[`${widget.name}`] && (
                            <div className="input-feedback">{errors.Name}</div>
                          )}
                      </div>
                    );
                  } else {
                    return (
                      <div class="button">
                        <button
                          id={widget.type}
                          type={widget.type}
                          disabled={isSubmitting}
                          onClick={() =>
                            console.log("redirecting to new page ")
                          }
                        >
                          {widget.label}
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Widgets;
