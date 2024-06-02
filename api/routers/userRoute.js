import express from "express";
import { deleteUser, getUser } from "../controllers/userControllers.js";
import { vrifyToken } from "../middleware/jwt.js";
export const userRouter = express.Router();
userRouter.delete("/:id", vrifyToken, deleteUser);
userRouter.get("/:id", getUser);
