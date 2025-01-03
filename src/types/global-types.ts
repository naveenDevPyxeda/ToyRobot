export enum MainCommand {
  Place = 'PLACE',
  Move = 'MOVE',
  Left = 'LEFT',
  Right = 'RIGHT',
  Report = 'REPORT',
}

export enum DirectionCommand {
  Left = 'LEFT',
  Right = 'RIGHT',
}

export interface CommandType {
  baseCommand: MainCommand;
  id: number;
  face?: DirectionofRobotFace;
  xCord?: number;
  yCord?: number;
}

export enum DirectionofRobotFace {
  East = 'EAST',
  North = 'NORTH',
  South = 'SOUTH',
  West = 'WEST',
}

export interface Robot {
  id: string,
  isRobotPlaced: boolean;
  face: DirectionofRobotFace;
  xCord: number;
  yCord: number;
}

export interface GridStateType {
  gridSize: number;
  error: string | null,
  robots: Robot[],
  reportPosition?: string;
}