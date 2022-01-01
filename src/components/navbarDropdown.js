import React from "react";
import { Box, Text } from "./styled-components";
import { useTheme } from "styled-components";
import { ModalButton, SignUp } from "./modals";

export function NavbarDropdown({ containerRef, auth }) {
  const theme = useTheme();
  return (
    <Box
      ref={containerRef}
      position="absolute"
      right={0}
      mt={15}
      p={10}
      borderRadius={10}
      style={{ whiteSpace: "nowrap" }}
      bg={theme.hslaAdjust({ color: theme.colors.blue[0], lightness: 65 })}
    >
      {auth.accessToken ? (
        <Text color="blue.0">{auth.email}</Text>
      ) : (
        <>
          <Text color="blue.0">Giriş yapın</Text>
          <hr></hr>
          <ModalButton modalContent={<SignUp />}>
            <Text color="blue.0">Üye olun</Text>
          </ModalButton>
        </>
      )}
    </Box>
  );
}
