import React from 'react';
import Slider from "react-slick";
import Image from 'next/image';

const settings = {
  dots: false,
  infinite: true,
  arrows: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  cssEase: "linear"
};

export default function HowItWorks() {
  return (
    <div className="how-it-works text-center">
      <h3>How It Works</h3>
      <div className="how-it-work-slider">
        <Slider {...settings}>
        <div className="how-it-work-slide">
          <Image
            src="/assets/images/howitwork1.jpg"
            alt="howitwork1"
            layout="responsive"
            width={315}
            height={338}
          />
          <span className="image-circle">1</span>
          <h3 className="mt-3">Choose A Service</h3>
          <hr/>
          <p>Choose from a wide range of handyman services offered in your locality. From cleaning services to electronic installations and repair work. We have it all!</p>
        </div>
        <div className="how-it-work-slide">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="howitwork1"
            layout="responsive"
            width={315}
            height={338}
          />
          <span className="image-circle">2</span>
          <h3 className="mt-3">Pick A Handyman</h3>
          <hr/>
          <p>Dein Hausman handymen aren't just skilled but also trustworthy and efficient. Pick from the best in your locality & get your work done it no time!</p>
        </div>
        <div className="how-it-work-slide">
          <Image
            src="/assets/images/howitwork3.jpg"
            alt="howitwork1"
            layout="responsive"
            width={315}
            height={338}
          />
          <span className="image-circle">3</span>
          <h3 className="mt-3">Share Your Needs</h3>
          <hr/>
          <p>With our client-handyman dashboard, sharing your needs is easier than ever. Upload photos, share quotations and leave no gaps unfilled in your communication</p>
        </div>
        <div className="how-it-work-slide">
          <Image
            src="/assets/images/howitwork1.jpg"
            alt="howitwork1"
            layout="responsive"
            width={315}
            height={338}
          />
          <span className="image-circle">1</span>
          <h3 className="mt-3">Choose A Service</h3>
          <hr/>
          <p>Choose from a wide range of handyman services offered in your locality. From cleaning services to electronic installations and repair work. We have it all!</p>
        </div>
        <div className="how-it-work-slide">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="howitwork1"
            layout="responsive"
            width={315}
            height={338}
          />
          <span className="image-circle">2</span>
          <h3 className="mt-3">Pick A Handyman</h3>
          <hr/>
          <p>Dein Hausman handymen aren't just skilled but also trustworthy and efficient. Pick from the best in your locality & get your work done it no time!</p>
        </div>
        <div className="how-it-work-slide">
          <Image
            src="/assets/images/howitwork3.jpg"
            alt="howitwork1"
            layout="responsive"
            width={315}
            height={338}
          />
          <span className="image-circle">3</span>
          <h3 className="mt-3">Share Your Needs</h3>
          <hr/>
          <p>With our client-handyman dashboard, sharing your needs is easier than ever. Upload photos, share quotations and leave no gaps unfilled in your communication</p>
        </div>
      </Slider>
    </div>
    </div>
  )
}