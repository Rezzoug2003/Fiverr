import React from 'react'
import './catCarde.scss'
import { Link }from "react-router-dom"
export const CatCarde = ({card}) => {
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}
