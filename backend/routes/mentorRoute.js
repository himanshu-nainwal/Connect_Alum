import express from "express";
import { addMentor, getAllMentors } from "../controllers/mentorController.js";

const router = express.Router();

router.post("/add", addMentor);
router.get("/mentors", getAllMentors);

export default router;
