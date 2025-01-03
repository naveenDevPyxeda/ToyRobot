import React, { useState } from 'react';

import type { CommandType } from '../../types/global-types';
import {
  EnterButton,
  InputError,
  InputLable,
  InputField,
} from './CommandInputStyles';

interface PropsType {
  error: string | null,
  onEnter: (command: CommandType) => void;
}

const CommandInputSection: React.FC<PropsType> = (props) => {
  const { error, onEnter } = props;

  const [command, setCommand] = useState('');

  const proceedWithCommand = (): void => {
    // Split the commands to identify each command
    const [baseCommand, id, xCord, yCord, face] = command.trim().toUpperCase().split(/[ ,]+/);

    const parsedCommand = {
      baseCommand,
      error: null,
      face: face || undefined,
      xCord: xCord ? parseInt(xCord, 10) : undefined,
      yCord: yCord ? parseInt(yCord, 10) : undefined,
      id: id ? parseInt(id, 10) : undefined,
    } as CommandType;

    onEnter(parsedCommand);
    setCommand('');
  };

  const updateCommand = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCommand(event.target.value);
  };

  return (
    <>
      <InputLable>
        <p>Please type your commands here:</p>
        <InputField
          aria-label="command-input"
          onChange={updateCommand}
          placeholder="Give your command"
          type="text"
          value={command}
        />
        {error && <InputError aria-label='command-error'>{error}</InputError>}
      </InputLable>
      <EnterButton onClick={proceedWithCommand}>
        Enter
      </EnterButton>
    </>
  );
};

export { CommandInputSection };
