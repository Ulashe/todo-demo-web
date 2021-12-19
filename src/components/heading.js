import styled from "styled-components";

export default styled("div")((props) => ({
  fontSize: 36,
  fontWeight: 600,
  letterSpacing: 2,
  color: props.theme.colors.blue[1],
}));
