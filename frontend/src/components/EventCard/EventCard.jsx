import { BtnRegister, BtnView, Container, Description, Title } from "./EventCard.styled";

export const EventCard = ({event}) => {
	return (
    <Container>
      <Title>{event.title}</Title>
      <Description>{event.description}</Description>
      <BtnRegister type="button">Register</BtnRegister>
      <BtnView type="button">View</BtnView>
    </Container>
  );
}
