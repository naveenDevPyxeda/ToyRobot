export enum MainCommand {
  Place = 'PLACE',
  Move = 'MOVE',
  Left = 'LEFT',
  Right = 'RIGHT',
  Report = 'REPORT',
}

export interface CommandType {
  baseCommand: string;
  face?: DirectionofRobotFace;
  error: string | null;
  xCord?: number;
  yCord?: number;
}

export enum DirectionofRobotFace {
  East = 'EAST',
  North = 'NORTH',
  South = 'SOUTH',
  West = 'WEST',
}

export interface GridStateType {
  gridSize: number;
  face?: DirectionofRobotFace;
  reportPosition?: boolean;
  isRobotPlaced: boolean;
  xCord?: number;
  yCord?: number;
}  