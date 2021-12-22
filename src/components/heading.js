import styled from "styled-components";

export const Heading = styled("p")((props) => ({
  fontSize: 36,
  fontWeight: 600,
  letterSpacing: 2,
  color: props.theme.colors.blue[1],
}));
