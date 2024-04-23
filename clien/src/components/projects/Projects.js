import React from 'react'
import'./projects.scss'
export const Projects = ({card}) => {
    return (
      <div className="projectCard">
        <img src={card.img} alt="" />
        <div className="info">
          <img src={card.pp} alt="" />
          <div className="texts">
            <h2>{card.cat}</h2>
            <span>{card.username}</span>
          </div>
        </div>
      </div>
    );
}
