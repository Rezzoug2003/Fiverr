import React from "react";
import "./order.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";

export const Order = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
console.log(data)
 const handleContact = async (order) => {
   const sellerId = order.sellerId;
   const buyerId = order.buyerId;
   const id = sellerId + buyerId;

   try {
     const res = await newRequest.get(`/conversations/single/${id}`);
     navigate(`/message/${res.data.id}`);
   } catch (err) {
     if (err.response.status === 404) {
       const res = await newRequest.post(`/conversations/`, {
         to: currentUser.data.seller ? buyerId : sellerId,
       });
       navigate(`/message/${res.data.id}`);
     }
   }
 };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Error loading"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>

              <th>Contact</th>
            </tr>
            {data.map((order) => (
              <tr>
                <td>
                  <img
                    className="image"
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>

                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
