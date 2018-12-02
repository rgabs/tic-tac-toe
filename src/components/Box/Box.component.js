import React, {useState} from 'react';
import Row from '../Row/Row.component';
import replaceIndex from 'replace-array-index';
import swal from 'sweetalert';
import uuid from 'uuid';

const getUpdatedCells = (oldState, rowID, cellIndex, isXNext) => {
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

const getWinner = (boxState) => {
  const MATCHING_POSITIONS = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  const flatBox = [];
  let winner = '';
  boxState.forEach((row) => {
    flatBox.push(...row.items);
  });
  MATCHING_POSITIONS.every((line) => {
    const [a, b, c] = line;
    if (flatBox[a] && flatBox[a] === flatBox[b] && flatBox[a] === flatBox[c]) {
      winner = flatBox[a];
      return false;
    }
    return true;
  });
  return winner;
};

function Box() {
  const initialState =  {
    boxData: [
      {'items': ['', '', ''], 'id': uuid()},
      {'items':  ['', '', ''], 'id': uuid()},
      {'items':  ['', '', ''], 'id': uuid()}
    ],
    isXNext: true
  };
  const [state, setState ] = useState(initialState);
  const reset = () => setState(initialState);
  
  const cellclickHandler = (rowID, cellIndex) => () => {
    const {boxData, isXNext} = state;
    const newboxData = getUpdatedCells(boxData, rowID, cellIndex, isXNext);
    if (boxData) {
      setState({boxData: newboxData, isXNext: !isXNext});
      const winner = getWinner(newboxData);
      if (winner) {
        swal('Congratulations!', `Player ${winner} is the winner`, 'success').then(reset);
      }
    }
  }

  const createRow = (rowData) => <Row cellData={rowData.items}
    key={rowData.id} rowID={rowData.id} cellclickHandler={cellclickHandler} />

  return (
    <div className='box'>{state.boxData.map(createRow)}</div>
  );
  
}

export default Box;
