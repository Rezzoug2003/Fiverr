import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const deleteUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (req.userId !== user._id.toString())
    return res.status(403).send("you can delete only your account");
  await UserModel.findByIdAndDelete(req.params.id);
  res.status(200).send("delete your account successfully");
};
export const getUser = async (req, res, next) => { 
    const user = await UserModel.findById(req.params.id);
  res.status(200).send(user);

}
