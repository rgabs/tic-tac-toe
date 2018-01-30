import Cell from '../Cell.component';
import React from 'react';
import noop from 'lodash/noop';
import renderer from 'react-test-renderer';
test('Cell: snapshot test', () => {
  const cell = 'X';
  const snapshot = renderer.create(<Cell value={cell}
    cellclickHandler={noop}/>).toJSON();
  expect(snapshot).toMatchSnapshot();
});
