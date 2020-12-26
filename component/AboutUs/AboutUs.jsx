import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="aboutus">
      <div className="d-flex justify-content-start">
        <div className="col-md-3">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-md-3">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-md-3">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-md-3 pr-10 info">
          <h5 className="ml-2 mb-5">About Dein Hausman</h5>
          <p className="mb-4">
            Meet your service experts. Regardless of the size of your home,
            forget about any worries that come with maintaining it.
          </p>
          <button className="get-in-touch">View More Services</button>
        </div>
      </div>
    </div>
  );
}
