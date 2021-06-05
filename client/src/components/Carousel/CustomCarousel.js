import React from "react";
import CustomCarouselItem from "./CustomCarouselItem";

const CustomCarousel = (props) => {
  const carouselItem = props.data.map((el, index) => (
    <CustomCarouselItem
      colWidth={props.colWidth}
      key={index + 1}
      image={el.posterFilePath}
      title={el.name}
      playVideo={() => props.playVideoHandler(el.videoFilePath)}
    />
  ));
  const activeClass = props.activeClass ? "active" : "";
  console.log(carouselItem);
  return <div className={`carousel-item ${activeClass}`}>{carouselItem}</div>;
};

export default CustomCarousel;
