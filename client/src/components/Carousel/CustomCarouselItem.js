import React from "react";
import PlayIcon from "./../../assets/images/play.png";

const CustomCarouselItem = (props) => {
  return (
    <div className={`col-md-${props.colWidth}`} style={{ float: "left" }}>
      <div className="card mb-2">
        <img className="card-img-top" src={props.image} alt="Card cap" />
        <i className="fa fa-play play-icon" aria-hidden="true" onClick={props.playVideo}></i>
        <div className="card-body text-center pt-1">
          <h4 className="card-title">{props.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default CustomCarouselItem;
