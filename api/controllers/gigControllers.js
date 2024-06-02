import { GigModel } from "../models/gigModel.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));

  const newGig = new GigModel({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await GigModel.findById(req.params.id);
    if (gig.userId !== req.userId) {
      return next(createError(404, "you can delete only your gigs"));
    }

    await GigModel.findByIdAndDelete(req.params.id);
    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await GigModel.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));
    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};
export const getGigs = async (req, res, next) => {
   const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && {
      title: { $regex: q.search, $options: "i" },
      desc: { $regex: q.search, $options: "i" },
    }),
  };
  try {
   
   
    const gigs = await GigModel.find(filters).sort({ [q.sort]: -1 });
    if (!gigs) return next(createError(400, "no gigs"));
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};

