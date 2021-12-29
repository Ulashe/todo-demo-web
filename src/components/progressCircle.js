import styled from "styled-components";
import { space } from "styled-system";

export function ProgressCircle({
  angleColor,
  backgroundColor = "#ddd",
  innerBgColor = "#eee",
  percent,
  ratio,
  boxSize = 60,
  strokeWidth = 5,
  children,
  ...rest
}) {
  const angle = ratio || ratio == 0 ? (ratio == 0 ? 15 : ratio * 360) : (percent / 100) * 360;

  return (
    <Outer
      boxSize={boxSize}
      angle={angle}
      angleColor={angleColor}
      backgroundColor={backgroundColor}
      {...rest}
    >
      <Inner boxSize={boxSize - strokeWidth * 2} backgroundColor={innerBgColor}>
        {children}
      </Inner>
    </Outer>
  );
}

const Outer = styled("div")((props) => {
  const color =
    typeof props.angleColor == "function" ? props.angleColor(props.theme) : props.angleColor;
  const background = `conic-gradient(${color} ${props.angle}deg, ${props.backgroundColor} ${props.angle}deg 360deg)`;

  return {
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: props.background,
    width: props.boxSize,
    height: props.boxSize,
    background: background,
  };
}, space);

const Inner = styled("div")((props) => ({
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: props.backgroundColor,
  width: props.boxSize,
  height: props.boxSize,
}));
