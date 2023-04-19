import Image from "next/image";
import Link from "next/link";
import { withTranslation } from "../../constent/i18n/i18n"

function AboutUs({t}) {
  return (
    <div className="aboutus">
      <div className="about-flex">
        <div className="about-imglist">
          <ul>
            <li>
                <Image
                  src="/assets/images/aboutus1.png"
                  alt="aboutus photo"
                  layout="intrinsic"
                  height={420}
                  width={270}
                />
            </li>
              <li>
                <Image
                  src="/assets/images/aboutus2.png"
                  alt="aboutus photo"
                  layout="intrinsic"
                  height={420}
                  width={270}
                />
              </li>
              <li>
                <Image
                  src="/assets/images/aboutus3.png"
                  alt="aboutus photo"
                  layout="intrinsic"
                  height={420}
                  width={270}
                />
              </li>
          </ul>
        </div>
        <div className="about-imgtext">
            <h5 className="ml-2 desc">{t('about.title')}</h5>
            <h5 className="ml-2 mob">{t('about.title')}</h5>
            <p className="mb-4">
              {t('about.text1')}
              {t('about.text2')}
            </p>
            <Link href="/about"><button className="get-in-touch">{t("about.button")}</button></Link>
        </div>
      </div>
    </div>


    
  );
}
export default withTranslation('common')(AboutUs)
