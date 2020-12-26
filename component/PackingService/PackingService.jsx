import Image from "next/image";
import Reviews from "../Reviews/Reviews";
import ServiceCard from "../ServiceCard/ServiceCard";

export default function PackingService() {
  return (
    <div className="packing-service">
      <div className="heading d-flex align-items-center justify-content-start">
        <div className="col-md-2 mr-4 service-image">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="image"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className="title-section d-flex flex-column justify-content-center">
          <h2 className="mb-3">Moving & Packing Service</h2>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <h4 className="secondary handyman-name"> Erika Hans</h4>{" "}
              <div className="mb-2 ml-3 mr-3">
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>
              <h5>4.68 (110 Reviews)</h5>
            </div>
            <div className="d-flex align-items-center justify-content-end flex-wrap">
              <div>
                <button className="btn m-2 d-flex align-items-center justify-content-center">
                  <i className="fa fa-share-square" aria-hidden="true"></i>
                  <p className="ml-2 h4">Share</p>
                </button>
              </div>
              <div>
                <button className="btn m-2 d-flex align-items-center justify-content-center">
                  <i className="fa fa-heart" aria-hidden="true"></i>
                  <p className="ml-2 h4">Save</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body mt-5 d-flex align-items-center justify-content-between">
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
        <div className="d-flex flex-column align-items-start justify-content-center">
          <div className="form  p-5">
            <p className="mb-3 h5 font-weight-bold">
              Fill this form & get a free price quote
            </p>
            <input type="text" class="input small" placeholder="Name" />
            <input type="email" class="input small" placeholder="Email" />
            <div className="d-flex">
              <input
                type="text"
                class="input mr-2"
                placeholder="Shifting From?"
              />
              <input
                type="text"
                class="input ml-2"
                placeholder="Shifting To?"
              />
            </div>
            <input
              type="text"
              class="input large"
              placeholder="Date of Service"
            />
            <input
              type="text"
              class="input large"
              placeholder="Time of Service"
            />

            <div className="m-4 text-center">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="details d-flex align-items-start justify-content-between">
        <div className="about-service m-4">
          <h3 className="mb-4">About This Service</h3>
          <p className="discription">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="about-seller m-4">
          <h3 className="mb-4">About The Seller</h3>
          <div className="d-flex flex-column align-items-start">
            <div className="mr-4 d-flex align-items-start justify-content-center">
              <p className="light left-header">From</p>
              <p className="h5">Berlin, Germany</p>
            </div>
            <div className="d-flex align-items-start justify-content-center">
              <p className="light left-header">Member Since</p>
              <p className="h5">December 2019</p>
            </div>
          </div>
          <p className="discription">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <div className="rating-section p-5">
        <h3 className="text-center mb-5">Customer Reviews and Ratings</h3>
        <div className="row ">
          <div class="col">
            <Reviews />
          </div>
          <div class="col">
            <Reviews />
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary">Read all 112+ Reviews</button>
        </div>
      </div>
      <div className="more-services mt-5">
        <h1 className="mb-5">
          More Services by <span className="name">monika99</span>
        </h1>
        <div className="row ">
          <div class="col-md-4">
            <ServiceCard />
          </div>
          <div class="col-md-4">
            <ServiceCard />
          </div>
        </div>
      </div>
    </div>
  );
}
