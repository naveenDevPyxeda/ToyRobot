import React from 'react';

import { CommandHelp } from './components/commandHelp/CommandHelp';
import { Grid } from './components/grid/Grid';
import { useRobotState } from './hooks/RobotState';

import { ToyRobotApp, Report } from './AppStyles';
import { CommandInputSection } from './components/commandInput/CommandInputSection';
import { Card } from './styles/common-styles';

const App: React.FC = () => {
  const [state, dispatch] = useRobotState();

  return (
    <ToyRobotApp>
      <Card>
      <Grid gridState={state} />
      </Card>
      {state.reportPosition && (
        <Report>
          Report:
          <strong aria-label='report'>{state.reportPosition}</strong>
        </Report>
      )}
      <CommandInputSection error={state.error} onEnter={dispatch} />
      <CommandHelp />
    </ToyRobotApp>
  );
};

export default App;
