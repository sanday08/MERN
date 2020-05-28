import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileAction";
import { withRouter } from "react-router-dom";

class CreateProfile extends Component {
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
      linkdin: "",
      twiter: "",
      errors: {},
    };
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
      linkdin: this.state.linkdin,
      twiter: this.state.twiter,
    };
    console.log(profileData);
    this.props.createProfile(profileData, this.props.history);
  };
  // componentWillReceiveProps = (nextProps) => {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //     console.log(this.state.errors);
  //   }
  // };

  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  };
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
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
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
                      value={this.state.twiter}
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
                      value={this.state.linkdin}
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
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
