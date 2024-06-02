import express from "express";
import { vrifyToken } from './../middleware/jwt.js';
import { createMessage, getMessages } from "../controllers/messageControllers.js";

export const messageRoute = express.Router();

messageRoute.post("/", vrifyToken, createMessage);
messageRoute.get("/:id", vrifyToken, getMessages);


