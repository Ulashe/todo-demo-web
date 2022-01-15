import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, FlexBox, Text } from "../styled-components";
import { TextInput } from "../textInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/reducers/authentication";

export function SignUp({ openModal, closeModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0 && passwordAgain.length > 0) {
      if (password == passwordAgain) {
        setLoading(true);
        setError({});
        axios
          .post("/auth/signup", { email, password })
          .then((res) => {
            setLoading(false);
            dispatch(signIn(res.data));
            closeModal();
          })
          .catch((err) => {
            setLoading(false);
            const { errors, code } = err.response.data;
            setError(errors.find((i) => i.code == code));
          });
      } else {
        setError({ field: "passwordRepeat" });
      }
    }
  };
  return (
    <ModalFormLayout
      heading="Üye olun"
      footer={[
        <TextButton key={1} variant="text" onClick={onSubmit} loading={loading}>
          Üye ol
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
            {error.code == 1 ? "Email hatalı!" : error.code == 2 ? "Email zaten kullanımda!" : null}
          </Text>
        ) : null}
        {/* Password */}
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
            Şifre en az 6 haneli olmalıdır!
          </Text>
        ) : null}
        {/* Password repeat */}
        <Text fontSize={16} color={error.field == "passwordRepeat" ? "red" : undefined}>
          Şifrenizi tekrar giriniz:
        </Text>
        <TextInput
          required
          type="password"
          value={passwordAgain}
          onChange={setPasswordAgain}
          color="black"
          minLength="6"
          borderColor={error.field == "passwordRepeat" ? "red" : undefined}
        />
        {error.field == "passwordRepeat" ? (
          <Text fontSize={12} color="red" mt={-5}>
            Şifre aynı değil
          </Text>
        ) : null}
        <TextInput type="submit" display="none" />
      </FlexBox>
    </ModalFormLayout>
  );
}
