import Box from '../Box.component';
import React from 'react';
import Row from '../../Row/Row.component';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('Box group Test', () => {
  it('Box: snapshot test', () => {
    const snapshot = renderer.create(<Box />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  it('Box.getWinner: should return winner', () => {
    const boxState = [
      {'items': ['X', 'X', 'X'], 'id': '111'},
      {'items': ['', '', ''], 'id': '222'},
      {'items': ['', '', ''], 'id': '333'}
    ];
    const box = shallow(<Box />).instance();
    expect(box.getWinner(boxState)).toEqual('X');
  });
  it('Box.getWinner: should return winner', () => {
    const boxState = [
      {'items': ['X', '', 'X'], 'id': '111'},
      {'items': ['', '', ''], 'id': '222'},
      {'items': ['', '', ''], 'id': '333'}
    ];
    const box = shallow(<Box />).instance();
    expect(box.getWinner(boxState)).toBe('');
  });
  it('Box.getWinner: should return winner', () => {
    const boxState = [
      {'items': ['X', '', ''], 'id': '111'},
      {'items': ['', 'X', ''], 'id': '222'},
      {'items': ['', '', 'X'], 'id': '333'}
    ];
    const box = shallow(<Box />).instance();
    expect(box.getWinner(boxState)).toEqual('X');
  });
  it('Box.getWinner: should return winner', () => {
    const boxState = [
      {'items': ['O', 'X', 'O'], 'id': '111'},
      {'items': ['X', 'O', 'X'], 'id': '222'},
      {'items': ['O', '', 'X'], 'id': '333'}
    ];
    const box = shallow(<Box />).instance();
    expect(box.getWinner(boxState)).toEqual('O');
  });
  it('Box: getUpdatedCells test', () => {
    const oldState = [
      {'items': ['', '', ''], 'id': '111'},
      {'items': ['', '', ''], 'id': '222'},
      {'items': ['', '', ''], 'id': '333'}
    ];
    Object.freeze(oldState);
    const expected = [
      {'items': ['', '', ''], 'id': '111'},
      {'items': ['', '', 'X'], 'id': '222'},
      {'items': ['', '', ''], 'id': '333'}
    ];
    const box = shallow(<Box />).instance();
    const returnedData = box.getUpdatedCells(oldState, '222', 2, true);
    expect(returnedData).toEqual(expected);
    expect(oldState[1]).toEqual({'items': ['', '', ''], 'id': '222'});
  });

  it('Box: createRow test', () => {
    const box = shallow(<Box  />).instance();
    const rowData = {
      'items': ['yo'],
      'id': 'yoyo'
    };
    const expected = <Row cellData={['yo']} key='yoyo' rowID={'yoyo'} cellclickHandler={box.cellclickHandler} />;
    expect(box.createRow(rowData)).toEqual(expected);
  });
});
