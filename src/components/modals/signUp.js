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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (name.length > 0 && email.length > 0 && password.length > 0 && passwordAgain.length > 0) {
      if (password == passwordAgain) {
        axios
          .post("/auth/signup", { name, email, password })
          .then((res) => {
            setLoading(false);
            dispatch(signIn(res.data));
            closeModal();
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.response);
          });
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
        <Text fontSize={16}>İsminizi giriniz:</Text>
        <TextInput value={name} onChange={setName} color="black" />
        <Text fontSize={16}>Email'inizi giriniz:</Text>
        <TextInput type="email" value={email} onChange={setEmail} color="black" />
        <Text fontSize={16}>Şifrenizi giriniz:</Text>
        <TextInput type="password" value={password} onChange={setPassword} color="black" />
        <Text fontSize={16}>Şifrenizi tekrar giriniz:</Text>
        <TextInput
          type="password"
          value={passwordAgain}
          onChange={setPasswordAgain}
          color="black"
        />
        <TextInput type="submit" display="none" />
      </FlexBox>
    </ModalFormLayout>
  );
}
