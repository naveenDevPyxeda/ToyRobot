import { Robot } from "../types/global-types";

// Functions to find a robot using a given robotId
const findRobotById = (robots: Robot[], id: string): Robot | undefined => robots.find((robot) => robot.id === id);

export { findRobotById };