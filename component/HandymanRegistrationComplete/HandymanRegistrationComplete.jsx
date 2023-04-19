import Image from "next/image";
import Link from "next/link"
import { withTranslation } from "../../constent/i18n/i18n"

function HandymanRegistrationComplete({t}) {
  return (
      <div className="waiting-handyman">
        <div className="waiting-wrapper">
          <div className="waiting-text">
            <h4>{t("registrationComplete.title")}</h4>
            <p className="text-center">{t("registrationComplete.text")}</p>
            <p className="text-center">{t("registrationComplete.text1")}</p>
          <Link href="/add-gig"><button className="btn primarybtn-fill mt-5 btng">{t("registrationComplete.btn")}</button></Link>
          <div>
              <Link href="/">Return to Homepage</Link>
          </div>
          
          </div>
        </div>
      </div>
  );
}
export default withTranslation('common')(HandymanRegistrationComplete)