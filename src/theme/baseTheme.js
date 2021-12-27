import { hslaAdjust } from "../utils/hslaAdjust";

const space = []; // space reset for styled-system, this will be used later

const sizes = { width: [0, 1] }; // space reset for styled-system, this will be used later

const breakpoints = ["480px", "768px", "1024px", "1200px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

export default { space, sizes, breakpoints, hslaAdjust };
