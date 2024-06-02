import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
export const vrifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(403, "you are not authentification"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(400).send("token is invalid");
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
