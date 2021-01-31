import Image from "next/image";

export default function ClientDashboard() {
  return (
    <div className="client-dashboard-wrapper">
      <div className="client-dashboard-top">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="heading">Hello <span>%clientname%</span></h1>
              <p className="sub-heading">Great to have you back. Let’s get you started for the day!</p>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center flex-end">
                <div>
                  <Image
                    src="/assets/svg/ic-add.svg"
                    alt="add"
                    width={72}
                    height={72}
                  />
                </div>
                <div>
                  <h4>Place A New Order</h4>
                  <h6>Choose from 1000+ handymen in and around your locality!</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
