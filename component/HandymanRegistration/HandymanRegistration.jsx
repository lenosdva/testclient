import { useState,  useEffect } from "react"
import Image from "next/image";
import Link from "next/link"
import PaymentCard from "../PaymentCard/PaymentCard";
import { withTranslation } from "../../constent/i18n/i18n"
import { get } from "lodash";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

function ProfileManagement({ t }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { userData, uploadDoc, hyndyman, hyndymanLoading, uploadDocLoading } = useSelector(state => ({
    userData: state.user.user,
    uploadDoc: state.handyman.uploadDoc,
    uploadDocLoading: state.handyman.uploadDoc,
    hyndymanLoading: state.handyman.hyndymanLoading,
    hyndyman: state.handyman.hyndyman
  }));
  console.log(uploadDoc, hyndymanLoading, hyndyman)
  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [about, setAbout] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState({})
  const [workLicense, setWorkLicense] = useState({})
  const [taxationIdentityCard, setTaxationIdentityCard] = useState({})
  const [certificate, setCertificate] = useState([])
  
  useEffect(()=>{
    setName(get(userData, 'fname', ''))
    setEmail(get(userData, 'mobile', ''))
    setPhone(get(userData, 'email', ''))
  }, [userData])

  useEffect(()=>{
    if(get(hyndyman, 'success', false) && get(uploadDoc, 'success', false)){
      router.push('/handyman-registration-complete')
    }
  }, [hyndyman, uploadDoc])

  function removeCertificate(key) {
    certificate[key] = {}
    setCertificate([...certificate])
  }

  function addCertificate(key) {
    var fileupload = document.getElementById(key);
    fileupload.click();
  }

  function uploadCerificate(e, key) {
    certificate[key] = e.target.files[0]
    setCertificate([...certificate])
  }

  const renserCertificate = () => (
    certificate.map((data, key) => (
      <li key={key}>
        <div className="form-group checkbox-wrapper">
          <input checked={get(data, 'name', false)} disabled={true} type="checkbox" id="html" />
          <label for="html">Certificate {key + 1} (optional)</label>
        </div>
        { get(data, 'name', false) !== false ?
          <div className="remove-btn" onClick={() => removeCertificate(key)}>Remove</div>
          :
          <>
            <input accept="image/*" type="file" id={key} onChange={(e) => uploadCerificate(e, key)} style={{ display: "none" }} />
            <div className="remove-btn" onClick={() => addCertificate(key)}>Add</div>
          </>
        }
      </li>
    )
    )
  )

  function addMore() {
    // const data = certificate
    setCertificate(oldArray => [...oldArray, {}]);
    // setCertificate(data)
  }

  function onSubmit(){
    const error = {}
    if(name == ''){
      error.name ="Required"
    }if(location == ''){
      error.location ="Required"
    }if(about == ''){
      error.about ="Required"
    }if(get(workLicense, 'name', false) === false){
      error.workLicense ="Required"
    }if(get(taxationIdentityCard, 'name', false) === false){
      error.taxationIdentityCard ="Required"
    }
    setError(error)
    if(!Object.keys(error).length){
      const user ={
        fname: name,
        cname: companyName,
        location: location,
        description: about,
      }
      const formData = new FormData();
      formData.append('doc[]', workLicense)
      formData.append('doc[]', taxationIdentityCard)
      certificate.map((data)=>{
        if(get(workLicense, 'name', false) !== false){
          formData.append('doc[]', data)
        }
      })
      // router.push('/handyman-registration-complete')
      dispatch({ type: "BECOME_HYNDYMAN", payload: user })
      dispatch({ type: "UPLOAD", payload: formData })
      
      
    }
  }

  return (
    <div className="profile-management">
      <div className="row">
        <div className="col-md-12">
          <div className="profile-manager m-3">
            <h1 className="mb-3">{t("handyRegis.title")}</h1>
            <p className="mb-5">
              {t("handyRegis.text")}
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="linked-accounts m-3">
            <div className="col-md-12 mb-5">
              <Image
                src="/assets/images/profile-pic.png"
                alt="testimonial2"
                layout="responsive"
                width={236}
                height={236}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12 profile-manager">
          <h5 className="head-regis">{t("handyRegis.formTitle")}</h5>
          <div className="d-flex flexwrap">
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.fName")}</h3>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="input mr-3"
                placeholder="Erika Hans"
              />
              <p className="errormsg">{get(error, 'name', '')}</p>
            </div>
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.cName")}</h3>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
                className="input"
                placeholder="Erika  Home Services Inc."
              />
              <p className="errormsg">{get(error, 'companyName', '')}</p>
            </div>
          </div>

          <div className="d-flex flexwrap">
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.location")}</h3>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                className="input mr-3"
                placeholder="Berlin, Germany"
              />
              <p className="errormsg">{get(error, 'location', '')}</p>
            </div>
          </div>

          <h3 className="label">{t("handyRegis.about")}</h3>
          <textarea onChange={(e)=> setAbout(e.target.value)} value={about} type="text" className="textarea large" placeholder="" />
          <p className="errormsg">{get(error, 'about', '')}</p>
          <h5 className="head-regis mt-5">{t("handyRegis.cDetails")}</h5>
          <div className="d-flex flexwrap">
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.email")}</h3>
              <input
                value={phone}
                // onChange={(e) => setPhone(e.target.value)}
                type="text"
                readOnly={true}
                className="input mr-3"
                placeholder="+49 | 597 - 567 - 1235"
              />
              <p className="errormsg">{get(error, 'phone', '')}</p>
            </div>
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.phone")}</h3>
              <input
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="input"
                readOnly={true}
                placeholder="erikahans99@gmail.com"
              />
              <p className="errormsg">{get(error, 'email', '')}</p>
            </div>
          </div>


          <h5 className="head-regis mt-5">{t("handyRegis.dDetails")}</h5>
          <ul className="upload-list">
            <li>
              <div className="form-group checkbox-wrapper">
                <input checked={get(workLicense, 'name', false)} disabled={true} type="checkbox" id="html" />
                <label for="html">Work License</label>
              </div>
              {get(workLicense, 'name', false) === false ?
                <>
                  <input accept="image/*" type="file" id={'workLicense'} onChange={(e) => setWorkLicense(e.target.files[0])} style={{ display: "none" }} />
                  <div className="remove-btn" onClick={() => addCertificate('workLicense')}>Add</div>
                </>
                :
                <div className="remove-btn" onClick={() => setWorkLicense({})}>Remove</div>
              }
              <p className="errormsg">{get(error, 'workLicense', '')}</p>
            </li>
            <li>
              <div className="form-group checkbox-wrapper">
                <input checked={get(taxationIdentityCard, 'name', false)} disabled={true} type="checkbox" id="html" />
                <label for="html">Taxation Identity Card</label>
              </div>
               {get(taxationIdentityCard, 'name', false) === false ?
               <>
                <input accept="image/*" type="file" id={'taxationIdentityCard'} onChange={(e) => setTaxationIdentityCard(e.target.files[0])} style={{ display: "none" }} />
                <div className="remove-btn" onClick={() => addCertificate('taxationIdentityCard')}>Add</div>
                </>
                :
                <div className="remove-btn" onClick={(e) => setTaxationIdentityCard({})}>Remove</div>
              }
              <p className="errormsg">{get(error, 'taxationIdentityCard', '')}</p>
            </li>
            {renserCertificate()}
            {/* <li>
              <div className="form-group checkbox-wrapper">
                <input type="checkbox" id="html" />
                <label for="html">Certificate 1 (optional)</label>
              </div>
              <div className="remove-btn">Remove</div>
            </li>
            <li>
              <div className="form-group checkbox-wrapper">
                <input type="checkbox" id="html" />
                <label for="html">Certificate 2 (optional)</label>
              </div>
              <div className="remove-btn">Remove</div>
            </li> */}
          </ul>
          <div onClick={addMore} className="addmore-btn cursur-pointer">Add More</div>
          <p className="note"><span>{t("handyRegis.note")}:</span>{t("handyRegis.nText")}</p>
          {/* <Link href="/handyman-registration-complete"> */}
            <button disabled={(hyndymanLoading && uploadDocLoading)} className="btn primarybtn-fill" onClick={onSubmit}>{t("handyRegis.submitBtn")}</button>
            {/* </Link> */}
          {get(userData, 'approved', false) === "approved" &&  
            <PaymentCard />
          }
        </div>
      </div>
    </div>

  );
}

export default withTranslation('common')(ProfileManagement)