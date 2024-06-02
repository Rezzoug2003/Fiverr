import React from "react";
import { Link } from "react-router-dom";
import "./gigcard.scss";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
export const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard" key={item.id}>
        <img
          src={
            item.cover ||
            "https://images.pexels.com/photos/7532110/pexels-photo-7532110.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          }
          alt=""
        />
        <div className="info">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "somthing went wrong"
          ) : (
            <div className="user">
              <img src={data.img || "./img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}

          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};
