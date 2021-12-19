const colors = {
  blue: [
    "hsl(203, 63%, 20%)",
    "hsl(205, 57%, 26%)",
    "hsl(207, 53%, 32%)",
    "hsl(208, 51%, 38%)",
    "hsl(209, 49%, 43%)",
    "hsl(207, 47%, 52%)",
    "hsl(204, 62%, 60%)",
    "hsl(202, 71%, 67%)",
    "hsl(199, 86%, 74%)",
    "hsl(191, 86%, 81%)",
  ],
};

const navbar = {
  iconColor: colors.blue[8],
  iconHover: colors.blue[1],
};

const todoListItem = {
  color: colors.blue[4],
  bg: colors.blue[9],
};

const textButtonCommon = {
  fontSize: 18,
  fontWeight: 500,
  padding: "20px 10px",
  borderRadius: 20,
  borderColor: "transparent",
  borderWidth: 2,
};
const textButton = {
  text: {
    ...textButtonCommon,
    color: colors.blue[1],
    "&:hover": {
      backgroundColor: `${colors.blue[1]}40`,
    },
  },
  outlined: {
    ...textButtonCommon,
    color: colors.blue[1],
    borderColor: colors.blue[1],
    "&:hover": {
      transform: "scale(0.98)",
      backgroundColor: `${colors.blue[1]}40`,
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

const lightTheme = {
  colors,
  navbar,
  todoListItem,
  maxWidth: "800px",
  textButton,
  modal,
};
export default lightTheme;
