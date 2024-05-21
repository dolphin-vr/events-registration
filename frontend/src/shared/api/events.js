import axios from "axios";

export const requester = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getEvents = async (page, limit, sig) => {
  requester.signal = sig;
  const { data } = await requester.get(`/events?page=${page}&limit=${limit}`);
  return data;
};

export const registerParticipant = async (participantData, eventId) => {
    console.log("param= ", participantData, eventId);
  const { data } = await requester.post(`/events/register/${eventId}`, participantData);
    console.log("data= ", data);
  return data;
};

// export default {
//   createEvent,
//   getEventById,
//   getEvents,
//   registerParticipant,
//   getParticipantsByEvent,
//   deleteEventById,
//   // deleteParticipantById,
// };
