import styled from "styled-components";
import { border, color, compose, space, typography } from "styled-system";

export const Heading = styled("p")(
  (props) => ({
    fontSize: 36,
    fontWeight: 600,
    letterSpacing: 2,
    color: props.theme.colors.blue[1],
  }),
  compose(border, color, space, typography)
);
