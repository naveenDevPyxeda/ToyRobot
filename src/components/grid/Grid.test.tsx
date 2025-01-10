import { render, screen, within } from '@testing-library/react';

import { DirectionofRobotFace } from '../../types/global-types';

import { Grid } from './Grid';

const mockGridState = {
    gridSize: 5,
    robots: [
        {
            id: '1',
            xCord: 2,
            yCord: 3,
            face: DirectionofRobotFace.North,
            isRobotPlaced: true,
        },
        {
            id: '2',
            xCord: 4,
            yCord: 1,
            face: DirectionofRobotFace.East,
            isRobotPlaced: true,
        },
    ],
    error: null,
};

describe('Grid Component', () => {
    // Check whether the grid has been rendered correctly
    it('renders the grid correctly', () => {
        render(<Grid gridState={mockGridState} />);

        const emptyGridCells = screen.getAllByLabelText('empty-cell');
        const activeGridCells = screen.getAllByLabelText('active-cell');
        expect(emptyGridCells.length).toBe(23);
        expect(activeGridCells.length).toBe(2);
    });

    // Check for rows and columns
    it('should render the correct number of rows and columns based on gridSize', () => {
        render(<Grid gridState={mockGridState} />);

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(mockGridState.gridSize);
        rows.forEach(row => {
            const cells = within(row).getAllByRole('cell');
            expect(cells).toHaveLength(mockGridState.gridSize);
        });
    });

    // Check for dynamic change of the grid based on the gridsize
    it('should render grid dynamically based on gridSize', () => {
        const customGridState = { ...mockGridState, gridSize: 3 };

        render(<Grid gridState={customGridState} />);

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(customGridState.gridSize);
        rows.forEach(row => {
            const cells = within(row).getAllByRole('cell');
            expect(cells).toHaveLength(customGridState.gridSize);
        });
    });

    // Check for a robot which is not placed in the grid
    it('should not render robots if they are not placed', () => {
        const unplacedRobotState = {
            gridSize: 5,
            robots: [
                {
                    id: '1',
                    xCord: 2,
                    yCord: 3,
                    face: DirectionofRobotFace.East,
                    isRobotPlaced: false, // Robot is not placed in this test case
                },
            ],
            error: null,
        };

        render(<Grid gridState={unplacedRobotState} />);

        const robots = screen.queryByText('1');
        expect(robots).toBeNull();
    });
});