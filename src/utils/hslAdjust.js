export const hslAdjust = (color, lightness) => {
  const hsl = color
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map((i) => Number(i.split("%")[0]));
  hsl[2] += lightness;
  return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
};
