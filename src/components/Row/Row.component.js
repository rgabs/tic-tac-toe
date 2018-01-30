import Cell from '../Cell/Cell.component';
import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';

const Row = ({cellData, cellclickHandler, rowID}) =>
  <div className='row'>
    <Cell value={cellData[0]} cellclickHandler={cellclickHandler(rowID, 0)}/>
    <Cell value={cellData[1]} cellclickHandler={cellclickHandler(rowID, 1)}/>
    <Cell value={cellData[2]} cellclickHandler={cellclickHandler(rowID, 2)}/>
  </div>;

Row.propTypes = {
  'cellclickHandler': PropTypes.func.isRequired,
  'cellData': PropTypes.array.isRequired,
  'rowID' : PropTypes.string.isRequired
};
Row.defaultProps = {
  'cellclickHandler': noop,
  'cellData': '',
  'rowID': 'XX'
};
export default Row;
