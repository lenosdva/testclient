import React from 'react';
import Slider from "react-slick";
import Image from 'next/image';

const settings = {
  dots: false,
  infinite: true,
  arrows: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


export default function ClientMyOrders() {
  return (

    <div className="client-dashboard-orders">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-sm-12 d-flex justify-content-between">
            <div>
              <h4>My Orders</h4>
            </div>
            <div>
              <h4>Sort By:</h4>
              <select className="select-global">
                <option>Most Recent</option>
                <option>Most Recent</option>
                <option>Most Recent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-sm-12">
            {/* slider open */}
            <Slider {...settings}>
            <div>
              <div className="myorder-slide">
                <div className="labels-wrapper">
                  <span className="labels completed-label">Completed</span>
                </div>
                <h4>Solar Panel Installation</h4>
                <p>Order ID: 12345678</p>
                <p>Assigned Handyman: Annaliese Kempf</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                Order Placed: Sep 29, 04:10 PM</div>
                <button className="btn btnprimary-fill">View Project</button>
              </div>
              </div>
              <div>
              <div className="myorder-slide">
                <div className="labels-wrapper">
                  <span className="labels cancelled-label">Cancelled</span>
                </div>
                <h4>Moving Out Service</h4>
                <p>Order ID: 12345678</p>
                <p>Assigned Handyman: Annaliese Kempf</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                Order Placed: Sep 29, 04:10 PM</div>
                <button className="btn btnprimary-fill">View Project</button>
              </div>
              </div>
              <div>
              <div className="myorder-slide">
                <div className="labels-wrapper">
                  <span className="labels progress-label">In Progress</span>
                </div>
                <h4>Computer Installation</h4>
                <p>Order ID: 12345678</p>
                <p>Assigned Handyman: Annaliese Kempf</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                Order Placed: Sep 29, 04:10 PM</div>
                <button className="btn btnprimary-fill">View Project</button>
              </div>
              </div>
            </Slider>
            {/* slider close */}
          </div>
        </div>
      </div>
    </div>

  );
}
