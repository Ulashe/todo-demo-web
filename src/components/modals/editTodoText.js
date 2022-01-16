import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { FlexBox, Text } from "../styled-components";
import { TextInput } from "../textInput";

export function EditTodoText({ openModal, closeModal, todoListID, todo, updateTodoHandler }) {
  const [text, setText] = useState(todo.text);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const editTodo = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (text.length > 0) {
      setLoading(true);
      updateTodoHandler({ _id: todoListID, todo: { ...todo, text } }, () => {
        setLoading(false);
        closeModal();
      });
    } else {
      setErrorMessage("Todo text boş olamaz!");
    }
  };
  return (
    <ModalFormLayout
      heading="Todo text düzenle"
      footer={[
        <TextButton key={1} variant="text" onClick={editTodo} loading={loading}>
          Kaydet
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "400px"]}
    >
      <FlexBox as="form" onSubmit={editTodo} flexDirection="column" p={10} gridRowGap={10}>
        <Text fontSize={16} color={errorMessage ? "red" : undefined}>
          Todo text'ini düzenleyin:
        </Text>
        <TextInput
          autoFocus
          color="black"
          fontSize={16}
          value={text}
          onChange={setText}
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
