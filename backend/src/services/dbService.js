import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// eventData: Event
const createEvent = async eventData => {
  return await prisma.event.create({
    data: eventData,
  });
};

// eventId: number
const getEventById = async eventId => {
  return await prisma.event.findUnique({
    where: { id: eventId },
    include: { participants: true },
  });
};

// skip, take: number (page and limit)
const getEvents = async query => {
  const { page, limit, sortBy = "id", sortOrder = "asc", title, date, organizer } = query;
  console.log('page - ', typeof page, ' limit - ',typeof limit, 'sort = ', sortBy, sortOrder, 'filters - ', title,date,organizer)
  const filters = {};
  if (title) filters.title = { contains: title, mode: "insensitive" };
  if (date) filters.eventDate = { equals: new Date(date) };
  if (organizer) filters.organizer = { contains: organizer, mode: "insensitive" };
  const skip = parseInt(page, 10) || 1;
  const take = parseInt(limit, 10) || 10;

  const events = await prisma.event.findMany({
    where: filters,
    skip: (skip - 1) * take,
    take: take,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.event.count({ where: filters });
  const result = { total, events };
  return result;
};

// participantData: Participant
const registerParticipant = async (participantData, eventId) => {
  console.log("iso= ", new Date(participantData.dateOfBirth).toISOString());
  const participant = await prisma.participant.upsert({
    where: { email: participantData.email },
    update: {
      fullName: participantData.fullName,
      email: participantData.email,
      dateOfBirth: new Date(participantData.dateOfBirth).toISOString(),
    },
    create: {
      fullName: participantData.fullName,
      email: participantData.email,
      dateOfBirth: new Date(participantData.dateOfBirth).toISOString(),
    },
  });

  return await prisma.lists.create({
    data: {
      eventId,
      participantId: participant.id,
      heardFrom: participantData.heardFrom,
    },
  });
};

// eventId: number
const getParticipantsByEvent = async eventId => {
  return await prisma.lists.findMany({
    where: { eventId: eventId },
    include: { Participant: true },
  });
};

// eventId: number
const deleteEventById = async eventId => {
  return await prisma.event.delete({
    where: { id: eventId },
  });
};

// // participantId: number
// const deleteParticipantById = async participantId => {
//   return await prisma.participant.delete({
//     where: { id: participantId },
//   });
// };

export default {
  createEvent,
  getEventById,
  getEvents,
  registerParticipant,
  getParticipantsByEvent,
  deleteEventById,
  // deleteParticipantById,
};
