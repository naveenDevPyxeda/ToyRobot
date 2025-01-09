import { render, screen, cleanup } from '@testing-library/react';

import { Grid } from './Grid';
import { GridStateType } from '../../types/global-types';

afterEach(() => {
    cleanup();
})

describe('Grid component', () => {
    // Check whether the grid has been rendered correctly
    it('renders the grid correctly', () => {
        const mockGridState: GridStateType = {
            gridSize: 5,
            robots: [],
            error: null,
        }

        render(<Grid gridState={mockGridState}/>);
        const allGridCells = screen.getAllByLabelText('empty-cell');
        expect(allGridCells.length).toBe(25);
    })
})