import styled from 'styled-components';

import { DirectionofRobotFace } from '../../types/global-types';
import robotEast from '../../assets/robot_east.png';
import robotNorth from '../../assets/robot_north.png';
import robotSouth from '../../assets/robot_south.png';
import robotWest from '../../assets/robot_west.png';

interface ActiveCellProps {
  face: DirectionofRobotFace | undefined;
}

const GridBase = styled.table`
  margin: 20px auto;
  background: linear-gradient(to bottom, #f0f4f8, #c9d7e1);
  border-radius: 15px;
`;

const GridCell = styled.td`
  border: 3px solid black;
  height: 50px;
  width: 50px;
`;

const GridCellActive = styled.td<ActiveCellProps>`
  border: 3px solid black;
  height: 50px;
  width: 50px;

  ${(props): string | false =>
    props.face === DirectionofRobotFace.East &&
    `
      background-image: url(${robotEast});
    `};

  ${(props): string | false =>
    props.face === DirectionofRobotFace.North &&
    `
      background-image: url(${robotNorth});
    `};

  ${(props): string | false =>
    props.face === DirectionofRobotFace.South &&
    `
      background-image: url(${robotSouth});
    `};

  ${(props): string | false =>
    props.face === DirectionofRobotFace.West &&
    `
      background-image: url(${robotWest});
    `};
`;

const RobotId = styled.label `
color: white;
background-color: rgba(0, 0, 0, 0.6);
font-size: 10px;
font-weight: bold;
padding: 2px;
border-radius: 2px`;

export { GridBase, GridCell, GridCellActive, RobotId };
