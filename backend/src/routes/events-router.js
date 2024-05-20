import express from "express";
import eventsController from "../controllers/events-controller.js";
const router = express.Router();

router.post("/", eventsController.createEvent);
router.get("/:id", eventsController.getEventById);
router.get("/", eventsController.getEvents);
router.post("/:id/register", eventsController.registerParticipant);
router.get("/:id/participants", eventsController.getParticipantsByEvent);
router.delete("/:id", eventsController.deleteEventById);
// router.delete("/participants/:id", eventsController.deleteParticipantById);

export default router;
