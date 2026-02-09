import express from 'express';
import cors from 'cors'
import userRouter from "./routes/userRoute.js"
// import connectDB from "./config/db.js";
import dotenv from "dotenv";
import jobRouter from "./routes/jobRoute.js";
import mentorRoutes from "./routes/mentorRoute.js";
import eventRoutes from "./routes/eventRoutes.js"
dotenv.config();


//app config
const app = express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())

//db connection
//db connection
// connectDB(); // Removed MongoDB connection


//api endpoint
app.use("/api/user", userRouter)
app.use("/api/jobs", jobRouter);
app.use("/api/mentors", mentorRoutes);
app.use("/api", mentorRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})