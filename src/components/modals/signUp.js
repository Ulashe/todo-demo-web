import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, FlexBox, Text } from "../styled-components";
import { TextInput } from "../textInput";
import axios from "axios";

export function SignUp({ openModal, closeModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    axios.post("/api/auth/signup", { name, email, password });
  };
  return (
    <ModalFormLayout
      heading="Üye olun"
      footer={[
        <TextButton key={1} variant="text" onClick={signUp}>
          Üye ol
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "300px"]}
    >
      <FlexBox as="form" flexDirection="column" p={10} gridRowGap={10}>
        <Text fontSize={20}>İsminizi giriniz:</Text>
        <TextInput value={name} onChange={setName} color="black" />
        <Text fontSize={20}>Email'inizi giriniz:</Text>
        <TextInput value={email} onChange={setEmail} color="black" />
        <Text fontSize={20}>Şifrenizi giriniz:</Text>
        <TextInput value={password} onChange={setPassword} color="black" />
      </FlexBox>
    </ModalFormLayout>
  );
}
