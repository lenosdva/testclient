import Image from "next/image";
import { withTranslation } from "../../constent/i18n/i18n"

function AboutUs({t}) {
  return (
    <div className="aboutus">
      <div className="d-flex justify-content-start">
        <div className="col-md-3 col-xs-12">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-md-3 col-xs-12">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-md-3 col-xs-12">
          <Image
            src="/assets/images/spotlight2.jpg"
            alt="aboutus photo"
            layout="intrinsic"
            height={650}
            width={410}
          />
        </div>
        <div className="col-md-3 col-xs-12 pr-10 info">
          <h5 className="ml-2">{t('about.title')}</h5>
          <p className="mb-4">
            {t('about.text1')}
            {t('about.text2')}
          </p>
          <button className="get-in-touch">{t("about.button")}</button>
        </div>
      </div>
    </div>
  );
}
export default withTranslation('common')(AboutUs)
