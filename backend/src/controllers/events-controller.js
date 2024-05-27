import dbService from "../services/dbService.js";
import { HttpError } from "../helpers/index.js";

const createEvent = async (req, res) => {
  try {
    const event = await dbService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await dbService.getEventById(parseInt(req.params.id, 10));
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await dbService.getEvents(req.query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerParticipant = async (req, res) => {
  try {
    const participantData = { ...req.body };
    const eventId = parseInt(req.params.id, 10);
    const participant = await dbService.registerParticipant(participantData, eventId);
    res.status(201).json(participant);
  } catch (error) {
    // console.log("ctrl err= ", error);
    if (error.status === 409) {
      console.log("ctrl 409");
      res.status(409).json({ error: error.message });
      // throw HttpError(409, "Participant already registered on this event");
    } else{
      res.status(500).json({ error: error.message });
    }
  }
};

const getParticipantsByEvent = async (req, res) => {
  try {
    const participants = await dbService.getParticipantsByEvent(parseInt(req.params.id, 10));
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEventById = async (req, res) => {
  try {
    await dbService.deleteEventById(parseInt(req.params.id, 10));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const deleteParticipantById = async (req, res) => {
//   try {
//     await dbService.deleteParticipantById(parseInt(req.params.id, 10));
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export default {
  createEvent,
  getEventById,
  getEvents,
  registerParticipant,
  getParticipantsByEvent,
  deleteEventById,
  // deleteParticipantById,
};
