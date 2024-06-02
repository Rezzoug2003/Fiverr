import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routers/userRoute.js";
import { authRouter } from "./routers/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { gigRouter } from "./routers/gigRouter.js";
import { reviewRoute } from "./routers/reviewRouter.js";
import { orderRoute } from "./routers/orderRouter.js";
import { conversationRoute } from './routers/conversationRouter.js';
import { messageRoute } from "./routers/messageRouter.js";
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(cookieParser());

dotenv.config();
mongoose.set("strictQuery", true);
const conect = async () => {
  try {
    await mongoose.connect(process.env.MONGOO_DB);
    console.log("connect success ");
  } catch (error) {
    console.log(error);
  }
};
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});
app.listen(8800, () => {
  conect();
  console.log("Backend server is running..");
});
