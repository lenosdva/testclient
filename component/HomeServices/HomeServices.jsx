import Image from "next/image";
import { withTranslation } from "../../constent/i18n/i18n"
import Services from "../../constent/services"

const renderService = (t) => (
  Services.map((data, key)=>(
    <li key={key}>
      <Image
        src={data.image}
        alt={data.name}
        width={80}
        height={80}
      />
      <h4>{t("services."+data.name)}</h4>
    </li>
  ))
)

function HomeServices({t}) {
  return (
    <div className="home-services-list">
      <div className="row">
        <div className="col-lg-3 col-md-12 service-txt">
          <h5>
            WE GIVE <br /> OUR BEST SERVICES <br /> FOR YOU
          </h5>
          <p>
           {t("services.title")}
          </p>
          <button className="btn btnprimary">{t("services.moreButton")}</button>
        </div>
        <div className="col-lg-9 col-md-12">
          <ul className="service-list">
            {renderService(t)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(HomeServices)