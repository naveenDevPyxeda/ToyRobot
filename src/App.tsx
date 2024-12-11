import React, { useState } from 'react';
import { ToyRobotApp, Report } from './AppStyles';
import { CommandHandler } from './Components/CommandInput/CommandHandler';
import { Grid } from './Components/Grid/Grid';
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
          <strong>{` ${gridState.xCord}, ${gridState.yCord}, ${gridState.face}`}</strong>
        </Report>
      )}
      <CommandHandler gridState={gridState} setGridState={setGridState} />
    </ToyRobotApp>
  );
};

export default App;
