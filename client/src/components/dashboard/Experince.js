import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";
import { deleteExp } from "../../actions/profileAction";
import { connect } from "react-redux";
class Experince extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experince: props.experince,
    };
  }

  deleteExp = (id) => {
    this.props.deleteExp(id);
  };
  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.experince) return { experince: nextProps.experince };
    else {
      return { experince: nextProps.experince };
    }
  };
  render() {
    const exe = this.state.experince.map((e) => (
      <tr key={e._id}>
        <td>{e.company}</td>
        <td>{e.title}</td>
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
            onClick={(row) => this.deleteExp(e._id)}
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
                <th>Company</th>
                <th>Title</th>
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
const mapStateToProps = (state) => ({ profile: state.profile });

export default connect(mapStateToProps, { deleteExp })(Experince);
