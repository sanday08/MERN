import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteCurrentProfile,
} from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experince from "./Experince";
import Education from "./Education";
class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  deleteAccount = () => {
    this.props.deleteCurrentProfile();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, isLoading } = this.props.profile;
    let dashboardContent;

    if (profile === null || isLoading) dashboardContent = <Spinner />;
    else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome<Link to={`/profile/${profile.handle}`}> {user.name}</Link>
            </p>
            <ProfileActions />
            <Experince experince={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }}>
              <button className="btn btn-danger" onClick={this.deleteAccount}>
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a Profile please add some info.</p>

            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropType.object.isRequired,
  profile: PropType.object.isRequired,
  getCurrentProfile: PropType.func.isRequired,
  deleteCurrentProfile: PropType.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteCurrentProfile,
})(Dashboard);
