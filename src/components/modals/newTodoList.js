import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, Text } from "../styled-components";
import { TextInput } from "../textInput";

export function NewTodoList({ openModal, closeModal, addTodoListHandler }) {
  const [title, setTitle] = useState("");
  const addTodoList = (e) => {
    e.preventDefault();
    if (title.length > 0) {
      addTodoListHandler({ title });
      closeModal();
    }
  };
  return (
    <ModalFormLayout
      heading="Yeni bir todo list oluşturun"
      footer={[
        <TextButton key={1} variant="text" py={10} onClick={addTodoList}>
          Oluştur
        </TextButton>,
        <TextButton key={2} variant="text" py={10} onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "400px"]}
    >
      <Box as="form" onSubmit={addTodoList} p={10}>
        <Text mb={10} mt={5} fontSize={20}>
          Todo List için başlık girin:
        </Text>
        <TextInput autoFocus color="black" fontSize={16} value={title} onChange={setTitle} />
      </Box>
    </ModalFormLayout>
  );
}
