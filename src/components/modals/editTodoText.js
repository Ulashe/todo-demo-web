import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, Text } from "../styled-components";
import { TextInput } from "../textInput";

export function EditTodoText({ openModal, closeModal, todoListID, todo, updateTodoHandler }) {
  const [text, setText] = useState(todo.text);
  const [loading, setLoading] = useState(false);
  const editTodo = (e) => {
    e.preventDefault();
    setLoading(true);
    updateTodoHandler({ _id: todoListID, todo: { ...todo, text } }, (err) => {
      setLoading(false);
      if (err) {
        console.log(err);
      } else {
        closeModal();
      }
    });
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
      <Box as="form" onSubmit={editTodo} p={10}>
        <Text mb={10} mt={5} fontSize={20}>
          Todo text'ini düzenleyin:
        </Text>
        <TextInput autoFocus color="black" fontSize={16} value={text} onChange={setText} />
      </Box>
    </ModalFormLayout>
  );
}
