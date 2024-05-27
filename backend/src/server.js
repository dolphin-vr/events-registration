import { PrismaClient } from "@prisma/client";
import app from "./app.js";
import {logger} from "./helpers/index.js";

const { PORT = 4000 } = process.env;
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running and listening port: ${PORT}`);
    });
  })
  .catch(error => {
    logger.error(`Server start failed with error: ${error}`);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
