import React, { useRef } from "react";
import "./gigs.scss";
import { useState } from "react";
import { gigs } from "../../data";
import { GigCard } from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("Best Selling");
  const minRef = useRef();
  const maxRef = useRef();
  const {search} = useLocation()
 
    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ["gigs"],
      queryFn: async () =>
        await newRequest
          .get(
            `/gigs${search}?&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
          )
          .then((res) => {
            return res.data;
          }),
    });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
   const apply = () => {
     refetch();
    
  };
  useEffect(() => {
    refetch();
    console.log(sort);
  }, [sort]);
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr > Graphics > & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">{sort}</span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />

            {open && (
              <div className="rightMenu">
                {sort !== "createdAt" && (
                  <span onClick={() => { setSort("createdAt"); setOpen(false)}}>createdAt</span>
                )}
                {sort !== "Best Selling" && (
                  <span onClick={() => setSort("Best Selling")}>
                    Best Selling
                  </span>
                )}
                {sort !== "price" && (
                  <span onClick={() => setSort("price")}>price</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading.."
            : error
            ? "something is loading"
            : data.map((item) => {
                return <GigCard item={item} key={item._id} />;
              })}
        </div>
      </div>
    </div>
  );
};
