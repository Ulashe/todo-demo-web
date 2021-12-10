import styled from "styled-components";
import {
  variant,
  compose,
  layout,
  color,
  flexbox,
  space,
  typography,
  position,
  border,
} from "styled-system";

export const TextButton = styled("div")`
  text-align: center;
  cursor: pointer;
  border-style: solid;
  ${variant({ scale: "textButton" })}
  ${compose(layout, color, space, flexbox, position, border, typography)}
`;
