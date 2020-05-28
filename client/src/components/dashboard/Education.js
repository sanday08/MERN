import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";
import { deleteEdu } from "../../actions/profileAction";
import { connect } from "react-redux";
class Education extends Component {
  deleteEdu = (e) => {
    this.props.deleteEdu(e);
  };

  render() {
    const exe = this.props.education.map((e) => (
      <tr key={e._id}>
        <td>{e.school}</td>
        <td>{e.degree}</td>
        <td>
          <Moment format="DD/MM/YYYY">{e.from}</Moment> -{" "}
          {isEmpty(e.to) ? (
            " Now "
          ) : (
            <Moment format="DD/MM/YYYY">{e.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={(row) => this.deleteEdu(e._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <div>
          <h4 className="mb-2">Experience Credentials</h4>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{exe}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { deleteEdu })(Education);
