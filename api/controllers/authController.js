import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new UserModel({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    return next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(404).send("password mismatch");
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({ data: info });
  } catch (err) {
    res.status(500).send("err");
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
