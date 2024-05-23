import { createPortal } from "react-dom";
import { Backdrop, ModalWindow, MessageOK, MessageError, BtnOK } from "./Modals.styled";

const modalRoot = document.querySelector("#modal-root");

export const ModalMessage = ({ isOk, onClose }) => {
  // useEffect(() => {
  //   const close = e => {
  //     if (e.keyCode === 27) {
  //       onClose({});
  //     }
  //   };
  //   window.addEventListener("keydown", close);
  //   return () => window.removeEventListener("keydown", close);
  // }, [onClose]);

  // const handleBackdropClick = event => {
  //   if (event.currentTarget === event.target) {
  //     onClose({});
  //   }
  // };

  return createPortal(
    <>
      <Backdrop>
        <ModalWindow>
          {isOk ?
            <MessageOK>Registration successful</MessageOK> :
            <MessageError>Registration error. Please try again later</MessageError>
          }
          <BtnOK type="button" onClick={onClose}>OK</BtnOK>
        </ModalWindow>
      </Backdrop>
    </>,
    modalRoot
  );
};
