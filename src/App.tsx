import React, { useState } from 'react';

import { CommandHandler } from './components/commandInput/CommandHandler';
import { Grid } from './components/grid/Grid';

import { ToyRobotApp, Report } from './AppStyles';
import type { GridStateType } from './GlobalTypes';

const App: React.FC = () => {
  // Since the table is a chart with x and y coordinates, we can treat it as a grid
  // Make the grid size 5 as the default value is 5 by 5
  // Assume that at the start, robot is not placed
  const initialState: GridStateType = {
    gridSize: 5,
    isRobotPlaced: false,
  };
  const [gridState, setGridState] = useState(initialState);

  return (
    <ToyRobotApp>
      <Grid gridState={gridState} />
      {gridState.reportPosition && (
        <Report>
          Report:
          <strong aria-label='report'>{` ${gridState.xCord}, ${gridState.yCord}, ${gridState.face}`}</strong>
        </Report>
      )}
      <CommandHandler gridState={gridState} setGridState={setGridState} />
    </ToyRobotApp>
  );
};

export default App;
