import express from "express";
import { vrifyToken } from "../middleware/jwt.js";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gigControllers.js";
export const gigRouter = express.Router();
gigRouter.post("/",vrifyToken, createGig);
gigRouter.delete("/:id", vrifyToken, deleteGig);
gigRouter.get("/single/:id", getGig);
gigRouter.get("/", getGigs);
