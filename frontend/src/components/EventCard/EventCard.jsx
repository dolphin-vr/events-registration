import { BtnRegister, BtnView, Container, Description, EventDate, Organizer, Title } from "./EventCard.styled";

export const EventCard = ({ event, handleRegister, handleView }) => {
  return (
    <Container>
      <Title>{event.title}</Title>
      <EventDate>start {new Date(event.eventDate).toLocaleDateString()}</EventDate>
      <Description>{event.description}</Description>
      <Organizer>{event.organizer}</Organizer>
      <BtnRegister type="button" onClick={() => handleRegister(event)}>
        Register
      </BtnRegister>
      <BtnView type="button" onClick={() => handleView(event)}>
        View
      </BtnView>
    </Container>
  );
};
