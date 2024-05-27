import { PrismaClient } from "@prisma/client";
import { HttpError } from "../helpers/index.js";

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
  const { page, limit, sort, title, date, organizer } = query;
  const skip = parseInt(page, 10) || 1;
  const take = parseInt(limit, 10) || 10;
  const orderBy = sort
    ? sort.split(",").map(param => {
        const [field, order] = param.split(":");
        return { [field]: order };
      })
    : [];
  const filters = {};
  if (title) filters.title = { contains: title, mode: "insensitive" };
  if (date) {
    const isoDate = new Date(date).toISOString().split("T")[0];
    filters.eventDate = {
      gte: new Date(isoDate),
      lt: new Date(new Date(isoDate).setDate(new Date(isoDate).getDate() + 1)),
    };
  }
  if (organizer) filters.organizer = { contains: organizer, mode: "insensitive" };

  const events = await prisma.event.findMany({
    where: filters,
    skip: (skip - 1) * take,
    take: take,
    orderBy,
  });
  const total = await prisma.event.count({ where: filters });
  const result = { total, events };
  return result;
};

// participantData: Participant
const registerParticipant = async (participantData, eventId) => {
  try {
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
  } catch (error) {
    // console.log("api err= ", error);
    if (error.code === "P2002") {
      // console.log("api p2002");
      // throw new Error({ status: 409, message: "Participant is already registered for this event" });
      throw HttpError(409, "Participant already registered on this event");
    }
    throw error;
  }
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
