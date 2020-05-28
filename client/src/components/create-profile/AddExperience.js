import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addExperince } from "../../actions/profileAction";

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      description: "",
      current: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const experince = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    console.log(experince);
    this.props.addExperince(experince, this.props.history);
  };
  onClick = (e) => {
    this.setState({ current: e.target.checked });
  };

  // componentWillReceiveProps = (nextProps) => {
  //   console.log(nextProps);
  // };

  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.errors) return { errors: nextProps.errors };
    else {
      return { errors: {} };
    }
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
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
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
                  info="Some of your responsabilities, etc"
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

AddExperience.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addExperince: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addExperince })(
  withRouter(AddExperience)
);
