import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, Text } from "../styled-components";
import { TextInput } from "../textInput";

export function EditTodoListTitle({ openModal, closeModal, todoList, updateTodoListHandler }) {
  const [title, setTitle] = useState(todoList.title);
  const editTodoList = (e) => {
    e.preventDefault();
    updateTodoListHandler({ _id: todoList._id, update: { title } });
    closeModal();
  };
  return (
    <ModalFormLayout
      heading="TodoList başlığını düzenle"
      footer={[
        <TextButton key={1} variant="text" py={10} onClick={editTodoList}>
          Kaydet
        </TextButton>,
        <TextButton key={2} variant="text" py={10} onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "400px"]}
    >
      <Box as="form" onSubmit={editTodoList} p={10}>
        <Text mb={10} mt={5} fontSize={20}>
          TodoList başlığını düzenleyin:
        </Text>
        <TextInput autoFocus color="black" fontSize={16} value={title} onChange={setTitle} />
      </Box>
    </ModalFormLayout>
  );
}
