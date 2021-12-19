import styled from "styled-components";

export const Modal = styled("div")`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;
