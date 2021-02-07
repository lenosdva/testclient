import Image from "next/image";
import PaymentCard from "../PaymentCard/PaymentCard";
import { withTranslation } from "../../constent/i18n/i18n"

function ProfileManagement({t}) {
  return (
    <div className="profile-management">
      <div className="row">
        <div className="col-md-3">
          <div className="linked-accounts m-3">
            <div className="col-md-12 mb-5">
              <Image
                src="/assets/images/howitwork2.jpg"
                alt="testimonial2"
                layout="responsive"
                width={500}
                height={500}
              />
            </div>
            <h3 className="thin mb-3">{t("ProfileManagement.linkedAccounts")}</h3>

            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">&nbsp;&nbsp;&nbsp;&nbsp;</h5>
              <h5>Google</h5>
            </button>
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Facebook</h5>
            </button>
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Twitter</h5>
            </button>
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Email</h5>
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="profile-manager m-3">
            <h3 className="mb-3">{t("ProfileManagement.yourProfile")}</h3>
            <p>
            {t("ProfileManagement.info")}.{" "}
              <a href="#" className="find-more">
              {t("ProfileManagement.findOutMore")}
              </a>
            </p>
            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column">
                <h3 className="label">{t("ProfileManagement.fullName")}</h3>
                <input
                  type="text"
                  className="input mr-3"
                  placeholder="Erika Hans"
                />
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">{t("ProfileManagement.phoneNumber")}</h3>
                <input
                  type="text"
                  className="input "
                  placeholder="+49 | 597-567-1235"
                />
              </div>
            </div>
            <h3 className="label">{t("ProfileManagement.aboutMe")}</h3>
            <textarea type="text" className="input large mr-2" placeholder="" />
            <div className="horizontal-line"></div>
            <h3 className="label">{t("ProfileManagement.emailAddress")}</h3>
            <p className="email mb-3">erikahans99@gmail.com</p>
            <div className="horizontal-line"></div>
            <h3 className="label">{t("ProfileManagement.currentPassword")}</h3>
            <div className="d-flex">
              <p className="mr-3">***********</p>
              <p>(last changed 27 Feb 2020)</p>
            </div>

            <h3 className="mt-5">{t("ProfileManagement.notification")}</h3>
            <p className="mb-4">
            {t("ProfileManagement.notiText")}
            </p>
            <div className="notifications d-flex">
              <h6 className="icon mr-3">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>{t("ProfileManagement.activityUpdates")}</h6>
                <p>
                {t("ProfileManagement.activityText")}
                </p>
              </div>
            </div>
            <div className="notifications d-flex">
              <h6 className="icon mr-3">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>{t("ProfileManagement.dailySummaries")}</h6>
                <p>
                {t("ProfileManagement.dailyText")}
                </p>
              </div>
            </div>
            <div className="notifications d-flex">
              <h6 className="icon mr-3">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>{t("ProfileManagement.promotionalEmails")}</h6>
                <p>
                {t("ProfileManagement.promotionalText")}
                </p>
              </div>
            </div>
            <h3 className="mt-5">{t("ProfileManagement.paymentSetting")}</h3>
            <p className="mb-4">
            {t("ProfileManagement.paymentText")}
            </p>
            <div className="payment-details d-flex flexwrap">
              <div className="location mr-5">
                <h3 className="label">{t("ProfileManagement.yourLocation")}</h3>
                <div className="d-flex">
                  <a href="#" className="link mr-3">
                  {t("ProfileManagement.change")}
                  </a>
                  <a href="#" className="link ml-3">
                  {t("ProfileManagement.addServiceInstructions")}
                  </a>
                </div>

                <p className="mt-4">
                  Erika Hans
                  <br /> Fugger Strasse 63
                  <br /> Rheinland, Germany <br /> <br />
                  {t("ProfileManagement.phone")}: +49 0261 59 65
                </p>
              </div>
              <div className="payment-method">
                <h3 className="label">Payment Method</h3>
                <a href="#" className="link">
                  Change
                </a>
                <p className="mt-4">
                  Credit Card Ending <span>0507</span>
                </p>
              </div>
            </div>
            <div className="horizontal-line"></div>
            <h3 className="label">Add a new Payment Method</h3>
            <PaymentCard />
            <h3 className="mt-5 mb-4">ACCOUNT SETTINGS</h3>
            <a className="settings-link">Delete My Account</a>
            <p>Delete and remove all your data linked with Dein Hausman</p>
            <br />
            <a className="settings-link">Deactivate my Account</a>
            <p>Temporarily deactivate your account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withTranslation('common')(ProfileManagement)