import axios from "axios";

export const requester = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getEvents = async (page, limit, sortOrder, filters, sig) => {
  requester.signal = sig;
  const sortParams = sortOrder.length ? "&sort=" + sortOrder.map(sort => `${sort.field}:${sort.order}`).join(",") : "";
  const filterParam = `${filters.title ? "&title=" + filters.title : ""}${filters.eventDate ? "&date=" + filters.eventDate : ""}${filters.organizer ? "&organizer=" + filters.organizer : ""}`;
  const { data } = await requester.get(`/events?page=${page}&limit=${limit}${sortParams}${filterParam}`);
  return data;
};

export const registerParticipant = async (participantData, eventId) => {
  const { data } = await requester.post(`/events/register/${eventId}`, participantData);
  return data;
};

export const getParticipantsByEvent = async (eventId, sig) => {
  requester.signal = sig;
  const { data } = await requester.get(`/events/participants/${eventId}`);
  console.log("data= ", data);
  return data;
};

