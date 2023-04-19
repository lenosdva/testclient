import { withTranslation } from "../../constent/i18n/i18n"
import Image from 'next/image';
import { useEffect, useState } from "react"

function AboutUsAndContact({t}) {
  const [isOpera, setIsOpera] = useState(false)
  useEffect(() => {
    setIsOpera((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
}, [])
  return (
    
    <div className="about-us-and-contact d-flex flexwrap">
      <div className={isOpera? "form-area-op p-5" :"form-area p-5"}>
        <h1>{t("aboutUs.title")}</h1>
        <p className="disp">
        {t("aboutUs.text1")}
        </p>
        <div className="mob d-flex">
            <p>
              {t("aboutUs.text1")}
            </p>
            <div className="mob1"> 
                                <img
                                      src="/assets/images/map.png"
                                      alt="map"                                      
                            
                                  />
                    
            </div>
        </div>
        <br />
        <p className="mb-3">
        {t("aboutUs.text2")}
        </p>
        <br />
        <br />
        <h3>Any Suggestions For Cooperation?</h3>
        <p className="subtitle">
        {t("aboutUs.cText")}
        </p>
        <div className="form">
          <div className="d-flex flexwrap">
            <input type="text" className="input large mr-2" placeholder={t("aboutUs.name")} />
            <input type="text" className="input large ml-2" placeholder={t("aboutUs.phone")} />
          </div>
          <div className="d-flex flexwrap">
            <input type="text" className="input large mr-2" placeholder={t("aboutUs.email")} />
            <input type="text" className="input large ml-2" placeholder={t("aboutUs.subject")} />
          </div>
          <textarea
            type="text"
            className="input large"
            placeholder={t("aboutUs.message")}
          />
        </div>
        <div className="button-area text-center">
          <button className="btn btn-primary">{t("aboutUs.btn")}</button>
        </div>
        <div className="or mb-4 d-flex align-items-center justify-content-center">
          <div className="horizontal-line"></div>
          <h4 className="m-3">or</h4>
          <div className="horizontal-line"></div>
        </div>
        <div className="icon-section d-flex align-items-center justify-content-center">
          <div className="m-3">
            <a className="btn facebook ">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>          
          <div className="m-3">
            <a className="btn btn-primary ">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="m-3">
            <a className="btn linkedin ">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="disp map-area">
        <div className="mapouter">
          <div className="gmap_canvas">
                      <Image
                            src="/assets/images/map.png"
                            alt="map"
                            width={482}
                            height={485}
                        />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation('common')(AboutUsAndContact)
