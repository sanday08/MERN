import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
export class Profiles extends Component {
  componentDidMount = () => {
    this.props.getAllProfiles();
  };

  render() {
    const { profiles, isLoading } = this.props.profile;
    let display = "";
    if (profiles === null || isLoading) display = <Spinner />;
    else
      display = profiles.map((profile) => (
        <div className="card card-body bg-light mb-3" key={profile._id}>
          <div className="row">
            <div className="col-2">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt=""
              />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.user.name}</h3>
              <p>{profile.status}</p>
              <p>{profile.website && profile.website}</p>
              <span
                onClick={() => {
                  this.props.history.push(`/profile/${profile.handle}`);
                }}
                className="btn btn-info"
              >
                View Profile
              </span>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <h4>Skill Set</h4>
              <ul className="list-group">
                {profile.skill.slice(0, 4).map((skill, index) => (
                  <li className="list-group-item" key={index}>
                    <i className="fa fa-check pr-1"></i>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ));

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {display}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
