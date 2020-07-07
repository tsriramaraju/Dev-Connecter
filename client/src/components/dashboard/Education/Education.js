import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../../redux/actions/profile';

const Education = ({ education, deleteEducation }) => {
  let jsxComp = <Fragment />;

  if (education) {
    jsxComp = (
      <Fragment>
        <h2 className="my-2">Education Credentials</h2>

        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>

          {education.map((education) => (
            <tbody key={education._id}>
              <tr>
                <td>{education.school}</td>
                <td className="hide-sm">{education.degree}</td>
                <td className="hide-sm">
                  <Moment format="MM/DD/YYYY">{education.from}</Moment> -
                  <Moment format="MM/DD/YYYY">{education.to}</Moment>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteEducation(education._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </Fragment>
    );
  } else jsxComp = <h1>no Education Added</h1>;

  return jsxComp;
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education,
});

const mapDispatchToProps = {
  deleteEducation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
