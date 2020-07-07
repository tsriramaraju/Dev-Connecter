import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addExperience } from '../../redux/actions/profile';
import { Link } from 'react-router-dom';
const Addexperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [disableTO, setdisableTO] = useState(false);
  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    addExperience(formData);
  };

  const toDate = (check) => {
    if (check) {
      // setFormData({ ...formData, current: true });
      return <input type="date" name="to" disabled />;
    } else {
      // setFormData({ ...formData, current: false });
      return (
        <input type="date" name="to" value={to} onChange={onChangeHandler} />
      );
    }
  };
  const { company, title, location, from, to, current, description } = formData;

  return (
    <section class="container">
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={submit}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={onChangeHandler}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={onChangeHandler}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChangeHandler}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={onChangeHandler}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={() => setdisableTO(!disableTO)}
            />{' '}
            Current Job
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          {toDate(disableTO)}
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            value={description}
            onChange={onChangeHandler}
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default connect(null, { addExperience })(Addexperience);
