import Image from "next/image";
import PaymentCard from "../PaymentCard/PaymentCard";

export default function ProfileManagement() {
  return (
    <div className="profile-management">
      <div className="row">
        <div className="col-md-12">
          <div className="profile-manager m-3">
            <h1 className="mb-3">Become A Handyman</h1>
            <p className="mb-5">
              Please fill out the details in this form and submit your profile. Once your profile is reviewed and approved you will be notified.
            </p>
            </div>
        </div>
        </div>
      
      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="linked-accounts m-3">
            <div className="col-md-12 mb-5">
              <Image
                src="/assets/images/profile-pic.png"
                alt="testimonial2"
                layout="responsive"
                width={236}
                height={236}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12 profile-manager">
          <h5 className="head-regis">PERSONAL DETAILS</h5>
            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column">
                <h3 className="label">Full Name</h3>
                <input
                  type="text"
                  className="input mr-3"
                  placeholder="Erika Hans"
                />
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">Company Name (optional)</h3>
                <input
                  type="text"
                  className="input"
                  placeholder="Erika  Home Services Inc."
                />
              </div>
            </div>

            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column">
                <h3 className="label">Location</h3>
                <input
                  type="text"
                  className="input mr-3"
                  placeholder="Berlin, Germany"
                />
              </div>
            </div>

            <h3 className="label">About You/Company</h3>
            <textarea type="text" className="textarea large" placeholder="" />

            <h5 className="head-regis mt-5">CONTACT DETAILS</h5>
            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column">
              <h3 className="label">Phone Number</h3>
                <input
                  type="text"
                  className="input mr-3"
                  placeholder="+49 | 597 - 567 - 1235"
                />
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">E-Mail Address</h3>
                <input
                  type="text"
                  className="input"
                  placeholder="erikahans99@gmail.com"
                />
              </div>
            </div>


            <h5 className="head-regis mt-5">UPLOAD DOCUMENTS</h5>
              <ul className="upload-list">
                <li>
                  <div className="form-group checkbox-wrapper">
                    <input type="checkbox" id="html" />
                    <label for="html">Work License</label>
                  </div>
                  <div className="remove-btn">Remove</div>
                </li>
                <li>
                  <div className="form-group checkbox-wrapper">
                    <input type="checkbox" id="html" />
                    <label for="html">Taxation Identity Card</label>
                  </div>
                  <div className="remove-btn">Remove</div>
                </li>
                <li>
                  <div className="form-group checkbox-wrapper">
                    <input type="checkbox" id="html" />
                    <label for="html">Certificate 1 (optional)</label>
                  </div>
                  <div className="remove-btn">Remove</div>
                </li>
                <li>
                  <div className="form-group checkbox-wrapper">
                    <input type="checkbox" id="html" />
                    <label for="html">Certificate 2 (optional)</label>
                  </div>
                  <div className="remove-btn">Remove</div>
                </li>
              </ul>
              <a href="" className="addmore-btn">Add More</a>

              
            <PaymentCard />
          <button className="btn primarybtn-fill mt-5">Save Changes</button>
          </div>
        </div>
      </div>

  );
}
