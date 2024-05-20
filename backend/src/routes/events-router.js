import express from "express";
import eventsController from "../controllers/events-controller.js";
const router = express.Router();
router.get("/test", eventsController.testGet);

export default router;