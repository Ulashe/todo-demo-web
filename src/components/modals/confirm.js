import React from "react";
import { ModalFormLayout } from "./modalFormLayout";
import { TextButton } from "../textButton";
import { Box, Text } from "../styled-components";

export function Confirm({ openModal, closeModal, onConfirm, contentText, buttonText }) {
  const [loading, setLoading] = React.useState(false);
  const onClick = () => {
    setLoading(true);
    onConfirm((err) => {
      setLoading(false);
      closeModal();
    });
  };
  return (
    <ModalFormLayout
      heading="Dikkat!"
      footer={[
        <TextButton key={1} variant="text" onClick={onClick} loading={loading}>
          {buttonText ? buttonText : "Tamam"}
        </TextButton>,
        <TextButton key={2} variant="text" onClick={closeModal}>
          İptal
        </TextButton>,
      ]}
      width={["80%", "300px"]}
    >
      <Box p={20}>
        <Text fontSize={20}>{contentText}</Text>
      </Box>
    </ModalFormLayout>
  );
}
