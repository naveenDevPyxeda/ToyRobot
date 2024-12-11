import styled from 'styled-components';
import { DirectionofRobotFace } from '../../GlobalTypes';
import robotEast from '../../Images/robot_east.png';
import robotNorth from '../../Images/robot_north.png';
import robotSouth from '../../Images/robot_south.png';
import robotWest from '../../Images/robot_west.png';

interface ActiveCellProps {
  face: DirectionofRobotFace;
}


const GridBase = styled.table`
  margin: 20px auto;
`;

const GridCell = styled.td`
  border: 1px solid black;
  height: 50px;
  width: 50px;
`;

const GridCellActive = styled.td<ActiveCellProps>`
  border: 1px solid black;
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

export { GridBase, GridCell, GridCellActive };
