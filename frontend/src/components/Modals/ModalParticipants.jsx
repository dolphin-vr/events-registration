import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader } from "../Loader/Loader";
import { getParticipantsByEvent } from "../../shared/api/events";
import { Backdrop, BtnClose, Email, EventTitle, FullName, ModalWindow, ParticipantItem, ParticipantList, SearchInput, Title } from "./Modals.styled";

const modalRoot = document.querySelector("#modal-root");

export const ModalParticipants = ({ event, onClose }) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        onClose({});
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose({});
    }
  };

  const controllerRef = useRef();
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    async function getParticipantsData() {
      try {
        setLoader(true);
        setError(false);
        const responce = await getParticipantsByEvent(event.id, controllerRef.current.signal);
        setParticipants(responce);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoader(false);
      }
    }
    getParticipantsData();

    return () => {
      controllerRef.current.abort();
    };
  }, [event.id]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.height = `${modalRef.current.offsetHeight}px`;
    }
  }, [participants]);

  const filteredParticipants = participants.filter(
    participant => participant.Participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || participant.Participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return createPortal(
    <>
      {loader ? (
        <Loader />
      ) : (
        <Backdrop onClick={handleBackdropClick}>
          <ModalWindow ref={modalRef}>
            <Title>Participants of</Title>
            <EventTitle>{event.title}</EventTitle>
            <BtnClose onClick={() => onClose({})}>&times;</BtnClose>
            <SearchInput type="text" placeholder="Search by name or email" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <ParticipantList>
              {filteredParticipants.map(participant => (
                <ParticipantItem key={participant.id}>
                  <FullName>{participant.Participant.fullName}</FullName>
                  <Email>{participant.Participant.email}</Email>
                </ParticipantItem>
              ))}
            </ParticipantList>
          </ModalWindow>
        </Backdrop>
      )}
      {error && <span>Error. Try again {error}</span>}
    </>,
    modalRoot
  );
};
