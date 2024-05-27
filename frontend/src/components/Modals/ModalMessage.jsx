import { createPortal } from "react-dom";
import { Backdrop, ModalWindow, MessageOK, MessageError, BtnOK } from "./Modals.styled";
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal-root");

export const ModalMessage = ({ status, onClose }) => {
  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        onClose({});
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  // const handleBackdropClick = event => {
  //   if (event.currentTarget === event.target) {
  //     onClose({});
  //   }
  // };

  return createPortal(
    <>
      <Backdrop>
        <ModalWindow>
          {status === 201 && <MessageOK>Registration successful</MessageOK>}
          {status === 409 && <MessageError>This participant already registered</MessageError>}
          {status !== 201 && status !== 409 && <MessageError>Registration error. Please try again later</MessageError>}
          <BtnOK type="button" onClick={onClose}>
            OK
          </BtnOK>
        </ModalWindow>
      </Backdrop>
    </>,
    modalRoot
  );
};
