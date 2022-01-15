import React from "react";
import { Box, FlexBox, Text } from "./styled-components";
import { useTheme } from "styled-components";
import { ChangePassword, Confirm, ModalButton, SignIn, SignUp } from "./modals";
import { TextButton } from "./";
import { useDispatch } from "react-redux";
import { signOutThunk } from "../redux/reducers/authentication";
import { hslaAdjust } from "../utils/hslaAdjust";

export function NavbarDropdown({ containerRef, auth, closeDropdown }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const signOut = (callback) => {
    dispatch(signOutThunk(callback));
    closeDropdown();
  };

  return (
    <FlexBox
      ref={containerRef}
      flexDirection="column"
      gridRowGap={10}
      position="absolute"
      right={0}
      zIndex={1}
      mt={15}
      p={10}
      borderRadius={10}
      style={{ whiteSpace: "nowrap" }}
      bg={hslaAdjust({ color: theme.colors.blue[0], lightness: 70 })}
      maxWidth={200}
    >
      {auth.accessToken ? (
        <>
          <Text
            color="blue.1"
            fontSize={16}
            p={5}
            overflow="hidden"
            style={{ textOverflow: "ellipsis" }}
          >
            {auth.email}
          </Text>
          <Box height="1px" width="100%" bg="blue.1" />
          <ModalButton modalContent={<ChangePassword closeDropdown={closeDropdown} />}>
            <TextButton variant="text" fontSize={16} borderRadius={10}>
              Şifrenizi değiştirin
            </TextButton>
          </ModalButton>
          <Box height="1px" width="100%" bg="blue.1" />
          <ModalButton
            modalContent={
              <Confirm
                contentText="Çıkış yapmak istediğinizden emin misiniz ?"
                buttonText="Çıkış yap"
                onConfirm={signOut}
              />
            }
          >
            <TextButton variant="text" fontSize={16} borderRadius={10}>
              Çıkış yapın
            </TextButton>
          </ModalButton>
        </>
      ) : (
        <>
          <ModalButton modalContent={<SignIn closeDropdown={closeDropdown} />}>
            <TextButton variant="text" fontSize={16} borderRadius={10}>
              Giriş yapın
            </TextButton>
          </ModalButton>
          <Box height="1px" width="100%" bg="blue.1" />
          <ModalButton modalContent={<SignUp closeDropdown={closeDropdown} />}>
            <TextButton variant="text" fontSize={16} borderRadius={10}>
              Üye olun
            </TextButton>
          </ModalButton>
        </>
      )}
    </FlexBox>
  );
}
