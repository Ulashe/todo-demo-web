import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { FlexBox, Text } from "../styled-components";
import { TextInput } from "../textInput";

export function NewTodoList({ openModal, closeModal, addTodoListHandler }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addTodoList = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (title.length > 0) {
      setLoading(true);
      addTodoListHandler({ title }, () => {
        setLoading(false);
        closeModal();
      });
    } else {
      setErrorMessage("Title boş olamaz!");
    }
  };
  return (
    <ModalFormLayout
      heading="Yeni bir todo list oluşturun"
      footer={[
        <TextButton key={1} variant="text" onClick={addTodoList} loading={loading}>
          Oluştur
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "400px"]}
    >
      <FlexBox as="form" onSubmit={addTodoList} flexDirection="column" p={10} gridRowGap={10}>
        <Text fontSize={16} color={errorMessage ? "red" : undefined}>
          Todo List için başlık girin:
        </Text>
        <TextInput
          autoFocus
          color="black"
          fontSize={16}
          value={title}
          onChange={setTitle}
          borderColor={errorMessage ? "red" : undefined}
        />
        {errorMessage ? (
          <Text fontSize={12} color="red" mt={-5}>
            {errorMessage}
          </Text>
        ) : null}
      </FlexBox>
    </ModalFormLayout>
  );
}
