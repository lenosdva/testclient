import React from "react";
import TimelineItem from "./../TimelineItem/TimelineItem";

const Timeline = () => {
  return (
    <div className="timeline">
      <p className="timeline-title mb-5">Saturday, 23 February </p>
      <TimelineItem withLine />
      <TimelineItem withLine />
      <TimelineItem />
    </div>
  );
};

export default Timeline;
