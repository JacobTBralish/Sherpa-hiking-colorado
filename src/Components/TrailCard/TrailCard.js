import React from "react";

import "./TrailCard.scss";

const TrailCard = props => {
  // console.log('props: ', props);
  return (
    <div className="cardContainer">
      <div className="cardImageContainer">
        <img className="cardImage" src={props.imgSmallMed} alt="" />
      </div>
      <div className="cardInfo">
        <p className="cardName">{props.name}</p>
      </div>
    </div>
  );
};

export default TrailCard;
