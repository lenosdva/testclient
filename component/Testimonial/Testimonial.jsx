import React from 'react';
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  arrows: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  cssEase: "linear"
};


export default function Testimonial() {
  return(
    <div className="testimonial">
      <div className="row">
        <div className="col-md-3">
          <p>Image</p>
        </div>
        <div classNsme="col-md-9">
          <p>Content</p>
        </div>
      </div>
    </div>
  )
}