import React, { useState } from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { FlexBox, Text } from "../styled-components";
import { TextInput } from "../textInput";

export function EditTodoListTitle({ openModal, closeModal, todoList, updateTodoListHandler }) {
  const [title, setTitle] = useState(todoList.title);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const editTodoList = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (title.length > 0) {
      setLoading(true);
      updateTodoListHandler({ _id: todoList._id, update: { title } }, () => {
        setLoading(false);
        closeModal();
      });
    } else {
      setErrorMessage("Title boş olamaz!");
    }
  };
  return (
    <ModalFormLayout
      heading="TodoList başlığını düzenle"
      footer={[
        <TextButton key={1} variant="text" onClick={editTodoList} loading={loading}>
          Kaydet
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "400px"]}
    >
      <FlexBox as="form" onSubmit={editTodoList} flexDirection="column" p={10} gridRowGap={10}>
        <Text fontSize={16} color={errorMessage ? "red" : undefined}>
          TodoList başlığını düzenleyin:
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
