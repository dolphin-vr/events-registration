import express from "express";
import cors from "cors";
import path from "path";
import {logger} from './helpers/index.js'

import eventRouter from "./routes/events-router.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`REQUEST: ${req.method} ${req.url}`); // Логування запитів
  next();
});

app.use(express.static(path.resolve("frontend", "dist")));

app.use("/api/events", eventRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("frontend", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  logger.error(`ERROR OCCURS: ${err.message}`); // Логування помилки
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

export default app;
