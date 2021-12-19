import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, Text } from "../styled-components";
import { TextInput } from "../textInput";
import { useDispatch } from "react-redux";
import { addTodoList } from "../../redux/reducers/localTodoLists";

export function NewTodoList({ openModal, closeModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const addNewTodoList = () => {
    dispatch(addTodoList({ title }));
    closeModal();
  };

  return (
    <ModalFormLayout
      heading="Yeni bir todo list oluşturun"
      footer={[
        <TextButton key={1} variant="text" py={10} onClick={addNewTodoList}>
          Oluştur
        </TextButton>,
        <TextButton key={2} variant="text" py={10} onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "400px"]}
    >
      <Box p={10}>
        <form onSubmit={addNewTodoList}>
          <Text mb={10} mt={5} fontSize={20}>
            Todo List için başlık girin:
          </Text>
          <TextInput color="black" fontSize={16} value={title} onChange={setTitle} />
        </form>
      </Box>
    </ModalFormLayout>
  );
}
