import styled from "styled-components";

export default styled.div`
  svg {
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    fill: ${(props) => (props.fill ? props.fill : props.theme.navbar.iconColor)};
  }
`;
