const colors = {
  blue: [
    "#133c55",
    "#1d4969",
    "#26567d",
    "#2f6391",
    "#386fa4",
    "#498abe",
    "#59a5d8",
    "#6fbce7",
    "#84d2f6",
    "#a4e9f8",
  ],
};

const navbar = {
  iconColor: colors.blue[8],
  iconHover: colors.blue[1],
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

const lightTheme = {
  colors,
  navbar,
  maxWidth: "800px",
  textButton,
};
export default lightTheme;
