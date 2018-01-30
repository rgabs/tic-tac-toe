import './Cell.style.css';
import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';


const Cell = ({value, cellclickHandler}) =>
  <div className={`cell ${value ? 'disabled-cell' : '' }`} onClick={cellclickHandler} >{value}</div>;


Cell.propTypes = {
  'cellclickHandler': PropTypes.func.isRequired,
  'value': PropTypes.oneOf([
    'X',
    'O',
    ''
  ]).isRequired
};
Cell.defaultProps = {
  'cellclickHandler': noop,
  'value': ''
};

export default Cell;
