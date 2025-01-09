
import { render, screen, fireEvent } from '@testing-library/react';
import { CommandInputSection } from './CommandInputSection';

// Mock the dispatch function
const mockOnEnter = jest.fn();

describe('CommandInputSection', () => {
  beforeEach(() => {
    mockOnEnter.mockClear();
  });

  // Check if the input field and button are rendered
  it('renders the input field and enter button correctly', () => {
    render(<CommandInputSection error={null} onEnter={mockOnEnter} />);

    const inputElement = screen.getByLabelText('command-input');
    const buttonElement = screen.getByRole('button', { name: /enter/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  // Make sure user input is correctly passed to the dispatch function
  it('handles user input correctly and calls onEnter with the parsed command', () => {
    render(<CommandInputSection error={null} onEnter={mockOnEnter} />);

    const inputElement = screen.getByLabelText('command-input');
    const buttonElement = screen.getByRole('button', { name: /enter/i });
    fireEvent.change(inputElement, { target: { value: 'MOVE 1 5 10 NORTH' } });
    fireEvent.click(buttonElement);

    expect(mockOnEnter).toHaveBeenCalledTimes(1);
    expect(mockOnEnter).toHaveBeenCalledWith({
      baseCommand: 'MOVE',
      error: null,
      face: 'NORTH',
      xCord: 5,
      yCord: 10,
      id: 1,
    });
  });
  
  // Check for input field, after enter
  it('clears the input field after clicking Enter', () => {
    render(<CommandInputSection error={null} onEnter={mockOnEnter} />);

    const inputElement = screen.getByLabelText('command-input');
    const buttonElement = screen.getByRole('button', { name: /enter/i });

    fireEvent.change(inputElement, { target: { value: 'MOVE 1 5 10 NORTH' } });
    fireEvent.click(buttonElement);

    // Verify that the input field is cleared
    expect(inputElement).toHaveValue('');
  });

  // Check whether the error message is shown correctly
  it('displays the error message if error prop is passed', () => {
    render(<CommandInputSection error="Invalid command" onEnter={mockOnEnter} />);
    const errorMessage = screen.getByLabelText('command-error');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Invalid command');
  });

  // Check for the error component when there is no error
  it('does not display error when error prop is null', () => {
    render(<CommandInputSection error={null} onEnter={mockOnEnter} />);

    // Check that the error message is not in the document
    const errorMessage = screen.queryByLabelText('command-error');
    expect(errorMessage).toBeNull();
  });
});
