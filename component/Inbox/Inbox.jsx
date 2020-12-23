import React from "react";

const Inbox = () => {
  return (
    <div className="inbox">
      <h4 className="text-center mt-4 mb-4">Your Inbox</h4>
      <div className="inbox-item">
        <div className="inbox-photo ml-2 mr-3"></div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            <p className="inbox-title text-truncate mb-0">Hey Jude</p>
            <p className="project-status">
              <span>Awaiting Quote</span>
            </p>
          </div>
          <p className="project-id mb-0 mt-0">Project ID: 123456789</p>
          <p className="inbox-name mt-1 mb-0">Heffen Geller</p>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
