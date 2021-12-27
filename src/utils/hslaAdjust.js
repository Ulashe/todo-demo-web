export const hslaAdjust = ({
  color,
  hue,
  saturation,
  lightness,
  alpha,
  hueAbs,
  satAbs,
  lgtAbs,
}) => {
  const hsla = color
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map((i) => Number(i.split("%")[0]));

  hsla[0] = hue ? hsla[0] + hue : hueAbs ? hueAbs : hsla[0];
  hsla[1] = saturation ? hsla[1] + saturation : satAbs ? satAbs : hsla[1];
  hsla[2] = lightness ? hsla[2] + lightness : lgtAbs ? lgtAbs : hsla[2];
  hsla[3] = alpha ? hsla[3] + alpha : hsla[3];

  return `hsla(${hsla[0]},${hsla[1]}%,${hsla[2]}%,${hsla[3]})`;
};
