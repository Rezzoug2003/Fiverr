import React, { useEffect, useState } from "react";
// import "./pay.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { newRequest } from "../../utils/newRequest";
import { CheckoutForm } from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51PLLVqKioRPERDUpTGHQOUTvB814Bi0aTgRC3Vv6S9726CDfnrgQAgwAkzYUYQlE3ThKhJZsAfQzowGKSElQanG500zkypA2HI"
);

export const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error(err);
      }
    };
    makeRequest();
  }, [id]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
