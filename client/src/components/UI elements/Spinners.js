import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const css = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  /* bring your own prefixes */
  transform: 'translate(-50%, -50%)',
  width: '200px',
  margin: 'auto',
  display: 'block',
};
export default () => (
  <Fragment>
    <img src={spinner} style={css} alt="Loading..." />
  </Fragment>
);
