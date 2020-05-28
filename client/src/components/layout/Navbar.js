import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropType from "prop-types";
import { userLogout } from "../../actions/authActions";

class Navbar extends Component {
  logOut = (e) => {
    e.preventDefault();
    this.props.userLogout();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestUser = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    const authUser = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {user && (
            <img
              src={user.avatar}
              alt=""
              style={{ margin: "10px", width: "25px" }}
              className=".img-rounded"
              title="You must have Gravatar connect to your email to display Image"
            />
          )}
        </li>
        <li className="nav-item">
          <span
            onClick={this.logOut}
            style={{ cursor: "pointer" }}
            className="nav-link"
          >
            LogOut
          </span>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authUser : guestUser}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propType = {
  auth: PropType.object.isRequired,
  userLogout: PropType.func.isRequired,
};
const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { userLogout })(Navbar);
