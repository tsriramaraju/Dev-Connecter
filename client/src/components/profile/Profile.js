import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIndividualProfile, getRepos } from '../../redux/actions/profile';
import Moment from 'react-moment';
import Spinners from '../UI elements/Spinners';
const Profile = ({
  profile,
  getIndividualProfile,
  getRepos,
  match,
  loading,
}) => {
  useEffect(() => {
    getIndividualProfile(match.params.id);
    getRepos('tsriram333');
  }, []);
  let jsxComponent;
  if (loading) jsxComponent = <Spinners />;
  else if (profile) {
    jsxComponent = (
      <Fragment>
        <div className="profile-top bg-primary p-2">
          <img className="round-img my-1" src={profile.user.avatar} alt="" />
          <h1 className="large">{profile.user.name}</h1>
          <p className="lead">{profile.experience[0].title}</p>
          <p>{profile.location}</p>
          <div className="icons my-1">
            {profile.social !== '' ? (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            ) : (
              <Fragment></Fragment>
            )}
            {Object.keys(profile.social).map((key) => {
              return (
                <a
                  href={profile.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              );
            })}
          </div>
        </div>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile.user.name}'s Bio</h2>
          <p>{profile.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profile.skills.map((skill) => (
              <div className="p-1">
                <i className="fa fa-check"></i> {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.map((experience) => (
            <div>
              <h3 className="text-dark">{experience.company}</h3>
              <p>
                <Moment format="MM/DD/YYYY">{experience.from}</Moment> -
                <Moment format="MM/DD/YYYY">{experience.to}</Moment>
              </p>
              <p>
                <strong>Position: </strong>
                {experience.title}
              </p>
              <p>
                <strong>Description: </strong>
                {experience.description}
              </p>
            </div>
          ))}
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.map((education) => (
            <div>
              <h3>{education.school}</h3>
              <p>
                <Moment format="MM/DD/YYYY">{education.from}</Moment> -
                <Moment format="MM/DD/YYYY">{education.to}</Moment>
              </p>
              <p>
                <strong>Degree: </strong>
                {education.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {education.fieldOfStudy}
              </p>
              <p>
                <strong>Description: </strong>
                {education.description}
              </p>
            </div>
          ))}
        </div>
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Repo One
                </a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Repo Two
                </a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    jsxComponent = (
      <Link to={'/developers'} className="btn btn-light">
        Ooop. No user Found, please Go Back
      </Link>
    );
  }

  return (
    <section className="container">
      <Link to={'/developers'} className="btn btn-light">
        Back To Profiles
      </Link>

      <div className="profile-grid my-1">{jsxComponent}</div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

const mapDispatchToProps = {
  getIndividualProfile,
  getRepos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
