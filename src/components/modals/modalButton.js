import React from "react";
import { Modal } from "./modal";

export function ModalButton({ children, modalContent, onClick }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const openModal = () => {
    if (onClick) {
      onClick();
    }
    setIsVisible(true);
  };
  const closeModal = () => setIsVisible(false);

  return (
    <div>
      {isVisible ? (
        <Modal isVisible onClick={closeModal}>
          {React.cloneElement(modalContent, { openModal, closeModal })}
        </Modal>
      ) : null}
      {React.cloneElement(children, { onClick: openModal })}
    </div>
  );
}
