import { useEffect, useRef, useState } from "react";
import { Container, EventsGrid, PageLink, PaginationContainer, Title } from "./EventsPage.styled";
import { EventCard } from "../../components/EventCard/EventCard";
import { Loader } from "../../components/Loader/Loader";
import { getEvents } from "../../shared/api/events";

export const EventsPage = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const controllerRef = useRef();
  useEffect(() => {
    // Fetch events from the backend
    // if (!city) return;
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    async function getRangeWeather() {
      try {
        setLoader(true);
        setError(false);
        const responce = await getEvents(currentPage, eventsPerPage, controllerRef.current.signal);
        setEvents(responce.events);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoader(false);
      }
    }
    getRangeWeather();

    return () => {
      controllerRef.current.abort();
    };
  }, [currentPage]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container>
      {loader && <Loader />}
      <Title>Events</Title>
      <EventsGrid>
        {currentEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </EventsGrid>
      <PaginationContainer>
        {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
          <PageLink key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </PageLink>
        ))}
      </PaginationContainer>
      {error && <span>Error. Try again {error}</span>}
    </Container>
  );
}
