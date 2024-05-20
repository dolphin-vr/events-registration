import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const killAll = async () => {
  await prisma.event.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.lists.deleteMany();
};

killAll()