import { useEffect, useState } from "react"
import Image from "next/image";
import Link from 'next/link'
import { withTranslation } from "../../constent/i18n/i18n"
import { get } from "lodash"
import moment from "moment";
function Footer({ t, ws }) {
    const [ quotationNotification, setQuaNotification ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ buyerID, setBuyerID ] = useState('')
    useEffect(() => {
        if('addEventListener' in ws){
            console.log("event calling")
        ws.addEventListener('message', function (event) {
            let message = JSON.parse(event.data);
            console.log("event", message) 
            if (get(message, 'request', '') === "notificationReceived") {
                setQuaNotification(true)
                setMessage(get(message, 'message', ''))
                setBuyerID(get(message, 'from.fname', ''))
                setTimeout(() => {
                    setQuaNotification(false)
                    setMessage('')
                    setBuyerID('')
                }, 5000)
            }
        })
    }
    }, [ws])
    return (
        <div>
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
                                        <Link href="/category?id=63ec42321e567d9347d0b8ae&name=Cleaning%20Services">{t("footer.cleaning")}</Link>
                                        <Link href="/category?id=63ec42cf1e567d9347d0b8ba&name=Electronic%20Installation">{t("footer.electronic")}</Link>
                                        <Link href="/category?id=63ec42a11e567d9347d0b8b7&name=Restoration%20Services">{t("footer.restoration")}</Link>
                                        <Link href="/category?id=63ec42751e567d9347d0b8b4&name=Computer%20Setup">{t("footer.computerSetup")}</Link>
                                        <Link href="/category?id=63ec439c1e567d9347d0b8cc&name=Electrical%20Services">Electrical Services</Link>
                                    </li>
                                    <li>
                                        <h5>{t("footer.followUs")}</h5>
                                        <a href="https://www.facebook.com/">{t("footer.facebook")}</a>
                                        <a href="https://twitter.com/">{t("footer.twitter")}</a>
                                        <a href="https://www.instagram.com/">{t("footer.instagram")}</a>
                                        <a href="https://www.linkedin.com/">{t("footer.linkedln")}</a>
                                    </li>
                                    <li>                                    
                                        <h5>{t("footer.contactUs")}</h5>
                                        <a href="">contact@deinhausman.de</a>
                                        <span className="aboutusadded">
                                                    <h5>
                                                        <Link href="/support">
                                                            {t("footer.support")}
                                                        </Link>
                                                    </h5>
                                                    <h5 className="space">
                                                            <Link href="/about">
                                                                {t("footer.about")}
                                                            </Link>
                                                    </h5>
                                        </span>
                                        <div>
                                            <Link href="/claim">{t("footer.claim")}</Link>
                                            <Link href="/privacy">{t("footer.privacy")}</Link>
                                            <Link href="/terms">{t("footer.terms")}</Link>
                                        </div>                                     
                                    </li>
                                    <li className="notvisible">
                                        <div>
                                            <h5>
                                                <Link href="/support">
                                                    {t("footer.support")}
                                                </Link>
                                            </h5>
                                            <h5>
                                                <Link href="/about">
                                                    {t("footer.about")}
                                                </Link>
                                            </h5>  
                                        </div>                                   
                                                                           
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
                                <div>
                                    <Link href="/claim">{t("footer.claim")}</Link>
                                    <Link href="/privacy">{t("footer.privacy")}</Link>
                                    <Link href="/terms">{t("footer.terms")}</Link>
                                </div>
                                <p>{t("footer.copyRights")}</p>
                            </div>                            
                            <div className="right-sec">
                                <div className="ssl">
                                    <Image
                                        src="/assets/images/ssl.png"
                                        alt="ssl logo"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className={quotationNotification ? "payment-succes" : "payment-succes payment-hide"}>
                <span className="profilepic">
                    <Image
                        src="/assets/images/profile-pic.png"
                        alt="clean-service"
                        width={100}
                        height={100}
                    />
                </span>
                {buyerID !== '' &&
                    <h1>{buyerID}</h1>
                }
                <h6>{message}</h6>
                <p>{moment().format('hh:mm A')}</p>
            </div>
            */}
        </div>
    );
}

export default withTranslation('common')(Footer)