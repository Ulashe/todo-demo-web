import React from "react";
import { Box, FlexBox, Text } from "./styled-components";
import { useTheme } from "styled-components";
import { ModalButton, SignUp } from "./modals";
import { TextButton } from "./";

export function NavbarDropdown({ containerRef, auth, closeDropdown }) {
  const theme = useTheme();

  return (
    <FlexBox
      ref={containerRef}
      flexDirection="column"
      gridRowGap={10}
      position="absolute"
      right={0}
      mt={15}
      p={10}
      borderRadius={10}
      style={{ whiteSpace: "nowrap" }}
      bg={theme.hslaAdjust({ color: theme.colors.blue[0], lightness: 70 })}
    >
      {auth.accessToken ? (
        <Text color="blue.0">{auth.email}</Text>
      ) : (
        <>
          <TextButton variant="text">Giriş yapın</TextButton>
          <Box height="1px" width="100%" bg="blue.8" />
          <ModalButton modalContent={<SignUp />}>
            <TextButton variant="text">Üye olun</TextButton>
          </ModalButton>
        </>
      )}
    </FlexBox>
  );
}
