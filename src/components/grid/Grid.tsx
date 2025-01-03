import React, { useCallback } from 'react';
import { useMemo } from 'react';

import type { GridStateType } from '../../types/global-types';
import { GridBase, GridCell, GridCellActive, RobotId } from './GridStyles';

interface PropsType {
  gridState: GridStateType;
}

// Memoize the Grid component, so that it only re-renders if the props change
export const Grid: React.FC<PropsType> = React.memo(({ gridState }) => {
  const { gridSize, robots } = gridState;

  const getColumnCells = useCallback((rowNumber: number): JSX.Element[] => {
      // create a array map using the gridSize to optimize the perfomance of the cell generation functions
      return Array.from({ length: gridSize }, (_, cellNumber) => {
          const isRobotAtCell = robots.find((robot => robot.xCord === cellNumber && robot.yCord === rowNumber && robot.face && robot.isRobotPlaced))
          if (isRobotAtCell) {
            return <GridCellActive face={isRobotAtCell.face} key={`col${rowNumber}${cellNumber}`}>
            <RobotId>{isRobotAtCell.id}</RobotId> </GridCellActive>;
          }
        return <GridCell key={`col${rowNumber}${cellNumber}`} />;
      });
  }, [robots, gridSize]);
  
  // Memoize this function, so it will compute the rows only if,
  // the values in dependency array changes
  const generateGridRows = useMemo(() => {
    // create a array map using the gridSize to optimize the perfomance of the row generation functions
    return Array.from({ length: gridSize }, (_, rowNumber) => {
      const currentRow = gridSize - 1 - rowNumber;
      return <tr key={`row${currentRow}`}>{getColumnCells(currentRow)}</tr>;
    });
  }, [getColumnCells, gridSize]);

  return (
    <GridBase>
      <tbody>{generateGridRows}</tbody>
    </GridBase>
  );
});
