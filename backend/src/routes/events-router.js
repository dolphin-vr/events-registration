import express from "express";
import eventsController from "../controllers/events-controller.js";
import { isEmptyBody, bodyValidator } from "../middlewares/index.js";
import { RarticipantRegisterSchema } from "../models/Rarticipant.js";
const router = express.Router();

router.post("/", eventsController.createEvent);
router.get("/:id", eventsController.getEventById);
router.get("/", eventsController.getEvents);
router.post("/register/:id", isEmptyBody, bodyValidator(RarticipantRegisterSchema), eventsController.registerParticipant);
router.get("/participants/:id", eventsController.getParticipantsByEvent);
router.delete("/:id", eventsController.deleteEventById);
// router.delete("/participants/:id", eventsController.deleteParticipantById);

export default router;
