import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { FlexBox, Text } from "../styled-components";
import { TextInput } from "../textInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/reducers/authentication";

export function SignIn({ openModal, closeModal, closeDropdown }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      setError({});
      axios
        .post("/auth/signin", { email, password })
        .then((res) => {
          setLoading(false);
          dispatch(signIn(res.data));
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
      heading="Giriş yapın"
      footer={[
        <TextButton key={1} variant="text" onClick={onSubmit} loading={loading}>
          Giriş yap
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "300px"]}
    >
      <FlexBox as="form" onSubmit={onSubmit} flexDirection="column" p={10} gridRowGap={10}>
        <Text fontSize={16} color={error.field == "email" ? "red" : undefined}>
          Email'inizi giriniz:
        </Text>
        <TextInput
          required
          type="email"
          value={email}
          onChange={setEmail}
          color="black"
          borderColor={error.field == "email" ? "red" : undefined}
        />
        {error.field == "email" ? (
          <Text fontSize={12} color="red" mt={-5}>
            {error.code == 0 ? "Email hatalı!" : error.code == 2 ? "Email bulunamadı!" : null}
          </Text>
        ) : null}
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
            {error.code == 3
              ? "Şifre en az 6 haneli olmalıdır!"
              : error.code == 4
              ? "Şifre yanlış!"
              : null}
          </Text>
        ) : null}
        <TextInput type="submit" display="none" />
      </FlexBox>
    </ModalFormLayout>
  );
}
