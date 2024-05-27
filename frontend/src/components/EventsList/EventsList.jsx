import { BottomSpinner, EventCard } from "../index";
import { EventsGrid } from "./EventsList.styled";

export const EventsList = ({ events, scrollOption, handleRegister, handleView }) => {
	const { loading, hasNextPage, sentryRef } = scrollOption;
  return (
    <EventsGrid>
      {events.map(event => (
        <EventCard key={event.id} event={event} handleRegister={handleRegister} handleView={handleView} />
      ))}
      {(loading || hasNextPage) && (
        <li ref={sentryRef}>
          <BottomSpinner />
        </li>
      )}
    </EventsGrid>
  );
};
