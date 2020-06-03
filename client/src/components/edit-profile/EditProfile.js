import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  createProfile,
  getCurrentProfile,
  clearError,
} from "../../actions/profileAction";
import { withRouter, Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skill: "",
      bio: "",
      githubusername: "",
      youtube: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      errors: {},
    };
    // props.clearError();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skill: this.state.skill,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      youtube: this.state.youtube,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      twitter: this.state.twitter,
    };
    this.props.createProfile(profileData, this.props.history);
  };
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      console.log(nextProps.profile.profile);
      const profile = { ...nextProps.profile.profile };
      profile.skill = isEmpty(profile.skill) ? "" : profile.skill.join(",");
      profile.handle = isEmpty(profile.handle) ? "" : profile.handle;
      profile.company = isEmpty(profile.company) ? "" : profile.company;
      profile.website = isEmpty(profile.website) ? "" : profile.website;
      profile.location = isEmpty(profile.location) ? "" : profile.location;
      profile.status = isEmpty(profile.status) ? "" : profile.status;
      profile.bio = isEmpty(profile.bio) ? "" : profile.bio;
      profile.githubusername = isEmpty(profile.githubusername)
        ? ""
        : profile.githubusername;
      profile.youtube = isEmpty(profile.social.youtube)
        ? ""
        : profile.social.youtube;
      profile.facebook = isEmpty(profile.social.facebook)
        ? ""
        : profile.social.facebook;
      profile.instagram = isEmpty(profile.social.instagram)
        ? ""
        : profile.social.instagram;
      profile.linkedin = isEmpty(profile.social.linkedin)
        ? ""
        : profile.social.linkedin;

      profile.twitter = isEmpty(profile.social.twitter)
        ? ""
        : profile.social.twitter;
      console.log(profile);
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skill: profile.skill,
        bio: profile.bio,
        githubusername: profile.githubusername,
        youtube: profile.youtube,
        facebook: profile.facebook,
        instagram: profile.instagram,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
      });

      //console.log(this.state);
    } else this.props.history.push("/dashboard");
  };

  // static getDerivedStateFromProps = (nextProps) => {
  //   if (Object.keys(nextProps.errors).length > 0) {
  //     return { errors: nextProps.errors };
  //   }
  //   if (nextProps.profile.profile) {
  //     console.log(nextProps.profile.profile);
  //     const profile = { ...nextProps.profile.profile };
  //     profile.skill = isEmpty(profile.skill) ? "" : profile.skill.join(",");
  //     profile.handle = isEmpty(profile.handle) ? "" : profile.handle;
  //     profile.company = isEmpty(profile.company) ? "" : profile.company;
  //     profile.website = isEmpty(profile.website) ? "" : profile.website;
  //     profile.location = isEmpty(profile.location) ? "" : profile.location;
  //     profile.status = isEmpty(profile.status) ? "" : profile.status;
  //     profile.bio = isEmpty(profile.bio) ? "" : profile.bio;
  //     profile.githubusername = isEmpty(profile.githubusername)
  //       ? ""
  //       : profile.githubusername;
  //     profile.youtube = isEmpty(profile.social.youtube)
  //       ? ""
  //       : profile.social.youtube;
  //     profile.facebook = isEmpty(profile.social.facebook)
  //       ? ""
  //       : profile.social.facebook;
  //     profile.instagram = isEmpty(profile.social.instagram)
  //       ? ""
  //       : profile.social.instagram;
  //     profile.linkedin = isEmpty(profile.social.linkedin)
  //       ? ""
  //       : profile.social.linkedin;

  //     profile.twitter = isEmpty(profile.social.twitter)
  //       ? ""
  //       : profile.social.twitter;
  //     console.log(profile);
  //     return {
  //       handle: profile.handle,
  //       company: profile.company,
  //       website: profile.website,
  //       location: profile.location,
  //       status: profile.status,
  //       skill: profile.skill,
  //       bio: profile.bio,
  //       githubusername: profile.githubusername,
  //       youtube: profile.youtube,
  //       facebook: profile.facebook,
  //       instagram: profile.instagram,
  //       linkedin: profile.linkedin,
  //       twitter: profile.twitter,
  //     };

  //     //console.log(this.state);
  //   }
  //   return console.log("something Fisshy");
  //   // if (Object.keys(newState).length) return newState;
  //   // else nextProps.history.push("/dashboard");
  // };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    const option = [
      { lable: "* Select Professional Status", value: "" },
      { value: "Developer", lable: "Developer" },
      { value: "Junior Developer", lable: "Junior Developer" },
      { value: "Senior Developer", lable: "Senior Developer" },
      { value: "Manager", lable: "Manager" },
      { value: "Student or Learning", lable: "Student or Learning" },
      { value: "Instructor", lable: "Instructor or Teacher" },
      { value: "Intern", lable: "Intern" },
      { value: "Other", lable: "Other" },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>

              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder={"* Profile handle"}
                  name="handle"
                  info=" A unique handle for your profile URL. Your full name,
                    company name, nickname, etc (This CAN'T be changed later)"
                  onChange={this.onChange}
                  error={errors.handle}
                  value={this.state.handle}
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  info="Give us an idea of where you are at in your career"
                  option={option}
                  onChange={this.onChange}
                  error={errors.status}
                  value={this.state.status}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Company"
                  name="company"
                  info="Could be your own company or one you work for"
                  onChange={this.onChange}
                  error={errors.company}
                  value={this.state.company}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Website"
                  name="website"
                  info="Could be your own or a company website"
                  onChange={this.onChange}
                  error={errors.website}
                  value={this.state.website}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  info="City & state suggested (eg. Boston, MA)"
                  onChange={this.onChange}
                  error={errors.location}
                  value={this.state.location}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Skills"
                  name="skill"
                  info="Please use comma separated values (eg.
                          HTML,CSS,JavaScript,PHP)"
                  onChange={this.onChange}
                  error={errors.skill}
                  value={this.state.skill}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  info="  If you want your latest repos and a Github link, include
                      your username"
                  onChange={this.onChange}
                  error={errors.githubusername}
                  value={this.state.githubusername}
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="A short bio of yourself"
                  info="Tell us a little about yourself"
                  onChange={this.onChange}
                  error={errors.bio}
                  value={this.state.bio}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({
                        displaySocialInputs: !this.state.displaySocialInputs,
                      });
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {this.state.displaySocialInputs && (
                  <React.Fragment>
                    <InputGroup
                      type="text"
                      icon="fab fa-twitter"
                      placeholder="Twitter Profile URL"
                      name="twitter"
                      onChange={this.onChange}
                      error={errors.twitter}
                      value={this.state.twitter}
                    />

                    <InputGroup
                      type="text"
                      icon="fab fa-facebook"
                      placeholder="Facebook Page URL"
                      name="facebook"
                      onChange={this.onChange}
                      error={errors.facebook}
                      value={this.state.facebook}
                    />

                    <InputGroup
                      type="text"
                      icon="fab fa-linkedin"
                      placeholder="Linkedin Profile URL"
                      name="linkedin"
                      onChange={this.onChange}
                      error={errors.linkedin}
                      value={this.state.linkedin}
                    />

                    <InputGroup
                      type="text"
                      icon="fab fa-youtube"
                      placeholder="YouTube Channel URL"
                      name="youtube"
                      onChange={this.onChange}
                      error={errors.youtube}
                      value={this.state.youtube}
                    />

                    <InputGroup
                      type="text"
                      icon="fab fa-instagram"
                      placeholder="Instagram Page URL"
                      name="instagram"
                      onChange={this.onChange}
                      error={errors.instagram}
                      value={this.state.instagram}
                    />
                  </React.Fragment>
                )}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  clearError,
})(withRouter(EditProfile));
