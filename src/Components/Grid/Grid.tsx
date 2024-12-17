import React from 'react';

import type { GridStateType } from '../../GlobalTypes';

import { GridBase, GridCell, GridCellActive } from './GridStyles';

interface PropsType {
  gridState: GridStateType;
}

export const Grid: React.FC<PropsType> = (props) => {
  const {
    gridState: { face, gridSize, isRobotPlaced, xCord, yCord },
  } = props;

  const getColumnCells = (rowNumber: number): JSX.Element[] => {
    const cells = [];
    let i = 0;

    while (i < gridSize) {
      if (i === xCord && rowNumber === yCord && isRobotPlaced && face) {
        cells.push(<GridCellActive face={face} key={`col${rowNumber}${i}`} />);
      } else {
        cells.push(<GridCell key={`col${rowNumber}${i}`} />);
      }
      i++;
    }

    return cells;
  };

  const printGridRows = (): JSX.Element[] => {
    const rows = [];
    let i = gridSize - 1;

    while (i >= 0) {
      rows.push(<tr key={`row ${i}`}>{getColumnCells(i)}</tr>);
      i--;
    }

    return rows;
  };

  return (
    <GridBase>
      <tbody>{printGridRows()}</tbody>
    </GridBase>
  );
};
