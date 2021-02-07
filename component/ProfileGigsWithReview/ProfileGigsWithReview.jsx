import Reviews from "../Reviews/Reviews";
import Image from "next/image";
import ServiceCard from "../ServiceCard/ServiceCard";
import { withTranslation } from "../../constent/i18n/i18n"

function ProfileGigsWithReview({t}) {
  return (
    <div className="profile-gigs col">
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <div className="profile-card m-2 p-4 d-flex flex-column align-items-center ">
            <div className="report d-flex align-items-center justify-content-end mb-3">
              <i className="fa fa-flag" aria-hidden="true"></i>
              <h5 className="ml-2 title">{t("profileGig.title")}</h5>
            </div>
            <div className="image-area mb-3">
              <Image
                src="/assets/images/howitwork2.jpg"
                alt="handyman1"
                layout="responsive"
                width={200}
                height={200}
              />
            </div>
            <h3>erikahans123</h3>
            <p>Your very own python geek</p>
            <div className="rating-star d-flex ">
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <p>
                4.3<span>(140 Reviews)</span>
              </p>
            </div>
            <button className="btn btn-primary h5">{t("profileGig.contactMe")}</button>

            <div className="mb-3 mt-3 horizontal-line"></div>
            <div className="d-flex flex-column align-items-start">
              <div className="mr-2 d-flex align-items-start justify-content-center">
                <p className="light left-title">{t("profileGig.from")}</p>
                <h5>Berlin, Germany</h5>
              </div>
              <div className="d-flex align-items-start justify-content-center">
                <p className="light left-title">{t("profileGig.memberSince")}</p>
                <h5>December 2019</h5>
              </div>
            </div>
            <div className="mt-3 mb-3 horizontal-line"></div>
            <p className="text-justify mt-3">
              {t("profileGig.text")}
            </p>
          </div>
        </div>

        <div className="col-lg-8 col-md-12 col-sm-12">
          <div className="gigs pl-5 gigsp">
            <div className="gigs-title d-flex align-items-center justify-content-between flexwrap">
              <h3 className="secondary">erikahans123's Gigs</h3>
              <div className="d-flex align-items-center justify-content-end flex-wrap">
                <div>
                  <button className="btn m-2 d-flex align-items-center justify-content-center">
                    <i className="fa fa-share-square" aria-hidden="true"></i>
                    <h4 className="ml-2">Share</h4>
                  </button>
                </div>
                <div>
                  <button className="btn m-2 d-flex align-items-center justify-content-center">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <h4 className="ml-2">Save</h4>
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ServiceCard />
              </div>
              <div className="col-md-6">
                <ServiceCard />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ServiceCard />
              </div>
              <div className="col-md-6">
                <ServiceCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="reviews p-5 col">
          <div className="row ">
            <div className="col">
              <Reviews />
            </div>
            <div className="col">
              <Reviews />
            </div>
          </div>
          <div className="row ">
            <div className="col">
              <Reviews />
            </div>
            <div className="col">
              <Reviews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withTranslation('common')(ProfileGigsWithReview)