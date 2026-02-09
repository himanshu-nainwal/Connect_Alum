import express from "express";
import { getEvents, getEventById, createEvent, registerForEvent } from "../controllers/eventController.js";

const router = express.Router();

// GET all events
router.get("/", getEvents);

// POST create event
router.post("/create", createEvent);

// POST register for event
router.post("/register", registerForEvent);

// GET a single event by ID
router.get("/:id", getEventById);

export default router; // ES Module export