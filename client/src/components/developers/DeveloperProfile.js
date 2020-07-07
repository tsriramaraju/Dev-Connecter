import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Developerprofile = ({ profiles }) => {
  return profiles.map((profile, index) => (
    <div className="profile bg-light">
      <img className="round-img" src={profile.user.avatar} alt="" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{profile.status}</p>
        <p>{profile.location}</p>
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {profile.skills.map((skill) => (
          <li className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  ));
};
const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps)(Developerprofile);
