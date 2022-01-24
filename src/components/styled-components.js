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
import { Link as RouterLink } from "react-router-dom";

export const Box = styled("div")(compose(border, color, flexbox, layout, position, shadow, space));

export const Text = styled("p")(
  { whiteSpace: ({ wrap }) => (wrap ? "normal" : undefined) },
  compose(border, color, layout, position, shadow, space, typography)
);

export const FlexBox = styled("div")(
  (props) => ({
    display: "flex",
    flexDirection: props.vertical ? "column" : "row",
    justifyContent: props.center ? "center" : undefined,
    alignItems: props.center ? "center" : undefined,
  }),
  compose(border, color, grid, flexbox, layout, position, shadow, space)
);

export const Link = styled(RouterLink)(
  {
    textDecoration: "none",
    "&:focus,&:hover,&:visited,&:link, &:active": {
      textDecoration: "none",
    },
  },
  compose(border, color, grid, flexbox, layout, position, shadow, space)
);
