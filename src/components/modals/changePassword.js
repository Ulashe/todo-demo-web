import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { FlexBox, Text } from "../styled-components";
import { TextInput } from "../textInput";
import axios from "axios";
import { useSelector } from "react-redux";
import { getRefreshToken } from "../../redux/reducers/authentication";

export function ChangePassword({ openModal, closeModal, closeDropdown }) {
  const refreshToken = useSelector(getRefreshToken);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length > 0 && newPassword.length > 0) {
      setLoading(true);
      setError({});
      axios
        .post("/auth/changepassword", { password, newPassword, refreshToken })
        .then((res) => {
          setLoading(false);
          closeModal();
          closeDropdown();
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.error);
        });
    }
  };

  return (
    <ModalFormLayout
      heading="Şifrenizi değiştirin"
      footer={[
        <TextButton key={1} variant="text" onClick={onSubmit} loading={loading}>
          Değiştir
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "300px"]}
    >
      <FlexBox as="form" onSubmit={onSubmit} flexDirection="column" p={10} gridRowGap={10}>
        <Text fontSize={16} color={error.field == "password" ? "red" : undefined}>
          Şifrenizi giriniz:
        </Text>
        <TextInput
          required
          type="password"
          value={password}
          onChange={setPassword}
          color="black"
          minLength="6"
          borderColor={error.field == "password" ? "red" : undefined}
        />
        {error.field == "password" ? (
          <Text fontSize={12} color="red" mt={-5}>
            {error.code == 3 ? "Şifre en az 6 haneli olmalıdır!" : "Şifre yanlış!"}
          </Text>
        ) : null}
        <Text fontSize={16} color={error.field == "newPassword" ? "red" : undefined}>
          Yeni şifrenizi giriniz:
        </Text>
        <TextInput
          required
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          color="black"
          minLength="6"
          borderColor={error.field == "newPassword" ? "red" : undefined}
        />
        {error.field == "newPassword" ? (
          <Text fontSize={12} color="red" mt={-5}>
            Şifre en az 6 haneli olmalıdır!
          </Text>
        ) : null}
        <TextInput type="submit" display="none" />
      </FlexBox>
    </ModalFormLayout>
  );
}
