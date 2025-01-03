import React, { useState } from 'react';

import type { CommandType } from '../../GlobalTypes';

import {
  EnterButton,
  InputError,
  InputLable,
  InputField,
} from './CommandInputStyles';

interface PropsType {
  error: string | null;
  handleCommand: (command: CommandType) => void;
}

export const CommandInputSection: React.FC<PropsType> = (props) => {
  const { error, handleCommand } = props;

  const [command, setCommand] = useState('');

  const proceedWithCommand = (): void => {
    // Split the commands to identify each command
    const [baseCommand, xCord, yCord, face] = command.trim().toUpperCase().split(/[ ,]+/);

    const parsedCommand = {
      baseCommand,
      error: null,
      face: face || undefined,
      xCord: xCord ? parseInt(xCord, 10) : undefined,
      yCord: yCord ? parseInt(yCord, 10) : undefined,
    } as CommandType;

    handleCommand(parsedCommand);
    setCommand('');
  };

  const updateCommand = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCommand(event.target.value);
  };

  return (
    <>
      <InputLable>
        <p>Please type your commands here:</p>
        {error && <InputError aria-label='command-error'>{error}</InputError>}
        <InputField
          aria-label="command-input"
          onChange={updateCommand}
          placeholder="Give your command"
          type="text"
          value={command}
        />
      </InputLable>
      <EnterButton type="button" onClick={proceedWithCommand}>
        Enter
      </EnterButton>
    </>
  );
};
