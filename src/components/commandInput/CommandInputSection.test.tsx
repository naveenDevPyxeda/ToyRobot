import { render, screen, cleanup } from '@testing-library/react';

import { CommandInputSection } from './CommandInputSection';

// Mock function to pass in to the component
const onEnterMockFunc = jest.fn();

afterEach(() => {
    cleanup();
})

describe('commandInputSection', () => {
    // Check for the command input field and enter button
    it('renders the input and enter button', () => {
        render(<CommandInputSection error={null} onEnter={onEnterMockFunc} />);

        const commandInputField = screen.getByLabelText('command-input');
        expect(commandInputField).toBeInTheDocument();

        const enterButton = screen.getByText('Enter');
        expect(enterButton).toBeInTheDocument();
    })
})