import Image from "next/image";

export default function ProfileManagement() {
  return (
      <div className="waiting-handyman">
        <div className="waiting-wrapper">
          <div className="waiting-text">
            <h4>Your profile is under review.</h4>
            <p>We will email you within 24 hours to let you know if your profile was approved.</p>
            <button className="btn primarybtn-fill mt-5">Return to Homepage</button>
          </div>
        </div>
      </div>
  );
}
