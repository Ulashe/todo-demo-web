import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, Text } from "../styled-components";
import { TextInput } from "../textInput";

export function NewTodoList({ openModal, closeModal, addTodoList }) {
  const [title, setTitle] = useState("");

  return (
    <ModalFormLayout
      heading="Yeni bir todo list oluşturun"
      footer={[
        <TextButton key={1} variant="text" py={10} onClick={addTodoList({ title })}>
          Oluştur
        </TextButton>,
        <TextButton key={2} variant="text" py={10} onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "400px"]}
    >
      <Box p={10}>
        <form onSubmit={addTodoList({ title })}>
          <Text mb={10} mt={5} fontSize={20}>
            Todo List için başlık girin:
          </Text>
          <TextInput autoFocus color="black" fontSize={16} value={title} onChange={setTitle} />
        </form>
      </Box>
    </ModalFormLayout>
  );
}
