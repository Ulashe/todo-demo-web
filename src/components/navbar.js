import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/reducers/authentication";
import IconWrapper from "./iconWrapper";
import { ReactComponent as AccountIcon } from "../assets/icons/account.svg";
import { ReactComponent as LoginIcon } from "../assets/icons/login.svg";

const Outer = styled("div")({
  backgroundColor: ({ theme }) => theme.colors.blue[0],
});

const Inner = styled("div")({
  maxWidth: ({ theme }) => theme.maxWidth,
  margin: "auto",
  position: "relative",
  padding: "0 10px",
});

const FlexBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Heading = styled("div")({
  color: "white",
  fontSize: 24,
  padding: 15,
});

const Dropdown = styled("div")({
  position: "absolute",
  margin: 5,
  borderRadius: 10,
  right: 0,
  backgroundColor: "#eee",
  color: "#666",
  padding: 15,
});

const IconWithText = styled("div")`
  display: flex;
  align-items: center;
  line-height: 0;
  padding: 4px 8px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[3]};
  }
`;

const IconText = styled("p")({
  fontSize: 16,
  color: ({ theme }) => theme.colors.blue[8],
});

export default function Navbar() {
  const auth = useSelector(getAuth);
  const [iconClicked, setIconClicked] = React.useState(false);

  return (
    <Outer>
      <Inner>
        <FlexBox>
          <Heading>To Do Demo</Heading>
          <IconWithText>
            <IconText>Giriş Yapın</IconText>
            <IconWrapper size="36px" onClick={() => setIconClicked((s) => !s)}>
              {auth.refreshToken ? <AccountIcon /> : <LoginIcon />}
            </IconWrapper>
          </IconWithText>
        </FlexBox>
        {iconClicked ? <Dropdown>Lorem ipsum</Dropdown> : null}
      </Inner>
    </Outer>
  );
}
