import { PrismaClient } from "@prisma/client";
import app from "./app.js";

const { PORT = 4000 } = process.env;
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running and listening port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
