import {Selector} from 'testcafe';

const URL =  'http://rahulgaba.com/tic-tac-toe/';

fixture `Getting Started`.// declare the fixture
    page `${URL}`;  // specify the start page

// then create a test and place your code there
test('should mark X and O on alternate clicked elements', async (t) => {
  const firstCell = Selector('.cell').nth(0);
  const seventhCell = Selector('.cell').nth(7);
  await t.
        click(firstCell).
        expect(firstCell.innerText).eql('X').
        expect(firstCell.hasClass('disabled-cell')).eql(true).
        click(seventhCell).
        expect(seventhCell.innerText).eql('O');
});

test('Success case: O should win', async (t) => {
  // [
        // X , X , O
        // X , O , _
        // O , _ , _
  // ]
  await t.
        click(Selector('.cell').nth(0)).
        click(Selector('.cell').nth(4)).
        click(Selector('.cell').nth(3)).
        click(Selector('.cell').nth(6)).
        click(Selector('.cell').nth(1)).
        click(Selector('.cell').nth(2)).
        expect(Selector('.swal-text').innerText).eql('Player O is the winner');
});

test('Success case: X should win', async (t) => {
  // [
        // X , O , X
        // O , X , _
        // O , _ , X
  // ]
  await t.
        click(Selector('.cell').nth(4)).
        click(Selector('.cell').nth(3)).
        click(Selector('.cell').nth(2)).
        click(Selector('.cell').nth(6)).
        click(Selector('.cell').nth(0)).
        click(Selector('.cell').nth(1)).
        click(Selector('.cell').nth(8)).
        expect(Selector('.swal-text').innerText).eql('Player X is the winner');
});