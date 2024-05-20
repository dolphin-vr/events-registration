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
const getEvents = async pagination => {
  const skip = parseInt(pagination.page, 10) || 1;
  const take = parseInt(pagination.limit, 10) || 10;
  const events = await prisma.event.findMany({
    skip: (skip-1)*take,
    take: take,
  });
  const total = await prisma.event.count();
  const result = { total, events };
  return result;
};

// participantData: Participant
const registerParticipant = async (participantData, eventId) => {
  const participant = await prisma.participant.upsert({
    where: { email: participantData.email },
    update: {
      fullName: participantData.fullName,
      email: participantData.email,
      dateOfBirth: participantData.dateOfBirth,
    },
    create: {
      fullName: participantData.fullName,
      email: participantData.email,
      dateOfBirth: participantData.dateOfBirth,
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
