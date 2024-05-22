import { useEffect, useRef, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Container,  Title } from "./EventsPage.styled";
import { PageSpinner } from "../../components/Spinners/PageSpinner";
import { getEvents } from "../../shared/api/events";
import { ModalRegister } from "../../components/Modals/ModalRegister";
import { ModalParticipants } from "../../components/Modals/ModalParticipants";
import { Filter } from "../../components/Filter/Filter";
import { EventsList } from "../../components/EventsList/EventsList";

export const EventsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEventId] = useState({});
  const [page, setPage] = useState(1);
  // const [total, setTotal] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isParticipantsModalOpen, setParticipantsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ title: "", eventDate: "", organizer: "" });
  const [sortOrder, setSortOrder] = useState({ title: "asc", eventDate: "asc", organizer: "asc" });

  const controllerRef = useRef();
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    async function getEventsData() {
      try {
        setLoading(true);
        setError(false);
        const responce = await getEvents(page, eventsPerPage, controllerRef.current.signal);
        // setTotal(responce.total);
        setEvents(prevEvents => [...prevEvents, ...responce.events]);
        // setEvents(prevEvents => [...new Set([...prevEvents, ...responce.events])]);
        setHasNextPage(responce.total - page * eventsPerPage > 0);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    getEventsData();

    return () => {
      controllerRef.current.abort();
    };
  }, [page]);

  const handleToggleRegisterModal = event => {
    setEventId(event);
    setRegisterModalOpen(!isRegisterModalOpen);
  };
  const handleToggleParticipantsModal = event => {
    setEventId(event);
    setParticipantsModalOpen(!isParticipantsModalOpen);
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => setPage(prevPage => prevPage + 1),
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  
  const handleSort = key => {
    console.log('events= ', events)
    const sortedEvents = [...events].sort((a, b) => {
      if (sortOrder[key] === "asc") {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });
    const order = sortOrder[key] === "asc" ? "desc" : "asc";
    console.log("sort= ", key, " - ", order);
    console.log("sortedEvents= ", sortedEvents);
    setEvents(sortedEvents);
    setSortOrder({ ...sortOrder, [key]: order });
  };

  // console.log("len= ", events.length, " hasNext= ", hasNextPage, " loader= ", loading, " page= ", page, " sig= ", controllerRef.current);

  const filteredEvents = events.filter(event => event.title.toLowerCase().includes(filters.title.toLowerCase()) || event.organizer.toLowerCase().includes(filters.organizer.toLowerCase()));

  const scrollOption={loading,hasNextPage,sentryRef}
  return (
    <>
      <Container>
        {loading && <PageSpinner />}
        <Title>Events</Title>
        <Filter filters={filters} sortOrder={sortOrder} changeFilters={setFilters} changeSort={handleSort} />
        <EventsList events={filteredEvents} scrollOption={scrollOption} handleRegister={handleToggleRegisterModal} handleView={handleToggleParticipantsModal} />
        {error && <span>Error. Try again</span>}
      </Container>
      {isRegisterModalOpen && <ModalRegister event={event} onClose={handleToggleRegisterModal} />}
      {isParticipantsModalOpen && <ModalParticipants event={event} onClose={handleToggleParticipantsModal} />}
    </>
  );
};
