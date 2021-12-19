import styled from "styled-components";
import { border, color, compose, flex, layout, position, shadow, space } from "styled-system";

export default styled.div(
  (props) => ({
    justifyContent: props.center ? "center" : undefined,
    alignItems: props.center ? "center" : undefined,
    cursor: props.cursor ? props.cursor : undefined,
    svg: {
      width: props.iconSize,
      height: props.iconSize,
      fill: props.fill
        ? typeof props.fill == "function"
          ? props.fill(props.theme)
          : props.fill
        : props.theme.colors.blue[1],
    },
    "&: hover": {
      backgroundColor: props.hoverBg
        ? typeof props.hoverBg == "function"
          ? props.hoverBg(props.theme)
          : props.hoverBg
        : undefined,
    },
  }),
  compose(border, color, flex, layout, position, shadow, space)
);
