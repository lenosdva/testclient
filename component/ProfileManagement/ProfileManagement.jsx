import Image from "next/image";
import PaymentCard from "../PaymentCard/PaymentCard";

export default function ProfileManagement() {
  return (
    <div className="profile-management d-flex">
      <div className="row">
        <div className="col-md-3">
          <div className="linked-accounts m-3">
            <div className="col-md-12 mb-5">
              <Image
                src="/assets/images/howitwork2.jpg"
                alt="testimonial2"
                layout="responsive"
                width={500}
                height={500}
              />
            </div>
            <h3 className="thin mb-3">Linked Accounts</h3>

            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">&nbsp;&nbsp;&nbsp;&nbsp;</h5>
              <h5>Google</h5>
            </button>
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Facebook</h5>
            </button>
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Twitter</h5>
            </button>
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Email</h5>
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="profile-manager m-3">
            <h3 className="mb-3">YOUR PROFILE</h3>
            <p>
              Some of this information may be visible to other people using our
              services.{" "}
              <a href="#" className="find-more">
                Find out more.
              </a>
            </p>
            <div className="d-flex">
              <div className="small d-flex flex-column">
                <h3 className="label">Full Name</h3>
                <input
                  type="text"
                  className="input mr-3"
                  placeholder="Erika Hans"
                />
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">Phone Number</h3>
                <input
                  type="text"
                  className="input "
                  placeholder="+49 | 597-567-1235"
                />
              </div>
            </div>
            <h3 className="label">About Me</h3>
            <textarea type="text" className="input large mr-2" placeholder="" />
            <div className="horizontal-line"></div>
            <h3 className="label">Email Address</h3>
            <p className="email mb-3">erikahans99@gmail.com</p>
            <div className="horizontal-line"></div>
            <h3 className="label">Current Password</h3>
            <div className="d-flex">
              <p className="mr-3">***********</p>
              <p>(last changed 27 Feb 2020)</p>
            </div>

            <h3 className="mt-5">NOTIFICATIONS</h3>
            <p className="mb-4">
              Control what you get notifications via your registered email for
            </p>
            <div className="notifications d-flex">
              <h6 className="icon mr-3">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>Activity Updates</h6>
                <p>
                  New tasks assigned by you, delivery updates, and completion
                  notifications for tasks you're assigned on
                </p>
              </div>
            </div>
            <div className="notifications d-flex">
              <h6 className="icon mr-3">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>Daily Summaries</h6>
                <p>
                  Task updates, approval requests for tasks assigned by you and
                  their upcoming due dates
                </p>
              </div>
            </div>
            <div className="notifications d-flex">
              <h6 className="icon mr-3">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>Promotional Emails</h6>
                <p>
                  Discounts, Promotional offers, community updates with love
                  from us for you.
                </p>
              </div>
            </div>
            <h3 className="mt-5">PAYMENT SETTINGS</h3>
            <p className="mb-4">
              An overview of your current default payment methods and settings
              with Dein Hausman
            </p>
            <div className="payment-details d-flex">
              <div className="location mr-5">
                <h3 className="label">Your Location</h3>
                <div className="d-flex">
                  <a href="#" className="link mr-3">
                    Change
                  </a>
                  <a href="#" className="link ml-3">
                    Add Service Instructions
                  </a>
                </div>

                <p className="mt-4">
                  Erika Hans
                  <br /> Fugger Strasse 63
                  <br /> Rheinland, Germany <br /> <br />
                  Phone: +49 0261 59 65
                </p>
              </div>
              <div className="payment-method">
                <h3 className="label">Payment Method</h3>
                <a href="#" className="link">
                  Change
                </a>
                <p className="mt-4">
                  Credit Card Ending <span>0507</span>
                </p>
              </div>
            </div>
            <div className="horizontal-line"></div>
            <h3 className="label">Add a new Payment Method</h3>
            <PaymentCard />
            <h3 className="mt-5 mb-4">ACCOUNT SETTINGS</h3>
            <a className="settings-link">Delete My Account</a>
            <p>Delete and remove all your data linked with Dein Hausman</p>
            <br />
            <a className="settings-link">Deactivate my Account</a>
            <p>Temporarily deactivate your account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
