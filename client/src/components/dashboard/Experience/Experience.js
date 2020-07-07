import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../../redux/actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  let jsxComp = <Fragment />;

  if (experience) {
    jsxComp = (
      <Fragment>
        <h2 className="my-2">Experience Credentials</h2>

        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>

          {experience.map((experience) => (
            <tbody key={experience._id}>
              <tr>
                <td>{experience.company}</td>
                <td className="hide-sm">{experience.title}</td>
                <td className="hide-sm">
                  <Moment format="MM/DD/YYYY">{experience.from}</Moment> -
                  <Moment format="MM/DD/YYYY">{experience.to}</Moment>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteExperience(experience._id);
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
  } else jsxComp = <h1>no experience Added</h1>;

  return jsxComp;
};

const mapStateToProps = (state) => ({
  experience: state.profile.profile.experience,
});

const mapDispatchToProps = {
  deleteExperience,
};

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
