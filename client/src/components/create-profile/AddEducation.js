import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { addEducation } from "../../actions/profileAction";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
    };
  }

  // static getDerivedStateFromProps = (nextProps) => {
  //   if (nextProps.errors) return { errors: nextProps.errors };
  //   else {
  //     return { errors: {} };
  //   }
  // };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const experince = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    console.log(experince);
    this.props.addEducation(experince, this.props.history);
  };
  onClick = (e) => {
    this.setState({ current: e.target.checked });
  };

  render() {
    const errors = this.state.errors;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* School or Bootcamp"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="* Field Of Study"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  error={errors.fieldOfStudy}
                />

                <h6>From Date</h6>

                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.current}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    id="current"
                    value={this.state.current}
                    onClick={this.onClick}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  info="Tell us about your experience and what you learned"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
});
export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
