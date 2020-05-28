import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../actions/authActions";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.userLogin(user);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // componentWillReceiveProps = (nextProps) => {
  //   if (nextProps.errors) {
  //     console.log(nextProps.errors);
  //     this.setState({ errors: nextProps.errors });
  //   }
  // };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };
  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type={"email"}
                  name={"email"}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  placeholder={"Email Address"}
                />

                <TextFieldGroup
                  type={"password"}
                  name={"password"}
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  placeholder={"Password"}
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
Login.propTypes = {
  errors: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { userLogin })(Login);
