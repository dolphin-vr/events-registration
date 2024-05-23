import express from "express";
import cors from "cors";
import path from "path";

import eventRouter from "./routes/events-router.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.resolve("frontend", "dist")));

app.use("/api/events", eventRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("frontend", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
