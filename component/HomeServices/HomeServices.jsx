import Image from "next/image";

export default function HomeServices() {
  return (
    <div className="home-services-list">
      <div className="row">
        <div className="col-lg-3 col-md-12 service-txt">
          <h5>
            WE GIVE <br /> OUR BEST SERVICES <br /> FOR YOU
          </h5>
          <p>
            Meet your service experts. Regardless of the size of your home,
            forget about any worries that come with maintaining it.
          </p>
          <button className="btn btnprimary">View More Services</button>
        </div>
        <div className="col-lg-9 col-md-12">
          <ul className="service-list">
            <li>
              <Image
                src="/assets/svg/ic-clean-service.svg"
                alt="clean-service"
                width={80}
                height={80}
              />
              <h4>Cleaning Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-roof-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Roof Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-bathroom-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Bathroom Installation & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-computer-service.svg"
                alt="roof-service"
                width={80}
                height={80}
              />
              <h4>Computer Setup & Repair</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-restoration-service.svg"
                alt="restoration-service"
                width={80}
                height={80}
              />
              <h4>Restoration Services</h4>
            </li>
            <li>
              <Image
                src="/assets/svg/ic-electronic-service.svg"
                alt="electronic-service"
                width={80}
                height={80}
              />
              <h4>Electronic Installation & Repair</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
