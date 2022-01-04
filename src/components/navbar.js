import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/reducers/authentication";
import { IconWrapper } from "./iconWrapper";
import { useNavigate } from "react-router";
import { AccountIcon, LoginIcon } from "../assets/icons";
import { Box, FlexBox } from "./styled-components";
import { useOnClickOutside } from "../utils/useOnClickOutside";
import { NavbarDropdown } from "./";

export function Navbar() {
  const auth = useSelector(getAuth);
  const navigate = useNavigate();
  const goToHomepage = () => navigate("/");
  const buttonRef = React.useRef();
  const dropdownRef = React.useRef();
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const closeDropdown = React.useCallback(() => setIsDropdownVisible(false), []);
  const openDropdown = () => setIsDropdownVisible((s) => !s);
  useOnClickOutside({ buttonRef, dropdownRef, handler: closeDropdown });

  return (
    <Outer>
      <Inner>
        <FlexBox center justifyContent="space-between">
          <Heading style={{ cursor: "pointer" }} onClick={goToHomepage}>
            To Do Demo
          </Heading>
          <Box position="relative">
            <IconWrapper
              ref={buttonRef}
              iconFill={(theme) => theme.navbar.iconColor}
              iconSize="36px"
              onClick={openDropdown}
              hoverBg={(theme) => theme.colors.blue[3]}
              cursor="pointer"
              borderRadius={10}
            >
              {auth.refreshToken ? <AccountIcon /> : <LoginIcon />}
            </IconWrapper>
            {isDropdownVisible ? (
              <NavbarDropdown
                containerRef={dropdownRef}
                auth={auth}
                closeDropdown={closeDropdown}
              />
            ) : null}
          </Box>
        </FlexBox>
      </Inner>
    </Outer>
  );
}

const Outer = styled("div")({
  backgroundColor: ({ theme }) => theme.colors.blue[0],
});

const Inner = styled("div")({
  maxWidth: ({ theme }) => theme.maxWidth,
  margin: "auto",
  padding: "0 10px",
});

const Heading = styled("div")({
  color: "white",
  fontSize: 24,
  padding: 15,
});
