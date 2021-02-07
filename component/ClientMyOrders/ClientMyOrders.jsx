import React from 'react';
import Slider from "react-slick";
import Link from "next/link";
import Image from 'next/image';
import { withTranslation } from "../../constent/i18n/i18n"

const settings = {
  dots: false,
  infinite: true,
  arrows: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

function ClientMyOrders({t}) {
  return (

    <div className="client-dashboard-orders">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-sm-12 d-flex justify-content-between">
            <div>
              <h4>{t("clienttOrder.title")}</h4>
            </div>
            <div>
              <h4>{t("clienttOrder.sort")}:</h4>
              <select className="select-global">
                <option>Most Recent</option>
                <option>Most Recent</option>
                <option>Most Recent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-sm-12">
            {/* slider open */}
            <Slider {...settings}>
            <div>
              <div className="myorder-slide">
                <div className="labels-wrapper">
                  <span className="labels completed-label">{t("clienttOrder.compelete")}</span>
                </div>
                <h4>Solar Panel Installation</h4>
                <p>{t("clienttOrder.orderId")}: 12345678</p>
                <p>{t("clienttOrder.assigned")}: Annaliese Kempf</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                {t("clienttOrder.orderPlaced")}: Sep 29, 04:10 PM</div>
                <Link href="/inbox-redesign-awaiting"><button className="btn btnprimary-fill">{t("clienttOrder.viewProject")}</button></Link>
              </div>
              </div>
              <div>
              <div className="myorder-slide">
                <div className="labels-wrapper">
                  <span className="labels cancelled-label">{t("clienttOrder.cancelled")}</span>
                </div>
                <h4>Moving Out Service</h4>
                <p>{t("clienttOrder.orderId")}: 12345678</p>
                <p>{t("clienttOrder.assigned")}: Annaliese Kempf</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                {t("clienttOrder.orderPlaced")}: Sep 29, 04:10 PM</div>
                  <Link href="/inbox-redesign-awaiting"><button className="btn btnprimary-fill">{t("clienttOrder.viewProject")}</button></Link>
              </div>
              </div>
              <div>
              <div className="myorder-slide">
                <div className="labels-wrapper">
                  <span className="labels progress-label">{t("clienttOrder.inProgress")}</span>
                </div>
                <h4>Computer Installation</h4>
                <p>{t("clienttOrder.orderId")}: 12345678</p>
                <p>{t("clienttOrder.assigned")}: Annaliese Kempf</p>
                <div className="timers">
                  <Image
                    src="/assets/svg/ic-clock.svg"
                    alt="howitwork1"
                    width={11}
                    height={11}
                  />
                {t("clienttOrder.orderPlaced")}: Sep 29, 04:10 PM</div>
                  <Link href="/inbox-redesign-awaiting"><button className="btn btnprimary-fill">{t("clienttOrder.viewProject")}</button></Link>
              </div>
              </div>
            </Slider>
            {/* slider close */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default withTranslation('common')(ClientMyOrders)