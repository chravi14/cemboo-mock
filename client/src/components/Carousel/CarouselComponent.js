import React from "react";
import "./CarouselComponent.css";

const MultiCarouselPage = () => {
  const videos = [
    {
      image: "http://placehold.it/380?text=1",
    },
    {
      image: "http://placehold.it/380?text=2",
    },
    {
      image: "http://placehold.it/380?text=3",
    },
    {
      image: "http://placehold.it/380?text=4",
    },
    {
      image: "http://placehold.it/380?text=5",
    },
    {
      image: "http://placehold.it/380?text=6",
    },
  ];
  const itemsForCarousel = 4;
  const carouselItems = Math.ceil(videos.length / itemsForCarousel);

  const cardCarouselItem = (image) => (
    <div className="col-md-3" style={{ float: "left" }}>
      <div className="card mb-2">
        <img className="card-img-top" src={image} alt="Card cap" />
      </div>
    </div>
  );

  const singleCarouselItem = (videoSubArray) => {
    return videoSubArray.map((el) => {
      return cardCarouselItem(el.image);
    });
  };

  const carouselItem = () => {
    for (let i = 0; i < videos.length; i = i + itemsForCarousel) {
      const subArray = videos.slice(i, i + itemsForCarousel);
      console.log(singleCarouselItem(subArray));
    }
  };

  const allCarouselItems = [...new Array(carouselItems)].map((_, index) => {
    const activeClass = index === 0 ? "active" : "";
    return (
      <div className={`carousel-item ${activeClass}`}>{carouselItem()}</div>
    );
  });
  console.log(allCarouselItems);
  return (
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
        {allCarouselItems}
      </div>
      {/* <div className="carousel-item active">
          <div className="col-md-3" style={{ float: "left" }}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                alt="Card cap"
              />
            </div>
          </div>

          <div className="col-md-3" style={{ float: "left" }}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                alt="Card cap"
              />
            </div>
          </div>

          <div className="col-md-3" style={{ float: "left" }}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                alt="Card cap"
              />
            </div>
          </div>

          <div className="col-md-3" style={{ float: "left" }}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                alt="Card cap"
              />
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="col-md-3" style={{ float: "left" }}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                alt="Card cap"
              />
            </div>
          </div>

          <div className="col-md-3" style={{ float: "left" }}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(47).jpg"
                alt="Card cap"
              />
            </div>
          </div>

          <div className="col-md-3" style={{ float: "left" }}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(48).jpg"
                alt="Card cap"
              />
            </div>
          </div>

          <div className="col-md-3" style={{ float: "left" }}>
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(47).jpg"
                alt="Card cap"
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MultiCarouselPage;
