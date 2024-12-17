import { render, screen,fireEvent } from '@testing-library/react';

import App from './App';

// Render the app in here, so we can use this function in each test case
const testUtils = (): any => {
  render(<App/>);
}

// Test cases

test('report output as 2, 0, EAST', () => {
  testUtils();
  const commandInput = screen.getByLabelText('command-input');
  fireEvent.change(commandInput, { target: { value: 'PLACE 0,0,EAST' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'MOVE' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'REPORT' } })
  fireEvent.click(screen.getByText('Enter'))
  expect(screen.getByLabelText('report').textContent).toEqual(' 2, 0, EAST')
});

test('report output as 0, 2, WEST', () => {
  testUtils();
  const commandInput = screen.getByLabelText('command-input');
  fireEvent.change(commandInput, { target: { value: 'PLACE 0,0,NORTH' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'MOVE' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'LEFT' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'REPORT' } })
  fireEvent.click(screen.getByText('Enter'))
  expect(screen.getByLabelText('report').textContent).toEqual(' 0, 2, WEST')
});

test('report output as 0, 2, EAST', () => {
  testUtils();
  const commandInput = screen.getByLabelText('command-input');
  fireEvent.change(commandInput, { target: { value: 'PLACE 0,0,NORTH' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'MOVE' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'RIGHT' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'REPORT' } })
  fireEvent.click(screen.getByText('Enter'))
  expect(screen.getByLabelText('report').textContent).toEqual(' 0, 2, EAST')
});

test('Validate the place command', () => {
  testUtils();
  const commandInput = screen.getByLabelText('command-input');
  fireEvent.change(commandInput, { target: { value: 'PLACE 0,5,NORTH' } })
  fireEvent.click(screen.getByText('Enter'))
  expect(screen.getByLabelText('command-error').textContent).toEqual('Can not use these coordinates on the table')
});

test('Validate the number of arguments in place command', () => {
  testUtils();
  const commandInput = screen.getByLabelText('command-input');
  fireEvent.change(commandInput, { target: { value: 'PLACE' } })
  fireEvent.click(screen.getByText('Enter'))
  expect(screen.getByLabelText('command-error').textContent).toEqual('Please insert 4 values while placing')
});

test('Validate the robot is placed before moving', () => {
  testUtils();
  const commandInput = screen.getByLabelText('command-input');
  fireEvent.change(commandInput, { target: { value: 'MOVE' } })
  fireEvent.click(screen.getByText('Enter'))
  expect(screen.getByLabelText('command-error').textContent).toEqual('Please place the robot first')
});

test('Validate the robot is placed before reporting', () => {
  testUtils();
  const commandInput = screen.getByLabelText('command-input');
  fireEvent.change(commandInput, { target: { value: 'REPORT' } })
  fireEvent.click(screen.getByText('Enter'))
  expect(screen.getByLabelText('command-error').textContent).toEqual('Please place the robot to get a position')
});

test('Validate the commands given are not moving the robot out of the table', () => {
  testUtils();
  const commandInput = screen.getByLabelText('command-input');
  fireEvent.change(commandInput, { target: { value: 'PLACE 0,4,NORTH' } })
  fireEvent.click(screen.getByText('Enter'))
  fireEvent.change(commandInput, { target: { value: 'MOVE' } })
  fireEvent.click(screen.getByText('Enter'))
  expect(screen.getByLabelText('command-error').textContent).toEqual('You can not move the robot out of the table')
});
