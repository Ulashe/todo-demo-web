import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, Text } from "../styled-components";
import { TextInput } from "../textInput";

export function EditTodoText({ openModal, closeModal, todoListID, todo, updateTodoHandler }) {
  const [text, setText] = useState(todo.text);
  const editTodo = (e) => {
    e.preventDefault();
    updateTodoHandler({ _id: todoListID, todo: { ...todo, text } });
    closeModal();
  };
  return (
    <ModalFormLayout
      heading="Todo text düzenle"
      footer={[
        <TextButton key={1} variant="text" py={10} onClick={editTodo}>
          Kaydet
        </TextButton>,
        <TextButton key={2} variant="text" py={10} onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "400px"]}
    >
      <Box p={10}>
        <form onSubmit={editTodo}>
          <Text mb={10} mt={5} fontSize={20}>
            Todo text'ini düzenleyin:
          </Text>
          <TextInput autoFocus color="black" fontSize={16} value={text} onChange={setText} />
        </form>
      </Box>
    </ModalFormLayout>
  );
}
