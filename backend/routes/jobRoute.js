import express from "express";
import { createJob, getJobs, getMyJobs } from "../controllers/jobController.js";

const router = express.Router();

// Local Alumni Jobs
router.post("/create", createJob);
router.get("/", getJobs);
router.get("/myjobs/:userId", getMyJobs);

// External Jobs (Keep as separate endpoint if needed, or remove if replacing completely. 
// For now, let's keep the user's original external job search on a specific path to avoid breaking it if they still want it)
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const SERP_API_URL = "https://serpapi.com/search";
const SERP_API_KEY = process.env.SERP_API_KEY;

router.get("/external", async (req, res) => {
    const { query, location } = req.query;
    if (!query || !location) return res.status(400).json({ error: "Query and location are required." });

    try {
        const response = await axios.get(SERP_API_URL, {
            params: { engine: "google_jobs", q: query, location: location, api_key: SERP_API_KEY },
        });
        const jobs = response.data.jobs_results || [];
        const formattedJobs = jobs.map(job => ({
            title: job.title, company: job.company_name, location: job.location,
            posted: job.detected_extensions?.posted_at || "N/A", link: job.job_id, type: "External"
        }));
        res.json(formattedJobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch job listings." });
    }
});

export default router;
