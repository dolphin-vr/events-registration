import { PrismaClient } from "@prisma/client";
import { generateEvent, generateParticipant } from "./generateData.js";
import dbService from "../services/dbService.js";

const NUM_EVENTS = 50;
const MAX_PARTICIPANTS = 20;
const prisma = new PrismaClient();

const seedDatabase = async (numEvents, maxParticipants) => {
  for (let i = 0; i < numEvents; i++) {
    const randomEvent = generateEvent();
    const event = await dbService.createEvent(randomEvent);
    const numParticipants = Math.floor(Math.random() * maxParticipants) + 1;
    for (let j = 0; j < numParticipants; j++) {
      const randomParticipant = generateParticipant();
      const participant = await dbService.registerParticipant(randomParticipant, event.id);
    }
  }
  console.log("Database seeding completed.");
};

seedDatabase(NUM_EVENTS, MAX_PARTICIPANTS);
