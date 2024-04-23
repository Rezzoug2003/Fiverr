import React from "react";
import "./gigs.scss";
import { useState } from "react";
import { gigs } from "../../data";
import { GigCard } from "../../components/gigCard/GigCard";

export const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("Best Selling");
    const reSort = (type) => {
      setSort(type);
      setOpen(false);
    };
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
            <input type="number" placeholder="min" />
            <input type="number" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">{sort}</span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />

            {open && (
              <div className="rightMenu">
                {sort !== "Newest" && (
                  <span onClick={() => reSort("Newest")}>Newest</span>
                )}
                {sort !== "Best Selling" && (
                  <span onClick={() => reSort("Best Selling")}>
                    Best Selling
                  </span>
                )}
                {sort !== "Popular" && (
                  <span onClick={() => reSort("Popular9")}>Popular</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs.map((item) => {
            return <GigCard item={item}/>
          })}
        </div>
      </div>
    </div>
  );
};
