import { useReducer } from 'react';

import { DirectionofRobotFace, GridStateType, DirectionCommand } from '../types/global-types';
import { findRobotById } from '../utils/robot-utils';

const initialState: GridStateType = {
    gridSize: 5, // Hard coded for now, we can use a value that comes from a api, 
    // so that we can use the implementation for different grid sizes
    robots: [],
    error: null,
};

const validateCommand = (xCord: number | undefined, yCord: number | undefined, face: DirectionofRobotFace | undefined,
    state: GridStateType, id: number): string | null => {
    if (face === undefined || xCord === undefined || yCord === undefined || id === undefined) {
        return 'Please insert 5 values while placing';
    } else {
        if (!Number.isInteger(xCord) || !Number.isInteger(yCord)) {
            return 'X, Y coordinates must be integers';
        }

        if (xCord < 0 || yCord < 0 || xCord >= state.gridSize || yCord >= state.gridSize) {
            return 'Cannot use these coordinates on the table';
        }

        const validDirections = Object.values(DirectionofRobotFace) as string[];
        if (!face || !validDirections.includes(face)) {
            return `Please give one of the directions from here: ${validDirections.join(', ')}`;
        }
    }

    return null;
};

const robotReducer = (state: GridStateType, action: any): GridStateType => {
    // Reset errors and reportings when a new command is issued
    const resetState = { ...state, error: null, reportPosition: undefined };
    // Make sure that robotId is passed with every command
    if (action.id === undefined || !Number.isInteger(action.id)) {
        return { ...resetState, error: 'Please provide a valid robot id' };
    }
    switch (action.baseCommand) {
        case 'PLACE': {
            const { xCord, yCord, face, id } = action;
            const error = validateCommand(xCord, yCord, face, resetState, id);
            if (error) {
                return { ...resetState, error: error };
            }

            const currentRobots = [...resetState.robots];
            const robotIndex = currentRobots.findIndex((robot => robot.id === id));
            // Check whether robot already exists in the system
            // Better to keep current robot info in backend, good practice to handle high load
            if (robotIndex > -1) {
                currentRobots[robotIndex] = { id, xCord, yCord, face, isRobotPlaced: true };
            } else {
                currentRobots.push({ id, xCord, yCord, face, isRobotPlaced: true });
            }
            return {
                ...resetState,
                robots: currentRobots
            };
        }

        case 'MOVE': {
            const { id } = action;
            const robot = findRobotById(resetState.robots, id);
            if (!robot?.isRobotPlaced) {
                return {
                    ...resetState,
                    error: 'Please place the robot first'
                };
            }

            let newX = robot.xCord;
            let newY = robot.yCord;

            switch (robot.face) {
                // The amount of cells that the robot moves can be retrieved from an api,
                // So that we don't need to hard code
                case 'NORTH': newY += 2; break;
                case 'SOUTH': newY -= 2; break;
                case 'EAST': newX += 2; break;
                case 'WEST': newX -= 2; break;
            }

            if (newX < 0 || newY < 0 || newX >= state.gridSize || newY >= state.gridSize) {
                return {
                    ...resetState,
                    error: 'You cannot move the robot out of the table'
                };
            }

            const currentRobots = resetState.robots.map((robot) => robot.id === id ? { ...robot, xCord: newX, yCord: newY } : robot);

            return {
                ...resetState,
                robots: currentRobots
            };
        }

        case 'LEFT': {
            const { id } = action;
            const robot = findRobotById(resetState.robots, id);
            if (!robot?.isRobotPlaced) {
                return {
                    ...resetState,
                    error: 'Cannot turn an unplaced robot'
                };
            }
            // Map the direction of the robot in a nested object depending on the current direction and command given
            const directionMapping: Record<DirectionofRobotFace, Record<DirectionCommand, DirectionofRobotFace>> = {
                [DirectionofRobotFace.East]: { [DirectionCommand.Left]: DirectionofRobotFace.North, [DirectionCommand.Right]: DirectionofRobotFace.South },
                [DirectionofRobotFace.North]: { [DirectionCommand.Left]: DirectionofRobotFace.West, [DirectionCommand.Right]: DirectionofRobotFace.East },
                [DirectionofRobotFace.South]: { [DirectionCommand.Left]: DirectionofRobotFace.East, [DirectionCommand.Right]: DirectionofRobotFace.West },
                [DirectionofRobotFace.West]: { [DirectionCommand.Left]: DirectionofRobotFace.South, [DirectionCommand.Right]: DirectionofRobotFace.North },
            };

            const newDirection = directionMapping[robot.face]?.[DirectionCommand.Left];
            const currentRobots = resetState.robots.map((robot) => robot.id === id ? { ...robot, face: newDirection } : robot);

            return {
                ...resetState,
                robots: currentRobots
            };
        }

        case 'RIGHT': {
            const { id } = action;
            const robot = findRobotById(resetState.robots, id);
            if (!robot?.isRobotPlaced || !robot.face) {
                return {
                    ...resetState,
                    error: 'Cannot turn an unplaced robot'
                };
            }
            // Map the direction of the robot in a nested object depending on the current direction and command given
            const directionMapping: Record<DirectionofRobotFace, Record<DirectionCommand, DirectionofRobotFace>> = {
                [DirectionofRobotFace.East]: { [DirectionCommand.Left]: DirectionofRobotFace.North, [DirectionCommand.Right]: DirectionofRobotFace.South },
                [DirectionofRobotFace.North]: { [DirectionCommand.Left]: DirectionofRobotFace.West, [DirectionCommand.Right]: DirectionofRobotFace.East },
                [DirectionofRobotFace.South]: { [DirectionCommand.Left]: DirectionofRobotFace.East, [DirectionCommand.Right]: DirectionofRobotFace.West },
                [DirectionofRobotFace.West]: { [DirectionCommand.Left]: DirectionofRobotFace.South, [DirectionCommand.Right]: DirectionofRobotFace.North },
            };

            const newDirection = directionMapping[robot.face]?.[DirectionCommand.Right];
            const currentRobots = resetState.robots.map((robot) => robot.id === id ? { ...robot, face: newDirection } : robot);

            return {
                ...resetState,
                robots: currentRobots
            };
        }

        case 'REPORT': {
            const { id } = action;
            const robot = findRobotById(state.robots, id);
            if (!robot?.isRobotPlaced) {
                return {
                    ...resetState,
                    error: 'Please place the robot first to get the position'
                };
            }

            const report = ` Robot ${id} in position: (${robot.xCord}, ${robot.yCord}) is facing: ${robot.face}`;
            return {
                ...resetState,
                reportPosition: report
            };
        }

        default:
            return { ...state, error: 'Invalid Command' };
    }
};

// Pass the reducer function and initialState to the useReducer hook
const useRobotState = () => {
    return useReducer(robotReducer, initialState);
};

export { useRobotState };
