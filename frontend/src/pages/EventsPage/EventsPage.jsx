import { useEffect, useRef, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Container, ErrMsg, Title } from "./EventsPage.styled";
import { getEvents } from "../../shared/api/events";
import { EventsList, Filter, ModalMessage, ModalParticipants, ModalRegister, PageSpinner } from "../../components";

const eventsPerPage = 9;

export const EventsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEventId] = useState({});
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isParticipantsModalOpen, setParticipantsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ title: "", eventDate: "", organizer: "" });
  const [sortOrder, setSortOrder] = useState([]);
  const [registerStatus, setRegisterStatus] = useState(null)
  const [showPopup, setShowPopup] = useState(false);

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
        const responce = await getEvents(page, eventsPerPage, sortOrder, filters, controllerRef.current.signal);
        setEvents(prevEvents => [...prevEvents, ...responce.events]);
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
  }, [filters, page, sortOrder]);

  const handleToggleRegisterModal = (event, status) => {
    setEventId(event);
    setRegisterModalOpen(!isRegisterModalOpen);
    if (!Object.keys(event).length && status) {
      setRegisterStatus(status);
      setShowPopup(!showPopup);
    }
  };

  const handleToggleParticipantsModal = event => {
    setEventId(event);
    setParticipantsModalOpen(!isParticipantsModalOpen);
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup)
  }

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => setPage(prevPage => prevPage + 1),
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  const handleFilters = e => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setEvents([]);
    setPage(1);
    setHasNextPage(true);
  };

  const handleSort = field => {
    setSortOrder(prevSortOrder => {
      const idx = prevSortOrder.findIndex(sort => sort.field === field);
      let newSortOrder = [];
      if (!!~idx) {
        const newSort = [...prevSortOrder];
        newSort[idx].order = newSort[idx].order === "asc" ? "desc" : "asc";
        const [primaryKey] = newSort.splice(idx, 1);
        newSortOrder = [primaryKey, ...newSort];
      } else {
        newSortOrder = [{ field, order: "asc" }, ...prevSortOrder];
      }
      return newSortOrder;
    });
    setEvents([]);
    setPage(1);
    setHasNextPage(true);
  };

  const handleResetFilters = () => {
    setFilters({ title: "", date: "", organizer: "" });
    setSortOrder([]);
    setEvents([]);
    setPage(1);
    setHasNextPage(true);
  };

  const scrollOption = { loading, hasNextPage, sentryRef };

  return (
    <>
      <Container>
        {loading && <PageSpinner />}
        <Title>Events</Title>
        <Filter filters={filters} sortOrder={sortOrder} changeFilters={handleFilters} changeSort={handleSort} onReset={handleResetFilters} />
        {!error && <EventsList events={events} scrollOption={scrollOption} handleRegister={handleToggleRegisterModal} handleView={handleToggleParticipantsModal} />}
        {error && <ErrMsg>Something went wrong. Please try again.</ErrMsg>}
      </Container>
      {isRegisterModalOpen && <ModalRegister event={event} onClose={handleToggleRegisterModal} />}
      {isParticipantsModalOpen && <ModalParticipants event={event} onClose={handleToggleParticipantsModal} />}
      {showPopup && <ModalMessage status={registerStatus} onClose={handleTogglePopup} />}
    </>
  );
};
