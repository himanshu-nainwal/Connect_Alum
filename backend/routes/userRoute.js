import express from "express"
import { loginUser, registerUser, updateProfile, getAlumni } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.put("/profile", updateProfile)
userRouter.get("/alumni", getAlumni)

export default userRouter;