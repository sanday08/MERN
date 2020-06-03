import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileAction";
import Moment from "react-moment";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
export class Profile extends Component {
  componentDidMount = () => {
    this.props.getProfile(this.props.match.params.handle);
    console.log(this.props.match.params.handle);
  };
  render() {
    const { profile, isLoading } = this.props.profile;

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <Link
                    to="/profiles"
                    className="btn btn-light mb-3 float-left"
                  >
                    Back To Profiles
                  </Link>
                </div>
                <div className="col-6"></div>
              </div>

              {isLoading || profile === null ? (
                <Spinner />
              ) : (
                <div>
                  {/* Profile Header */}

                  <div className="row">
                    {console.log(profile.user.avatar)}
                    <div className="col-md-12">
                      <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                          <div className="col-4 col-md-3 m-auto">
                            <img
                              className="rounded-circle"
                              src={profile.user.avatar}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <h1 className="display-4 text-center">
                            {profile.user.name}
                          </h1>
                          <p className="lead text-center">
                            {profile.status} at {profile.company}
                          </p>
                          <p>{profile.location}</p>
                          {profile.social && (
                            <p>
                              <a
                                className="text-white p-2"
                                target="_blank"
                                href={
                                  profile.social.youtube
                                    ? "https://" + profile.social.youtube
                                    : "#"
                                }
                              >
                                <i className="fas fa-globe fa-2x"></i>
                              </a>
                              <a
                                className="text-white p-2"
                                target="_blank"
                                href={
                                  profile.social.twitter
                                    ? "https://" + profile.social.twitter
                                    : "#"
                                }
                              >
                                <i className="fab fa-twitter fa-2x"></i>
                              </a>
                              <a
                                className="text-white p-2"
                                target="_blank"
                                href={
                                  profile.social.facebook
                                    ? "https://" + profile.social.facebook
                                    : "#"
                                }
                              >
                                <i className="fab fa-facebook fa-2x"></i>
                              </a>
                              <a
                                className="text-white p-2"
                                target="_blank"
                                href={
                                  profile.social.linkedin
                                    ? "https://" + profile.social.linkedin
                                    : "#"
                                }
                              >
                                <i className="fab fa-linkedin fa-2x"></i>
                              </a>
                              <a
                                className="text-white p-2"
                                target="_blank"
                                href={
                                  profile.social.instagram
                                    ? "https://" + profile.social.instagram
                                    : "#"
                                }
                              >
                                <i className="fab fa-instagram fa-2x"></i>
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile About -->*/}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-body bg-light mb-3">
                        <h3 className="text-center text-info">
                          {profile.user.name}'s Bio
                        </h3>
                        <p className="lead">{profile.bio}</p>
                        <hr />
                        <h3 className="text-center text-info">Skill Set</h3>
                        <div className="row">
                          <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {profile.skill.map((skill, index) => (
                              <div className="p-3" key={index}>
                                <i className="fa fa-check"></i> {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Profile Creds -->*/}
                  <div className="row">
                    <div className="col-md-6">
                      <h3 className="text-center text-info">Experience</h3>
                      <ul className="list-group">
                        {profile.experience &&
                          profile.experience.map((experience) => (
                            <li
                              className="list-group-item"
                              key={experience._id}
                            >
                              <h4>{experience.company}</h4>
                              <p>
                                <Moment format="MMMM-YYYY">
                                  {experience.from}
                                </Moment>{" "}
                                -{" "}
                                {experience.current ? (
                                  "Current"
                                ) : (
                                  <Moment format="MMMM-YYYY">
                                    {experience.to}
                                  </Moment>
                                )}
                              </p>
                              <p>
                                {" "}
                                <strong>Position:</strong>{" "}
                                {profile.experience.title}
                              </p>
                              <p>
                                <strong>Description:</strong>{" "}
                                {profile.description}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h3 className="text-center text-info">Education</h3>
                      <ul className="list-group">
                        {profile.education &&
                          profile.education.map((education) => (
                            <li className="list-group-item" key={education._id}>
                              <h4>{education.school}</h4>
                              <p>
                                {
                                  <Moment format="MMMM-YYYY">
                                    {education.from}
                                  </Moment>
                                }{" "}
                                -{" "}
                                {education.current ? (
                                  "Current"
                                ) : (
                                  <Moment format="MMMM-YYYY">
                                    {education.to}
                                  </Moment>
                                )}
                              </p>
                              <p>
                                <strong>Degree: </strong>
                                {education.degree}
                              </p>
                              <p>
                                <strong>Field Of Study: </strong>Computer
                                Science
                              </p>
                              <p />
                              <p>
                                <strong>Description:</strong>{" "}
                                {education.description}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  {/* Profile Github*/}
                  {/*       <div ref="myRef">
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                <div key={repo.id} className="card card-body mb-2">
                  <div className="row">
                    <div className="col-md-6">
                      <h4>
                         <Link
                          to={repo.html_url}
                          className="text-info"
                          target="_blank"
                        >
                          {" "}
                          Repository One
                     </Link>
                      </h4>
                      <p>Repository description</p>
                    </div>
                    <div className="col-md-6">
                      <span className="badge badge-info mr-1">Stars: 44</span>
                      <span className="badge badge-secondary mr-1">
                        Watchers: 21
                      </span>
                      <span className="badge badge-success">Forks: 122</span>
                    </div>
                  </div>
                </div>
              </div>
    */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  error: state.error,
});

export default connect(mapStateToProps, { getProfile })(Profile);
