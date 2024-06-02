import express from "express";
import {  vrifyToken } from "../middleware/jwt.js";
import { confirm, createOrder, getOrders,intent } from "../controllers/orderControllers.js";
 export const orderRoute = express.Router();

// orderRoute.post("/:gigId", verifyToken, createOrder);
orderRoute.get("/", vrifyToken, getOrders);
// orderRoute.post("/:gigId", vrifyToken, createOrder);
orderRoute.post("/create-payment-intent/:id", vrifyToken, intent);
orderRoute.put("/", vrifyToken, confirm);

