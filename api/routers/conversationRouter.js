import express from "express";
import { vrifyToken } from './../middleware/jwt.js';
import { createConversation, getConversations, getSingleConversation, updateConversation } from "../controllers/conversationControllers.js";
export const conversationRoute = express.Router();
conversationRoute.get("/", vrifyToken, getConversations);
conversationRoute.post("/", vrifyToken, createConversation);
conversationRoute.get("/single/:id", vrifyToken, getSingleConversation);
conversationRoute.put("/:id", vrifyToken, updateConversation);

;
