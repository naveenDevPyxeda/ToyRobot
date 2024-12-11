import React, { useState } from 'react';
import { MainCommand, DirectionofRobotFace } from '../../GlobalTypes';
import type { CommandType, GridStateType } from '../../GlobalTypes';
import { CommandInputSection } from './CommandInputSection';
import { CommandLine } from './CommandInputStyles';

interface PropsType {
  gridState: GridStateType;
  setGridState: (newGridState: GridStateType) => void;
}

export const CommandHandler: React.FC<PropsType> = (props) => {
  const { gridState, setGridState } = props;
  const [error, setError] = useState<string | null>(null);

  const placeRobot = (command: CommandType): void => {
    const { face, xCord, yCord } = command;

    let placingError = null;

    // Validate the placing command
    if (face === undefined || xCord === undefined || yCord === undefined) {
      placingError = 'Please insert 4 values while placing';
    } else {
      if (!Number.isInteger(xCord) || !Number.isInteger(yCord)) {
        placingError = 'X, Y coordinates must be integers';
      }

      if (xCord < 0 || yCord < 0 || xCord >= gridState.gridSize || yCord >= gridState.gridSize) {
        placingError = 'Can not use these coordinates on the table';
      }

      const validDirections = Object.values(DirectionofRobotFace) as string[];
      if (!face || !validDirections.includes(face)) {
        placingError = `Please give one of the directions from here: ${Object.values(validDirections).join(', ')}`;
      }
    }

    setError(placingError);
    const newGridState: GridStateType = {
      gridSize: 5,
      face: !placingError ? face : gridState.face,
      reportPosition: false,
      isRobotPlaced: !placingError ? true : gridState.isRobotPlaced,
      xCord: !placingError ? xCord : gridState.xCord,
      yCord: !placingError ? yCord : gridState.yCord
    };
    setGridState(newGridState);
  };

  const moveRobot = (): void => {
    const { face, isRobotPlaced, xCord, yCord } = gridState;

    let moveError = null;
    let x = xCord;
    let y = yCord;

    // Validations when moving the robot
    if (!isRobotPlaced || x === undefined || y === undefined) {
      moveError = 'Please place the robot first';
    } else {
      // Set new coordinates
      if (face === DirectionofRobotFace.East) {
        x = x + 2;
      } else if (face === DirectionofRobotFace.North) {
        y = y + 2;
      } else if (face === DirectionofRobotFace.South) {
        y = y - 2;
      } else if (face === DirectionofRobotFace.West) {
        x = x - 2;
      }
      // Check for out of the table grid coordinates
      if (x > 4 || y > 4 || x < 0 || y < 0) {
        moveError = 'You can not move the robot out of the table';
        // Do not move the robot if the coordinates are out of the table
        x = xCord;
        y = yCord;
      }
    }

    setError(moveError);
    const newGridState: GridStateType = {
      gridSize: 5,
      reportPosition: false,
      isRobotPlaced: isRobotPlaced,
      xCord: x,
      yCord: y,
      face: face,
    };
    setGridState(newGridState);
  };

  const turnRobot = (command: CommandType): void => {
    const { face, isRobotPlaced, xCord, yCord } = gridState;
    const { baseCommand } = command;

    let turnError = null;
    let newDirection: DirectionofRobotFace | undefined = face;

    // Check robot is placed and has a direction
    if (isRobotPlaced && face) {
      // Change direction by considering the current facing direction
      if (face === DirectionofRobotFace.East) {
        newDirection = baseCommand === MainCommand.Left ? DirectionofRobotFace.North : DirectionofRobotFace.South;
      }
      if (face === DirectionofRobotFace.North) {
        newDirection = baseCommand === MainCommand.Left ? DirectionofRobotFace.West : DirectionofRobotFace.East;
      }
      if (face === DirectionofRobotFace.South) {
        newDirection = baseCommand === MainCommand.Left ? DirectionofRobotFace.East : DirectionofRobotFace.West;
      }
      if (face === DirectionofRobotFace.West) {
        newDirection = baseCommand === MainCommand.Left ? DirectionofRobotFace.South : DirectionofRobotFace.North;
      }
    } else {
      turnError = 'Cannot turn unplaced robot';
    }

    setError(turnError);
    const newGridState: GridStateType = {
      gridSize: 5,
      reportPosition: false,
      isRobotPlaced: isRobotPlaced,
      face: newDirection,
      xCord: xCord,
      yCord: yCord,
    };
    setGridState(newGridState);
  };

  const reportPosition = (): void => {
    const { isRobotPlaced, face, xCord, yCord } = gridState;

    let reportError = null;
    // Validation when providing the report
    if (!isRobotPlaced) {
      reportError = 'Please place the robot to get a position';
      setError(reportError);
    }

    setError(reportError);
    const newGridState: GridStateType = {
      gridSize: 5,
      reportPosition: !reportError,
      isRobotPlaced: isRobotPlaced,
      face: face,
      xCord: xCord,
      yCord: yCord,
    };
    setGridState(newGridState);
  };

  const handleCommand = (command: CommandType): void => {
    const { baseCommand } = command;
    const validCommands = Object.values(MainCommand) as string[];

    let commandError = null;
    if (validCommands.includes(baseCommand)) {
      switch (baseCommand) {
        case MainCommand.Place:
          placeRobot(command);
          break;
        case MainCommand.Move:
          moveRobot();
          break;
        case MainCommand.Left:
          turnRobot(command);
          break;
        case MainCommand.Right:
          turnRobot(command);
          break;
        case MainCommand.Report:
          reportPosition();
          break;
        default:
          setError(`Invalid command ${baseCommand}`);
      }
    } else {
      commandError = `Invalid command`;
      setError(commandError);
    }
  };

  return (
    <CommandLine>
      <CommandInputSection error={error} handleCommand={handleCommand} />
    </CommandLine>
  );
};
