import styled from "styled-components";

export default styled("div")({
  fontSize: 36,
  fontWeight: 600,
  letterSpacing: 2,
  color: ({ theme }) => theme.colors.blue[1],
});
