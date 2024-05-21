import express from "express";
import eventsController from "../controllers/events-controller.js";
const router = express.Router();

router.post("/", eventsController.createEvent);
router.get("/:id", eventsController.getEventById);
router.get("/", eventsController.getEvents);
router.post("/register/:id", eventsController.registerParticipant);
router.get("/participants/:id", eventsController.getParticipantsByEvent);
router.delete("/:id", eventsController.deleteEventById);
// router.delete("/participants/:id", eventsController.deleteParticipantById);

export default router;
