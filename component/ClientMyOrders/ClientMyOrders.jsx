import React from 'react';
import Slider from "react-slick";
import Image from 'next/image';



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
          <div className="col-md-10 col-sm-12 d-flex justify-content-between">
            {/* slider open */}
            add slider here
            {/* slider close */}
          </div>
        </div>
        </div>
      </div>

  );
}
