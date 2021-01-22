import Image from "next/image";

export default function AboutUsAndContact() {
  return (
    <div className="about-us-and-contact d-flex align-items-center justify-content-end">
      <div className="form-area p-5 m-3">
        <h1 className="mb-4">About Us</h1>
        <p className="mb-3 mt-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <br />
        <p className="mb-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <br />
        <br />
        <h1 className="mb-3">Let's Connect</h1>
        <h3 className="subtitle mb-4">
          We would love to help you start exceeding your CX
        </h3>
        <div className="form">
          <div className="d-flex">
            <input type="text" className="input large mr-2" placeholder="Name" />
            <input type="text" className="input large ml-2" placeholder="Phone" />
          </div>
          <div className="d-flex">
            <input type="text" className="input large mr-2" placeholder="Email" />
            <input type="text" className="input large ml-2" placeholder="Subject" />
          </div>
          <textarea
            type="text"
            className="input large"
            placeholder="Type Your Message Here"
          />
        </div>
        <div className="button-area text-center">
          <button className="btn btn-primary">Send Us a Message</button>
        </div>
        <div className="or mb-4 d-flex align-items-center justify-content-center">
          <div className="horizontal-line"></div>
          <h4 className="m-3">or</h4>
          <div className="horizontal-line"></div>
        </div>
        <div className="icon-section d-flex align-items-center justify-content-center">
          <div className="m-3">
            <a className="btn facebook ">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
          <div className="m-3">
            <a className="btn google ">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
          <div className="m-3">
            <a className="btn btn-primary ">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="m-3">
            <a className="btn linkedin ">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="map-area ">
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              width="600"
              height="1150"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"></iframe>
            <a href="#"></a>
          </div>
        </div>
      </div>
    </div>
  );
}
