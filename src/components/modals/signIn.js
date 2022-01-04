import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, FlexBox, Text } from "../styled-components";
import { TextInput } from "../textInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/reducers/authentication";

export function SignIn({ openModal, closeModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      axios.post("/auth/signin", { email, password }).then((res) => {
        closeModal();
        dispatch(signIn(res.data));
      });
    }
  };
  return (
    <ModalFormLayout
      heading="Giriş yapın"
      footer={[
        <TextButton key={1} variant="text" onClick={onSubmit}>
          Giriş yap
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "300px"]}
    >
      <FlexBox as="form" onSubmit={onSubmit} flexDirection="column" p={10} gridRowGap={10}>
        <Text fontSize={16}>Email'inizi giriniz:</Text>
        <TextInput type="email" value={email} onChange={setEmail} color="black" />
        <Text fontSize={16}>Şifrenizi giriniz:</Text>
        <TextInput type="password" value={password} onChange={setPassword} color="black" />
        <TextInput type="submit" display="none" />
      </FlexBox>
    </ModalFormLayout>
  );
}
