import React, { useState } from "react";
import CustomCarousel from "./CustomCarousel";
import "./CarouselComponent.css";
import { DATA } from "./video_data";
import ReactPlayer from "react-player";

const CustomMultiCarousel = (props) => {
  const VIDEOS_DATA = props.videosData;
  const ITEMS_FOR_CAROUSEL = 3;
  const colWidth = Math.floor(12 / ITEMS_FOR_CAROUSEL);

  const [showPlayer, setShowPlayer] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(false);

  const playVideo = (src) => {
    console.log(src);
    setMediaUrl(src);
    setShowPlayer(true);
  };
  //   Make Each carousel item i.e 4 cards on each carousel
  const singleCarouselItem = (key, dataArray, isActive) => {
    return (
      <CustomCarousel
        colWidth={colWidth}
        key={key}
        activeClass={isActive}
        data={dataArray}
        playVideoHandler={playVideo}
      />
    );
  };

  //   Get Videos sub array for each carousel
  const getVideoDataforEachCarousel = (start, end) => {
    return VIDEOS_DATA.slice(start, end);
  };

  //   All the carousels to display
  const getEntireCarousel = () => {
    // calculate number of carousels to display based on videos data array length
    const CAROUSELS_COUNT = Math.ceil(VIDEOS_DATA.length / ITEMS_FOR_CAROUSEL);
    let individualCarousels = [];
    let initialIndex = 0;
    for (let i = 0; i < CAROUSELS_COUNT; i++) {
      const videoSubArray = getVideoDataforEachCarousel(
        initialIndex,
        initialIndex + ITEMS_FOR_CAROUSEL
      );
      const isActive = i === 0;
      individualCarousels.push(singleCarouselItem(i, videoSubArray, isActive));
      initialIndex = initialIndex + ITEMS_FOR_CAROUSEL;
    }
    console.log("complete Items", individualCarousels);
    return individualCarousels;
  };

  return showPlayer ? (
    <div className="player">
      <i
        className="fa fa-times"
        aria-hidden="true"
        onClick={() => setShowPlayer(false)}
      ></i>

      <ReactPlayer
        url={mediaUrl}
        controls
        playing={true}
        width="600px"
        className="react-player"
      />
    </div>
  ) : (
    <div
      id="multi-item-example"
      className="carousel slide carousel-multi-item"
      data-ride="carousel"
    >
      <div className="controls-top">
        <a
          className="btn-floating"
          href="#multi-item-example"
          data-slide="prev"
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
        <a
          className="btn-floating"
          href="#multi-item-example"
          data-slide="next"
        >
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
      </div>

      <div className="carousel-inner" role="listbox">
        {getEntireCarousel()}
      </div>
    </div>
  );
};

export default CustomMultiCarousel;
