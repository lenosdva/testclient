import Image from "next/image";
import Link from "next/link"
import Reviews from "../Reviews/Reviews";
import ServiceCard from "../ServiceCard/ServiceCard";
import { get } from "lodash"
export default function PackingService(props) {
  console.log("props=======>", props)
  return (
    <div className="packing-service">
      <div className="heading d-flex align-items-center justify-content-start flexwrap">
        <div className="col-md-2 mr-4 service-image">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="image"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className="title-section d-flex flex-column justify-content-center flexwrap">
          <h2 className="mb-3">{get(props, 'data.title', '')}</h2>
          <div className="d-flex justify-content-between flexwrap">
            <div className="d-flex align-items-center flexwrap">
              <h4 className="secondary handyman-name"> Erika Hans</h4>{" "}
              <div className="ml-3 mr-3">
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>
              <h5>4.68 (110 Reviews)</h5>
            </div>
            <div className="d-flex align-items-center justify-content-end flex-wrap">
              <div>
                <button className="btn d-flex align-items-center justify-content-center share-save">
                  <i className="fa fa-share-square" aria-hidden="true"></i>
                  <p className="ml-2 h4">Share</p>
                </button>
              </div>
              <div>
                <button className="btn m-2 d-flex align-items-center justify-content-center share-save">
                  <i className="fa fa-heart" aria-hidden="true"></i>
                  <p className="ml-2 h4">Save</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body mt-5 d-flex align-items-center justify-content-between flexwrap">
        <div className="image m-4">
          <div className="image-area">
            <Image
              src="/assets/images/spotlight1.jpg"
              alt="handyman1"
              layout="responsive"
              width={600}
              height={550}
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-start justify-content-center width-full">
          <div className="form p-5 form-full">
            <p className="mb-3 h5 font-weight-bold">
              Fill This Form & Get A Free Price Quote
            </p>
            <input type="text" className="input small" placeholder="Name" />
            <input type="email" className="input small" placeholder="Email" />
            <div className="d-flex flexwrap">
              <input
                type="text"
                className="input mr-2"
                placeholder="Shifting From?"
              />
              <input
                type="text"
                className="input ml-2"
                placeholder="Shifting To?"
              />
            </div>
            <input
              type="text"
              className="input large"
              placeholder="Date of Service"
            />
            <input
              type="text"
              className="input large"
              placeholder="Time of Service"
            />

            <div className="m-4 text-center">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row about-services">
        <div className="col-lg-6 col-sm-12">
            <h3>About This Service</h3>
            <p>
              {get(props, 'data.description', '')}
            </p>
            {/* <p>
              We aim at customer satisfaction and continual quality improvement. Therefore all our services are modified to suit client’s needs and requirements. 
            </p> */}
        </div>
        <div className="col-lg-6 col-sm-12">
          <h3>About The Seller</h3>
          <ul>
            <li>
              <h5>From</h5>
              <h4>Berlin, Germany</h4>
            </li>
            <li>
              <h5>Member Since</h5>
              <h4>Dec 2019</h4>
            </li>
          </ul>
          <p>Marie Adolfo was our Handyman. She went above and beyond the assigned call of duty. All of her work was first class, very quick and extremely professional. She even worked on repairing a broken window in our lawn outside in a rain storm! </p>
        </div>
      </div>

     
      <div className="rating-section p-5">
        <h3 className="text-center mb-5">Customer Reviews and Ratings</h3>
        <div className="row">
          <div className="col">
            <Reviews />
          </div>
          <div className="col">
            <Reviews />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Reviews />
          </div>
          <div className="col">
            <Reviews />
          </div>
        </div>
        <div className="mt-4">
          <Link href='/sellerprofile'><button className="btn btn-primary-rd">Read all 112+ Reviews</button></Link>
        </div>
      </div>
      <div className="more-services mt-5">
        <h1 className="mb-5">
          More Services by <span className="name">monika99</span>
        </h1>
        <div className="row ">
          <div className="col-md-4">
            <ServiceCard />
          </div>
          <div className="col-md-4">
            <ServiceCard />
          </div>
        </div>
      </div>
    </div>
  );
}
