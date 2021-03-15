import { get } from "lodash";
import React, { useState } from "react";

const TimelienItem = (props) => {
  const [showInfo, setShowInfo] = useState(false);
    return (
      <div key={get(props, 'key', '')} className={`timeline-item pb-4 ${props.withLine ? "withLine" : ""}`}>
        <div className="checkbox" onMouseEnter={() => setShowInfo(true)}>
          {Checkbox}
        </div>
        <h4>{get(props, 'data.status', '')}</h4>
        <p className="description">
          Vendor 11234 sent you his quotation for the service.
      </p>
        <div className="d-flex justify-content-between">
          {get(props, 'data.status', '') === "Order started" ?
            <p className="view" onClick={()=> setShowInfo(true)}>View</p> 
          :
            <p className="view">View</p>
          }
          <p className="time">12:57pm</p>
          </div>

        {showInfo && (
          <>
            <div
              className="timeline-backdrop"
              onClick={() => setShowInfo(false)}></div>
            <div
              className="timeline-item-info px-6 py-5"
              onMouseLeave={() => setShowInfo(false)}>
              <div className="header d-flex">
                <div className="image mr-4"></div>
                <div className="texts">
                  <h4 className="mb-2">Quotation Received</h4>
                  <p className="mb-0 h5">
                    Vendor 11234 sent you his quotation for the service.
                </p>
                </div>
              </div>
              <p className="h1 amount mt-4 mb-5">€500</p>
              <div className="buttons d-flex justify-content-center">
                <button className="btn btn-outline-primary mr-2">
                  Ask For Revision
              </button>
                <button className="btn btn-outline-primary">
                  Accept The Quote
              </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const Checkbox = (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="timeline-checkbox">
      <rect width="39.8919" height="40" fill="#9043C3" />
      <path
        d="M8.83285 19.4811L8.76257 19.4117L8.6923 19.4811L6.57682 21.5706L6.50479 21.6418L6.57682 21.7129L15.0387 30.0711L15.109 30.1406L15.1793 30.0711L33.312 12.1607L33.384 12.0896L33.312 12.0184L31.1965 9.92885L31.1262 9.85944L31.0559 9.92885L15.109 25.6803L8.83285 19.4811Z"
        fill="white"
        stroke="white"
        strokeWidth="0.2"
      />
    </svg>
  );

  export default TimelienItem;
