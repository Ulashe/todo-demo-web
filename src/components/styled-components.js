import styled from "styled-components";
import {
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from "styled-system";

export const Box = styled("div")(compose(border, color, flexbox, layout, position, shadow, space));

export const Text = styled("p")(
  compose(border, color, layout, position, shadow, space, typography)
);

export const FlexBox = styled("div")(
  {
    display: "flex",
  },
  compose(border, color, grid, flexbox, layout, position, shadow, space)
);
