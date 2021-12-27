import React from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, Text } from "../styled-components";

export function Confirm({
  openModal,
  closeModal,
  onConfirm,
  confirmContentText,
  confirmButtonText,
}) {
  return (
    <ModalFormLayout
      heading="Dikkat!"
      footer={[
        <TextButton key={1} variant="text" onClick={onConfirm}>
          {confirmButtonText ? confirmButtonText : "Tamam"}
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
    >
      <Box p={10}>
        <Text>{confirmContentText}</Text>
      </Box>
    </ModalFormLayout>
  );
}
