import React from "react";
import TimelineItem from "./../TimelineItem/TimelineItem";
import { get } from "lodash"
const Timeline = (props) => {
  return (
    <div className="timeline">
      <p className="timeline-title mb-5">Saturday, 23 February </p>
      {get(props, 'orderStatus.orderHistory', []).map((data, key)=>(
          <TimelineItem withLine data={data} key={key} />
      ))
      }
       <TimelineItem withLine />
      {/* <TimelineItem /> */} 
    </div>
  );
};

export default Timeline;
