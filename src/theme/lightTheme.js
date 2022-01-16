import { hslaAdjust } from "../utils/hslaAdjust";

const colors = {
  blue: [
    "hsl(203, 63%, 20%, 1)",
    "hsl(205, 57%, 26%, 1)",
    "hsl(207, 53%, 32%, 1)",
    "hsl(208, 51%, 38%, 1)",
    "hsl(209, 49%, 43%, 1)",
    "hsl(207, 47%, 52%, 1)",
    "hsl(204, 62%, 60%, 1)",
    "hsl(202, 71%, 67%, 1)",
    "hsl(199, 86%, 74%, 1)",
    "hsl(191, 86%, 81%, 1)",
  ],
  primary: "hsl(205, 57%, 26%,1)",
};

const navbar = {
  color: "white",
  bg: colors.blue[1],
  borderBottomColor: colors.blue[1],
  iconColor: hslaAdjust({ color: colors.primary, l: 60 }),
  iconHoverBg: hslaAdjust({ color: colors.primary, l: 10 }),
};

const todoListItem = {
  color: colors.primary,
  bg: hslaAdjust({ color: colors.primary, l: 60 }),
};

const textButtonCommon = {
  fontSize: 18,
  fontWeight: 500,
  padding: 10,
  borderRadius: 20,
  borderColor: "transparent",
  borderWidth: 2,
};
const textButton = {
  text: {
    ...textButtonCommon,
    color: colors.blue[1],
    "&:hover": {
      backgroundColor: hslaAdjust({ color: colors.blue[1], lAbs: 80 }),
    },
  },
  outlined: {
    ...textButtonCommon,
    color: colors.blue[1],
    borderColor: colors.blue[1],
    "&:hover": {
      transform: "scale(0.98)",
      backgroundColor: hslaAdjust({ color: colors.blue[1], lAbs: 80 }),
    },
  },
  contained: {
    ...textButtonCommon,
    color: "white",
    borderColor: colors.blue[1],
    backgroundColor: colors.blue[1],
    "&:hover": {
      borderColor: colors.blue[3],
      backgroundColor: colors.blue[3],
      transform: "scale(0.98)",
    },
  },
};

const modal = {
  bg: "white",
  color: colors.blue[1],
};

const theme = {
  colors,
  navbar,
  todoListItem,
  maxWidth: "800px",
  textButton,
  modal,
};

export default theme;
