import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  let element;
  if (alerts.length == 0) {
    element = <Fragment />;
  } else {
    element = alerts.map((err) => {
      return (
        <div
          key={err.id}
          style={{ marginTop: '80px' }}
          className={`alert alert-${err.alertType}`}
        >
          {err.msg}
        </div>
      );
    });
  }

  return element;
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
