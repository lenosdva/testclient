import Image from "next/image";
import Link from "next/link";
import { withTranslation } from "../../constent/i18n/i18n"

function ClientDashboard({t}) {
  return (
    <div className="client-dashboard-wrapper">
      <div className="client-dashboard-top">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="heading">{t("clientDash.hello")} <span>%clientname%</span></h1>
              <p className="sub-heading">{t("clientDash.text")}</p>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center flex-end">
                <div>
                  <Link href="/category-services">
                  <Image
                    src="/assets/svg/ic-add.svg"
                    alt="add"
                    width={72}
                    height={72}
                  />
                  </Link>
                </div>
                <div>
                  <h4>{t("clientDash.oTitle")}</h4>
                  <h6>{t("clientDash.oText")}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(ClientDashboard)
