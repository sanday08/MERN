import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { registerData, clearError } from "./../../actions/authActions";

import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    props.clearError();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashbord");
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerData(newUser, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //This method used because componentWillReceiveProps changed
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }
  // componentWillReceiveProps = (nextProps) => {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // };

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type={"name"}
                  name={"name"}
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  placeholder={"Name"}
                />
                <TextFieldGroup
                  type={"email"}
                  name={"email"}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  placeholder={"Email Address"}
                  info={
                    "This site uses Gravatar so if you want a profile image, use a Gravatar email"
                  }
                />
                <TextFieldGroup
                  type={"password"}
                  name={"password"}
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  placeholder={"Password"}
                />
                <TextFieldGroup
                  type={"password"}
                  name={"password2"}
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                  placeholder={"Confirm Password"}
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
Register.propTypes = {
  auth: PropTypes.object.isRequired,
  registerData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerData, clearError })(
  withRouter(Register)
);
