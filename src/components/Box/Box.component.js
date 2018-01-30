import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Row from '../Row/Row.component';
import replaceIndex from 'replace-array-index';
import swal from 'sweetalert';
import uuid from 'uuid';

class Box extends Component {
  initialState = {
    boxData: [
      {'items': ['', '', ''], 'id': uuid()},
      {'items':  ['', '', ''], 'id': uuid()},
      {'items':  ['', '', ''], 'id': uuid()}
    ],
    isXNext: true
  }
  state = this.initialState

  reset = () => this.setState(this.initialState)

  getUpdatedCells = (oldState, rowID, cellIndex, isXNext) => {
    const foundRow = oldState.find((rowData) => rowData.id === rowID);
    if (!foundRow) {
      return;
    }
    const selectedRowIndex = oldState.indexOf(foundRow);
    const newCellValue = isXNext ? 'X' : 'O';
    const items = replaceIndex(foundRow.items, cellIndex, newCellValue);
    const updatedRow = {id: rowID, items};
    const newBoxData = replaceIndex(oldState, selectedRowIndex, updatedRow);
    return newBoxData;
  }

  MATCHING_POSITIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  getWinner = (boxState) => {
    // Write logic here
    const flatBox = [];
    let winner = '';
    boxState.forEach((row) => {
      flatBox.push(...row.items);
    });
    this.MATCHING_POSITIONS.every((line) => {
      const [a, b, c] = line;
      if (flatBox[a] && flatBox[a] === flatBox[b] && flatBox[a] === flatBox[c]) {
        winner = flatBox[a];
        return false;
      }
      return true;
    });
    return winner;
  }



  cellclickHandler = (rowID, cellIndex) => () => {
    const {boxData, isXNext} = this.state;
    const newboxData = this.getUpdatedCells(boxData, rowID, cellIndex, isXNext);
    if (boxData) {
      this.setState({boxData: newboxData, isXNext: !isXNext});
      const winner = this.getWinner(newboxData);
      if (winner) {
        swal('Congratulations!', `Player ${winner} is the winner`, 'success').then(this.reset);
      }
    }
  }

  createRow = (rowData) => <Row cellData={rowData.items}
    key={rowData.id} rowID={rowData.id} cellclickHandler={this.cellclickHandler} />

  render () {
    const rowItems = this.state.boxData;
    const rows = rowItems.map(this.createRow);
    return (
      <div className='box'>{rows}</div>
    );
  }
}
Box.propTypes = {'boxData': PropTypes.array.isRequired};
Box.defaultProps = {'boxData': []};
export default Box;
