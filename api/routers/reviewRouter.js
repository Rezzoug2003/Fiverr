import express from "express";
import { createReview, deleteReview, getReviews } from "../controllers/reviewControllers.js";
import { vrifyToken } from "../middleware/jwt.js";
export const reviewRoute = express.Router();
reviewRoute.post("/", vrifyToken, createReview);
reviewRoute.get("/:gigId", getReviews);
reviewRoute.delete("/:id", deleteReview);


