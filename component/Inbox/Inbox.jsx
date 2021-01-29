import React from "react";
import Image from "next/image";

const Inbox = () => {
  return (
    <div className="inbox">
      <h4 className="text-center mt-4 mb-4">Your Inbox</h4>
      <div className="inbox-item">
        <div className="inbox-photo">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="profile"
            width={52}
            height={52}
          />
        </div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            <p className="inbox-title text-truncate mb-0">Bathroom Repair</p>
            <p className="project-status orange-label">
              <span>Awaiting Quote</span>
            </p>
          </div>
          <p className="project-id mb-0 mt-0">Project ID: N/A</p>
          <p className="inbox-name">Heffen Geller</p>
        </div>
      </div>

      <div className="inbox-item">
        <div className="inbox-photo">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="profile"
            width={52}
            height={52}
          />
        </div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            <p className="inbox-title text-truncate mb-0">Solar Panel Installation</p>
            <p className="project-status green-label">
              <span>Completed</span>
            </p>
          </div>
          <p className="project-id mb-0 mt-0">Project ID: 123456789</p>
          <p className="inbox-name">Monica Gaztambide</p>
        </div>
      </div>

      <div className="inbox-item">
        <div className="inbox-photo">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="profile"
            width={52}
            height={52}
          />
        </div>
        <div className="inbox-info">
          <div className="inbox-info-top">
            <p className="inbox-title text-truncate mb-0">Moving Out Serller</p>
            <p className="project-status red-label">
              <span>Cancelled</span>
            </p>
          </div>
          <p className="project-id mb-0 mt-0">Project ID: 123456789</p>
          <p className="inbox-name">Erika Hans</p>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
