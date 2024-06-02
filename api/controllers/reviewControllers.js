import { ReviewModle } from "../models/reviewModel.js";
import createError from "../utils/createError.js";
import { GigModel } from './../models/gigModel.js';

export const createReview = async (req, res, next) => {
      if (req.isSeller)
        return next(createError(403, "Sellers can't create a review!"));

      const newReview = new ReviewModle({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
      });
    try {
       const review= await ReviewModle.findOne({
            userId: req.userId,
            gigId: req.body.gigId,
       })
        if (review) {
            return next(createError(404,"you have already created a review"))
        }
        const savedReview = await newReview.save();
        await GigModel.findByIdAndUpdate(req.body.gigId, {
          $inc: { totalStars: req.body.star, starNumber: 1 },
        });
         res.status(201).send(savedReview);
    } catch (err) {
        next(err);
    }
 }
export const getReviews = async (req, res, next) => {
    try {
          const reviews = await ReviewModle.find({ gigId: req.params.gigId });
          res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};