import React from "react";
import "./gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { newRequest } from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { Reviews } from "../../components/reviews/Reviews";
export const Gig = () => {
  const { id } = useParams()
  console.log(id)
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
   const userId = data?.userId;
 const {
   isLoading: isLoadingUser,
   error: errorUser,
   data: dataUser,
 } = useQuery({
   queryKey: ["user"],
   queryFn: () =>
     newRequest.get(`/users/${userId}`).then((res) => {
       return res.data;
     }),
   enabled: !!userId,
 });
  return (
    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Liverr > Graphics & Design ></span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading..."
            ) : errorUser ? (
              "error"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => {
                return <img src={img} alt="" key={img} />;
              })}
              {/* <img
                src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <img
                src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <img
                src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              /> */}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
           
           <Reviews gigId={id}/>
          </div>
          <div className="right">
            <div className="price">
              <h3>1 AI generated image</h3>
              <h2>$ 59.99</h2>
            </div>
            <p>
              I will create a unique high quality AI generated image based on a
              description that you give me
            </p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>2 Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>3 Revisions</span>
              </div>
            </div>
            <div className="features">
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>Prompt writing</span>
              </div>
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>Artwork delivery</span>
              </div>
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>Image upscaling</span>
              </div>
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>Additional design</span>
              </div>
                </div>
                <Link to={`/pay/${id}`} className="link">
            <button>Continue</button>
                </Link>
          </div>
        </div>
      )}
    </div>
  );
};
