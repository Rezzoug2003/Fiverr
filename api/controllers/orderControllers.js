import { GigModel } from "../models/gigModel.js";
import { OrderModel } from "../models/orderModel.js";
import  Stripe  from 'stripe';
export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);
  const gig = await GigModel.findById(req.params.id);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price*100,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
    const newOrder = new OrderModel({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });
    await newOrder.save();
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
}
export const getOrders = async(req,res,next) => {
    try {
        const orders = await OrderModel.find({
          ...(req.isSeller
            ? { sellerId: req.userId }
            : { buyerId: req.userId }),
          isCompleted: true,
        });
      console.log(req.userId)
        res.status(200).json(orders)

    } catch (err) {
        next(err);
    }
}
export const createOrder = async (req, res, next) => {
  try {
    const gig = await GigModel.findById(req.params.gigId);
    const newOrder = new OrderModel({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "paymentIntent.id",
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (err) {
    next(err);
  }
};
export const confirm = async (req, res, next) => {
  try {
    const orders = await OrderModel.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

