import Image from "next/image";
import Link from 'next/link'
import { withTranslation } from "../../constent/i18n/i18n"

function Footer({t}) {
    return (
        <div className='footer d-flex flex-column'>
            <div className="container">
                <div className="row marg170">
                    <div className="col-md-12">
                        <div className="left-sec">
                            <Image
                                src="/assets/svg/logo-white.svg"
                                alt="company logo"
                                width={276}
                                height={75}
                            />
                            <h3>{t("footer.text")}</h3>
                        </div>
                        <div className="right-sec">
                            <ul>
                                <li>
                                    <h5>{t("footer.services")}</h5>
                                    <a href="">{t("footer.cleaning")}</a>
                                    <a href="">{t("footer.electronic")}</a>
                                    <a href="">{t("footer.restoration")}</a>
                                    <a href="">{t("footer.computerSetup")}</a>
                                    <a href="">{t("footer.otherServices")}</a>
                                </li>
                                <li>
                                    <h5>{t("footer.followUs")}</h5>
                                    <a href="">{t("footer.facebook")}</a>
                                    <a href="">{t("footer.twitter")}</a>
                                    <a href="">{t("footer.instagram")}</a>
                                    <a href="">{t("footer.linkedln")}</a>
                                </li>
                                <li>
                                    <h5>{t("footer.contactUs")}</h5>
                                    <a href="">contact@deinhausman.de</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* footer payment */}
                {/* <div className="row">
                    <div className="col-md-12 footer-success">
                        <h4>Can We Help You?</h4>
                        <h5>Check Out Our <a href="">Help Pages</a> or <a href="">Contact Us 24/7</a> </h5>
                    </div>
                </div> */}
                {/* footer payment */}
                <div className="row">
                    <div className="col-md-12 footer-btm">
                        <div className="left-sec">
                            <p>{t("footer.copyRights")}</p>
                        </div>
                        <div className="right-sec">
                            <a href="">{t("footer.claim")}</a>
                            <a href="">{t("footer.privacy")}</a>
                            <a href="">{t("footer.terms")}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation('common')(Footer)