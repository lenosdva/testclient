import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PaymentCard from "../PaymentCard/PaymentCard";
import { withTranslation } from "../../constent/i18n/i18n"
import { get, update } from "lodash"
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import moment from "moment";
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PayChoose } from "../PayChoose/PayChoose"

const { NEXT_PUBLIC_STRIP_KEY } = process.env
const stripePromise = loadStripe(NEXT_PUBLIC_STRIP_KEY);

function HandymanRegistration(props) {
  const [fullName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('******');
  const [cPassword, setCPassword] = useState('******');
  const [isChangePassword, changePassword] = useState(false);
  const [lastPassChanged, setLastPassChanged] = useState('');
  const [activityUpdates, setActivityUpdates] = useState('');
  const [dailySummaries, setDailySummaries] = useState('');
  const [promotionalEmails, setPromotionalEmails] = useState('');
  const [error, setError] = useState({});
  const [isChange, changePayment] = useState(false);
  const [picture, setPicture] = useState('');
  const [isSocialLogin, setSocialLogin] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [status, setStatus] = useState("");
  const [sendNotification, setSendNotification] = useState("not");
  const [kontoinhaber, setKontoinhaber] = useState('');
  const [iban, setIban] = useState('');
  const [bic, setBic] = useState('');
  const [bankinstitut, setBankinstitut] = useState('');
  const [steuer, setSteuer] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [xing, setXing] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [youtube, setYoutube] = useState('');
  const [other, setOther] = useState('');
  const [workLicense, setWorkLicense] = useState({})
  const [avatar, setAvatar] = useState({})
  const [taxationIdentityCard, setTaxationIdentityCard] = useState({})
  const [certificate, setCertificate] = useState({})
  const [anotherUpload, setAnotherUpload] = useState({})
  const [visibleWorkLicense, setVisibleWorkLicense] = useState(false)
  const [visibleTaxationIdentityCard, setVisibleTaxationIdentityCard] = useState(false)
  const [visibleCertificate, setVisibleCertificate] = useState(false)
  const [firmExists, setFirmExists] = useState(false)
  const [sended, setSended] = useState(false)
  
  //EDIT BUTTON
  const [editButton, setEditButton] = useState(true)

  //account settings
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteSec, setIsDeleteSec] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);

  const [payChooseModel, setPayChooseModel] = useState(false);
  const [letFirm, setLetFirm] = useState(false)

  const dispatch = useDispatch();
  const router = useRouter();

  
  function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const onDrop = useCallback(acceptedFiles => {
    const image = acceptedFiles[0]
    image.url = URL.createObjectURL(image)
    var formData = new FormData();
    formData.append('files', image)
    dispatch({ type: 'UPLOAD_REQUEST', payload: {files: formData, key: 'avatar'} })
    setPicture(image)
    // console.log("acceptedFiles", )
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const { uploadDoc, getCardData, uploadDocLoading, updateUser, updateHyndymanLoading, firmLoading, firm } = useSelector(state => ({
    getCardLoading: state.user.getCardLoading,
    getCardData: state.user.getCardData,
    updateUserLoading: state.user.updateUserLoading,
    updateUser: state.user.updateUser,
    uploadDocLoading: state.handyman.uploadDocLoading,
    uploadDoc: state.handyman.uploadData,
    updateHyndymanLoading: state.handyman.updateLoading,
    firmLoading: state.handyman.firmLoading,
    firm: state.handyman.firm,
    
  }));
  useEffect(() => {
    setName(get(props, 'user.fname', ''))
    setLastName(get(props, 'user.lname', ''))    
    setLastPassChanged(get(props, 'user.lastPassChanged', ''))
    setActivityUpdates(get(props, 'user.ActivityUpdates', true))
    setDailySummaries(get(props, 'user.DailySummaries', false))
    setPromotionalEmails(get(props, 'user.PromotionalEmails', false))
  }, [props.user])

  useEffect(() => {    
    setCompany(get(props, 'handyman.companyName', ''))
    setPhone(get(props, 'handyman.phone', ''))
    setAbout(get(props, 'handyman.description', ''))
    setLocation(get(props, 'handyman.location', ''))    
    setStatus(get(props, 'handyman.status', "inReview"))
    setSendNotification(get(props, 'handyman.sendNotification', "not"))
    setKontoinhaber(get(props, 'handyman.Kontoinhaber', ''))
    setIban(get(props, 'handyman.IBAN', ''))
    setBic(get(props, 'handyman.BIC', ''))
    setBankinstitut(get(props, 'handyman.Bankinstitut', ''))
    setSteuer(get(props, 'handyman.Steuer', ''))
    setFacebook(get(props, 'handyman.facebook', ''))
    setLinkedin(get(props, 'handyman.linkedin', ''))
    setXing(get(props, 'handyman.xing', ''))
    setInstagram(get(props, 'handyman.instagram', ''))
    setWhatsapp(get(props, 'handyman.whatsapp', ''))
    setYoutube(get(props, 'handyman.youtube', ''))
    setOther(get(props, 'handyman.other', ''))
    if((get(props, 'handyman.proof', '')[0])) {
      setWorkLicense((get(props, 'handyman.proof', '')[0]).document)
    }
    if((get(props, 'handyman.proof', '')[1])) {
      setCertificate((get(props, 'handyman.proof', '')[1]).document)
    }
    if((get(props, 'handyman.proof', '')[2])) {
      setTaxationIdentityCard((get(props, 'handyman.proof', '')[2]).document)
    }  
    if(get(props, 'handyman.proof', '')[0]) {
      setVisibleWorkLicense((get(props, 'handyman.proof', '')[0]).visible)
    }
    if(get(props, 'handyman.proof', '')[1]) {
      setVisibleCertificate((get(props, 'handyman.proof', '')[1]).visible)
    }
    if(get(props, 'handyman.proof', '')[2]) {
      setVisibleTaxationIdentityCard((get(props, 'handyman.proof', '')[2]).visible)
    }
    if(get(props, 'user.handyman_application', null) === null) {
      setEditButton(false);
    }
  }, [props.handyman])

  useEffect(() => {
    if ((get(props, 'handyman.status', '') == 'inReview') && (get(props, 'handyman._id', false))) {
      router.push('/handyman-registration-complete')
      //dispatch({ type: "RESET_HANDYMAN" })
    }
  }, [props.handyman])
  

  useEffect(() => {
    if(get(uploadDoc, 'data[0].key', '')=== "workLicense"){
      setWorkLicense(uploadDoc.data[0])
      //dispatch({ type: "RESET_HANDYMAN" })
    }
    if(get(uploadDoc, 'data[0].key', '')=== "taxationIdentityCard"){
      setTaxationIdentityCard(uploadDoc.data[0])
      //dispatch({ type: "RESET_HANDYMAN" })
    }
    if(get(uploadDoc, 'data[0].key', '')=== "certificate"){
      //const data = saveChanges
      setCertificate(uploadDoc.data[0])
      //setsaveChanges(data)
      //dispatch({ type: "RESET_HANDYMAN" })
    }
    if(get(uploadDoc, 'data[0].key', '')=== "anotherUpload"){
      //const data = saveChanges
      setAnotherUpload(uploadDoc.data[0])
      //setsaveChanges(data)
      //dispatch({ type: "RESET_HANDYMAN" })
    }
    if(get(uploadDoc, 'data[0].key', '')=== "avatar"){
      //const data = saveChanges
      setAvatar(uploadDoc.data[0]._id)
      //console.log("AVATAR ; ", uploadDoc.data[0])
      //setsaveChanges(data)
      //dispatch({ type: "RESET_HANDYMAN" })
    }
  }, [uploadDoc])

  useEffect(() => {
    if (get(router, 'query.isSocial', false)) {
      setSocialLogin(true)
    }
    dispatch({ type: "GET_CARD" })
  }, [])




  useEffect(() => {
    if (get(updateUser, 'message', false)) {
      const error = {}
      error.success = get(updateUser, 'message', false)
      setError(error)
      setTimeout(() => {
        setError(error)
      }, 5000)
      dispatch({ type: "RESETUPDATED_USER" })
    } if (get(updateUser, '_id', false)) {
      const error = {}
      error.success = get(updateUser, 'message', '')
      setError(error)
      setTimeout(() => {
        setError(error)
      }, 5000)
      dispatch({ type: "RESETUPDATED_USER" })
    }
  }, [updateUser])


  function removeCertificate(key) {
    certificate[key] = {}
    setCertificate([...certificate])
  }

  function addCertificate(key) {
    let fileupload = document.getElementById(key);
    fileupload.click();
  }

  function uploadWorkLicense(file){
    const formData = new FormData();
    formData.append('files', file)
    dispatch({ type: "UPLOAD_REQUEST", payload: {files: formData, key: 'workLicense' }})
    setWorkLicense(file)
  }

  function uploadCertificate(file){
    const formData = new FormData();
    formData.append('files', file)
    dispatch({ type: "UPLOAD_REQUEST", payload: {files: formData, key: 'certificate' }})
    setCertificate(file)
  }

  function uploadTaxationIdentityCard(file){
    const formData = new FormData();
    formData.append('files', file)
    dispatch({ type: "UPLOAD_REQUEST", payload: {files: formData, key: 'taxationIdentityCard' }})
    setTaxationIdentityCard (file)
  }

  function uploadOtherFile(file){
    const formData = new FormData();
    formData.append('files', file)
    dispatch({ type: "UPLOAD_REQUEST", payload: {files: formData, key: 'anotherUpload' }})
    setAnotherUpload(file)
  }


  function toSend(e) {
    setSended(true)
    onSubmit(e)
  }



  async function onSubmit(e) {
    e.preventDefault()
    if(password != '') {
      changePassword(true);
    }
    let error = {}
    if(get(props, 'user.handyman_application', '') === "") {
      if(!agreement) {
        error.agreement = 'You have to agree with the processing of your personal data'
        setError(error)
      }
      if(!confirmation) {
        error.confirmation = 'You have to confirm'
        setError(error)
      }
    }
    if (phone == '') {
      error.phone = 'Phone number is required'
    } else if (phone.length < 6) {
      error.phone = 'Invalid phone number'
    }
    if (fullName == '') {
      error.fullName = 'First Name is required'
    }
    if (lastName == '') {
      error.lastName = 'Last Name is required'
    }
    if (isSocialLogin || isChangePassword) {
      if (password == '') {
        error.password = 'Password is required'
      } if (cPassword == '') {
        error.cPassword = 'Confirm password is required'
      }
      if (password !== cPassword) {
        error.cPassword = 'Password not match'
      }
      //if(uploadDocLoading === true){
      //  error.image = 'Image upload in progress'
      //}
      
    }
    if (companyName == '') {
      error.companyName = 'Company Name is required'
    }
    
    if (location == '') {
      error.location = 'Location is required'
    }
    if (get(workLicense, '_id', false) === false) {
      error.workLicense = "Required"
    }

    
    
    if(get(props, 'handyman.id', '') == '') {
      let url = 'https://strapi.deinhausmann.com/handyman-applications' + '?companyName=' + companyName
      let response = await (await fetch(url)).json()
      if(response.length > 0) {
        setFirmExists(true)
        error.firm = "Firm exists"
      }
      
    }


    setError(error)
    if (!Object.keys(error).length) {

          var formData = new FormData();      
          const data = {}
          data.id = get(props, 'user.id', '')
          data.fname = fullName
          data.lname = lastName
          data.ActivityUpdates = activityUpdates;
          data.DailySummaries = dailySummaries;
          data.PromotionalEmails = promotionalEmails;
          data.profilePic = avatar;      
          setStatus("inReview")
          setSendNotification("not")
          console.log("STATUS: ", status)
          const companyData = {proof: []}
          companyData.id = get(props, 'handyman.id', '')
          companyData.user = data.id
          companyData.companyName = companyName
          companyData.location = location
          companyData.description = about
          companyData.phone = phone;
          companyData.status = "inReview";
          companyData.sendNotification = sendNotification
          companyData.Kontoinhaber = kontoinhaber
          companyData.IBAN = iban
          companyData.BIC = bic;
          companyData.Bankinstitut = bankinstitut;
          companyData.Steuer = steuer;
          companyData.facebook = facebook;
          companyData.linkedin = linkedin;
          companyData.xing = xing;
          companyData.instagram = instagram;
          companyData.whatsapp = whatsapp;
          companyData.youtube = youtube;
          companyData.other = other;
          companyData.proof.push({"name": "Work License", document: get(workLicense, '_id', ''), visible: visibleWorkLicense})
          companyData.proof.push({"name": "Certificate", document: get(certificate, '_id', ''), visible: visibleCertificate})
          companyData.proof.push({"name": "Taxation Identity Card", document: get(taxationIdentityCard, '_id', ''), visible: visibleTaxationIdentityCard})
          companyData.proof.push({"name": "anotherUpload", document: get(anotherUpload, '_id', ''), visible: false})
          
          //if(get(uploadDoc, 'data[0]._id', false)){
          //  data.profilePic = get(uploadDoc, 'data[0]._id', '')
          //}
          // data.email = 
          // data.address =
          // if(picture !== ''){
          //   formData.append('picture', picture)
          // }
          if (isSocialLogin || isChangePassword) {
            data.password = password
            let time = new Date();
            data.lastPassChanged = time.toISOString();        
            changePassword(false);
            
            dispatch({ type: 'UPDATE_USER', payload: data })
            if(companyData.id == '') {
              dispatch({ type: "BECOME_HYNDYMAN", payload: companyData })
            } else {
              dispatch({ type: "UPDATE_HYNDYMAN", payload: companyData })
            }
            
            // dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, "mobile": phone.replace(/[^0-9]/g, ''), description: about, password } })
          } else {
            dispatch({ type: 'UPDATE_USER', payload: data })
            if(companyData.id == '') {
              dispatch({ type: "BECOME_HYNDYMAN", payload: companyData })
            } else {
              dispatch({ type: "UPDATE_HYNDYMAN", payload: companyData })
            }
            // dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, "mobile": phone.replace(/[^0-9]/g, ''), description: about } })


          }

          if(Object.keys(error).length === 0 && error.constructor === Object) {
            router.push('/handyman-registration-complete')
          }

        
      
    }

  }

  function onDeactivate(e) {
    setIsDeactivated(!isDeactivated);
    e.preventDefault();    
    let error = {};
    const data = {};
    data.id = get(props, 'handyman._id', '');
    data.deactivatedaccount = !isDeactivated;
    dispatch({ type: 'UPDATE_HYNDYMAN', payload: data });


  }


  function onDelete(e) {
    e.preventDefault()
    if(!isDelete) {
      setIsDeleteSec(false);
      return;
    }
    const data = {}
    data.id = get(props, 'handyman._id', '')
    dispatch({ type: 'DELETE_HYNDYMAN', payload: data })

    const userdata = {};
    userdata.id = get(props, 'user._id', '');
    userdata.handyman_application = "";
    dispatch({ type: 'UPDATE_USER', payload: userdata });
    dispatch({ type: 'RESET_HYNDYMAN' })
    dispatch({ type: 'RESET_USER' })
    
    router.push('/')

  }


  function choosePlan() {
    setPayChooseModel(true)
  }
  
  return (
    <div className="handyman-profile-management">
      <div className="row">        
          <div className="col-lg-8 col-md-12 first">
            <h2 className="mb-3">
                  {get(props, 'user.handyman_application', null) === null ? 
                    props.t("ProfileManagement.Registration")
                    :
                     editButton ?
                          props.t("ProfileManagement.yourProfile")
                        :
                          props.t("ProfileManagement.changeYourProfile")
                     
                  }
            </h2>
              {(get(props, 'user.handyman_application', null) != null) &&
                    <p>
                      {props.t("ProfileManagement.info")}
                    </p>  
              }  
              {firmExists && 
                <div className="exists"><p>You have the account. Please login</p></div>
              }              
          </div>
          {(editButton && get(props, 'user.handyman_application', null) != null) &&
            <>
          <div className="col-lg-4 col-md-12 second">            
                    <button onClick={() => setEditButton(false)} className="btn primary-submit-e" >
                      Edit Profile
                  </button>
          </div>
            </>
          }
      </div>
      <div className="row">     
      {PayChoose(payChooseModel, setPayChooseModel)}
        <div className="col-lg-12 col-md-12">
          <div className="handyman-profile-manager">
                  {isDeactivated && 
                        <h4 className="mr-5 isdeactive">
                        {props.t("ProfileManagement.deactivatedAccount")}
                        </h4>                      
                  }    
              <div className="d-flex">      
              {get(props, 'user.handyman_application', null) === null ? 
                <img
                  src='/assets/images/number1.png'
                  alt="testimonial2"
                  layout="responsive"
                  className="imgnum"
                  //style={{ width: 235, height: 80, borderRadius: 75 }}
                /> : <p></p>	
              } 
              {get(props, 'user.handyman_application', null) === null ?
              <h4 className="contactdet">{props.t("ProfileManagement.ContactDetails")}</h4>
              :
              <h4 className="contactdet profl-center">{props.t("ProfileManagement.ContactDetails")}</h4>
              }
              </div> 
            <br/>
            <br/>
            <div className="d-flex flexwrap profl">
              <div className="small d-flex flex-column justify-content-center">
              
                        <div className="col-md-6 timg">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {picture === '' ?
                              <img
                                src={get(props, 'user.profilePic.url', '') === '' ? '/assets/images/profile-pic.png' : props.user.profilePic.url}
                                alt="testimonial2"
                                layout="responsive"
                                style={{ width: 200, height: 200, borderRadius: 75 }}
                              />
                              :
                              <img
                                src={get(picture, 'url', '/assets/images/profile-pic.png')}
                                alt="testimonial2"
                                layout="responsive"
                                style={{ width: 200, height: 200, borderRadius: 75 }}
                              />                  
                            }
                          </div>
                        </div>




                
              </div>
              <div className="names d-flex flex-md-row flex-md-column">
                      <div>              
                          <h3 className="label">{props.t("ProfileManagement.fullName")} *</h3>
                            <input
                              value={fullName}
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              name="fullName"
                              className="input"
                              placeholder="Max"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />
                            {get(error, 'fullName', false) &&
                              <span className="errormsg"> {get(error, 'fullName', false)}</span>
                            } 
                      </div>
                      <div>              
                            <h3 className="label">{props.t("ProfileManagement.lastName")} *</h3>
                            <input
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              type="text"
                              name="lastName"
                              className="input"
                              placeholder="Mustermann"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />
                            {get(error, 'lastName', false) &&
                              <span className="errormsg"> {get(error, 'lastName', false)}</span>
                            }
                      </div>
              </div>              
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                <h3 className="label">{props.t("handyRegis.cName")} *</h3>
                            <input
                              value={companyName}
                              onChange={(e) => setCompany(e.target.value)}
                              type="text"
                              name="companyName"
                              className="mr-4 input"
                              placeholder="ErHans"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />
                            {get(error, 'companyName', false) &&
                              <span className="errormsg"> {get(error, 'companyName', false)}</span>
                            }
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">{props.t("handyRegis.location")} *</h3>
                            <input
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              type="text"
                              name="location"
                              className="input"
                              placeholder="Berlin, Germany"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />
                            {get(error, 'location', false) &&
                              <span className="errormsg"> {get(error, 'location', false)}</span>
                            }

              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                <h3 className="label">{props.t("ProfileManagement.emailAddress")} *</h3>
                <span className="span mr-3 email-readonly">{get(props, 'user.email',)}</span>
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">{props.t("ProfileManagement.phoneNumber")} *</h3>
                <InputMask mask="(+4\9) 999 999 99999" value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} disabled={ editButton? "disabled" : "" } >
                  {(inputProps) => <input {...inputProps} name="phone" className="input" type="tel" placeholder="(+49) --- --- -----" />}
                </InputMask>
                {get(error, 'phone', false) &&
                  <span className="errormsg"> {get(error, 'phone', false)}</span>
                }

              </div>
            </div>
            <h3 className={((get(props, 'user.handyman_application', null) != null)) ? "label profl-center" : "label profl"}>{props.t("handyRegis.about")} *</h3>
            <textarea name="about" type="text" value={about} onChange={(e) => setAbout(e.target.value)} className={((get(props, 'user.handyman_application', null) != null)) ? "input large1 profl-center" : "input large profl"} placeholder="" disabled={ editButton? "disabled" : "" } />
            {get(error, 'about', false) &&
              <span className="errormsg"> {get(error, 'about', false)}</span>
            }
            <h3 className={((get(props, 'user.handyman_application', null) != null)) ? "label profl-center" : "label profl"}>{props.t("handyRegis.socialmedia")}</h3>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                <div className="d-flex mb-3">
                    <img
                      src='/assets/images/facebook.png'
                      alt="facebook"
                      layout="responsive"
                      style={{ width: 40, height: 40, borderRadius: 75 }}
                    /><h4 className="mt-2 ml-20">{props.t("handyRegis.facebook")}</h4>
                </div>
              
                            <input
                              value={facebook}
                              onChange={(e) => setFacebook(e.target.value)}
                              type="text"
                              name="facebook"
                              className="mr-4 input"
                              placeholder="Your Facebook account name"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />

              </div>
              <div className="small d-flex flex-column">
                <div className="d-flex mb-3">
                      <img
                        src='/assets/images/whatsapp.png'
                        alt="facebook"
                        layout="responsive"
                        style={{ width: 40, height: 40, borderRadius: 75 }}
                      /><h4 className="mt-2 ml-20">{props.t("handyRegis.whatsapp")}</h4>
                  </div>
                            <input
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(e.target.value)}
                              type="text"
                              name="whatsapp"
                              className="input"
                              placeholder="Your Whatsapp phone number"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />


              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                <div className="d-flex mb-3 mt-3">
                        <img
                          src='/assets/images/linkedin.png'
                          alt="linkedin"
                          layout="responsive"
                          style={{ width: 40, height: 40, borderRadius: 75 }}
                        /><h4 className="mt-2 ml-20">{props.t("handyRegis.linkedin")}</h4>
                    </div>
                            <input
                              value={linkedin}
                              onChange={(e) => setLinkedin(e.target.value)}
                              type="text"
                              name="linkedin"
                              className="mr-4 input"
                              placeholder="Your LinkedIn account name"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />

              </div>
              
              <div className="small d-flex flex-column">
                  <div className="d-flex mb-3 mt-3">
                            <img
                              src='/assets/images/youtube.png'
                              alt="youtube"
                              layout="responsive"
                              style={{ width: 40, height: 40, borderRadius: 75 }}
                            /><h4 className="mt-2 ml-20">{props.t("handyRegis.youtube")}</h4>
                        </div>
                
                            <input
                              value={youtube}
                              onChange={(e) => setYoutube(e.target.value)}
                              type="text"
                              name="youtube"
                              className="input"
                              placeholder="Your Youtube account name"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />


              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                            <div className="d-flex mb-3 mt-3">
                                <img
                                  src='/assets/images/xing.png'
                                  alt="xing"
                                  layout="responsive"
                                  style={{ width: 40, height: 40, borderRadius: 75 }}
                                /><h4 className="mt-2 ml-20">{props.t("handyRegis.xing")}</h4>
                            </div>
                            <input
                              value={xing}
                              onChange={(e) => setXing(e.target.value)}
                              type="text"
                              name="xing"
                              className="mr-4 input"
                              placeholder="Your Xing account name"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />

              </div>
              <div className="small d-flex flex-column">
                            <div className="d-flex mb-3 mt-3">
                                <img
                                  src='/assets/images/othermedia.png'
                                  alt="other"
                                  layout="responsive"
                                  style={{ width: 40, height: 40, borderRadius: 75 }}
                                /><h4 className="mt-2 ml-20">{props.t("handyRegis.other")}</h4>
                            </div>

                            <input
                              value={other}
                              onChange={(e) => setOther(e.target.value)}
                              type="text"
                              name="other"
                              className="input"
                              placeholder="Link to Your social media"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />


              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                            <div className="d-flex mb-3 mt-3">
                                <img
                                  src='/assets/images/inst.png'
                                  alt="insta"
                                  layout="responsive"
                                  style={{ width: 40, height: 40, borderRadius: 75 }}
                                /><h4 className="mt-2 ml-20">{props.t("handyRegis.instagram")}</h4>
                            </div>
                            <input
                              value={instagram}
                              onChange={(e) => setInstagram(e.target.value)}
                              type="text"
                              name="instagram"
                              className="mr-4 input"
                              placeholder="Your Instagram account name"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />
                            
              </div>
              <div className="small d-flex flex-column">
                

              </div>
            </div>
            <div className="d-flex mt-10 mb-4">      
            {get(props, 'user.handyman_application', null) === null ? 
                <img
                  src='/assets/images/number2.png'
                  alt="testimonial2"
                  layout="responsive"
                  className="imgnum"
                  //style={{ width: 118, height: 40, borderRadius: 75 }}
                /> : <p></p>	
              } 
              {get(props, 'user.handyman_application', null) === null ? 
              <h4 className="contactdet">{props.t("ProfileManagement.password")}</h4>
              :
              <h4 className={((get(props, 'user.handyman_application', null) != null)) ? "profl-center" : "profl"}>{props.t("ProfileManagement.password")}</h4>
              }
            </div>
            {(get(props, 'user.handyman_application', null) === null) &&
              <>
                <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>
                    <div className="small d-flex flex-column">
                      <h3 className="label">Password</h3>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        className="input mr-4"
                        placeholder="******"
                      // onBlur={submitData}
                      />
                      {get(error, 'password', false) &&
                        <span className="errormsg"> {get(error, 'password', false)}</span>
                      }
                    </div>
                    <div className="small d-flex flex-column">
                      <h3 className="label">Repeat Password</h3>
                      <input
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        type="password"
                        name="cPassword"
                        className="input mr-4"
                        placeholder="******"
                      // onBlur={submitData}
                      />
                      {get(error, 'cPassword', false) &&
                        <span className="errormsg"> {get(error, 'cPassword', false)}</span>
                      }
                    </div>
                  </div>
                  </>
            }
            {(get(props, 'user.handyman_application', null) != null && !isChangePassword) &&
              <>
              <div className={((get(props, 'user.handyman_application', null) != null)) ? "profl-center" : "profl"}>
                <p className="label pss">{props.t("ProfileManagement.currentPassword")}</p>
                <div className="d-flex">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        className="input mr-3"
                        placeholder="********"
                        disabled={ editButton? "disabled" : "" }
                      // onBlur={submitData}
                      />
                    <p className="lastchange">Last Changed {get(props, 'user.lastPassChanged', "never") !== "never" ? moment(get(props, 'user.lastPassChanged', null)).format('DD MMM YYYY') : "Never"}</p>
                </div>
                { !editButton &&
                <span onClick={() => changePassword(true)} className="link cursur-pointer">
                    Change
                </span>
                }
                </div>
              </>
            }

            {isChangePassword &&
              <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>
                <div className="small d-flex flex-column">
                  <h3 className="label">New Password</h3>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    className="input mr-4"
                  // placeholder="Erika Hans"
                  // onBlur={submitData}
                  />
                  {get(error, 'password', false) &&
                    <span className="errormsg"> {get(error, 'password', false)}</span>
                  }
                </div>
                <div className="small d-flex flex-column">
                  <h3 className="label">Confirm Password</h3>
                  <input
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    type="password"
                    name="cPassword"
                    className="input mr-4"
                  // placeholder="Erika Hans"
                  // onBlur={submitData}
                  />
                  {get(error, 'cPassword', false) &&
                    <span className="errormsg"> {get(error, 'cPassword', false)}</span>
                  }
                </div>
              </div>

            }

            {/* Upload Docs  */}
              <div className="d-flex mt-10 mb-4">      
            {get(props, 'user.handyman_application', null) === null ? 
                <img
                  src='/assets/images/number3.png'
                  alt="testimonial2"
                  layout="responsive"
                  className="imgnum"
                  //style={{ width: 118, height: 40, borderRadius: 75 }}
                /> : <p></p>	
              } 
              {(get(props, 'user.handyman_application', null) === null || !editButton) ? 
              <h4 className={((get(props, 'user.handyman_application', null) != null) && !editButton) ? "profl-center" : "contactdet"}>{props.t("handyRegis.dDetails")}</h4>
              :
              <h4 className={((get(props, 'user.handyman_application', null) != null)) ? "profl-center" : "profl"}>{props.t("handyRegis.dtDetails")}</h4>
              }
            </div>

            {/* upload docs */}
              { (get(props, 'user.handyman_application', null) === null || !editButton) &&
              <>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>
              <div className="small d-flex flex-column">
                      <div className="d-flex">
                              <div className="form-group checkbox-wrapper filename">
                                <input checked={get(workLicense, 'name', false)} disabled={true} type="checkbox" id="html" />
                                <label className="fileupload" for="html">Work License</label>                        
                              </div>
                              <div className="edit-aria d-flex">
                                  <input accept="image/*, application/pdf" type="file" id='workLicense' onChange={(e) => uploadWorkLicense(e.target.files[0])} />
                                  <div className="remove-btn" onClick={() => addCertificate('workLicense')}>Edit</div>
                                  <div className="remove-btn" onClick={() => setWorkLicense({})}>Remove</div>
                              </div>
                      </div>                      

                      <div className="d-flex">
                      <input type="checkbox" checked={visibleWorkLicense} onChange={() => setVisibleWorkLicense(!visibleWorkLicense)} />
                        <p className="ml-3 visible">Visible to other users</p>                        
                      </div>
                      <span className="errormsg">{get(error, 'workLicense', '')}</span>
              </div>
              <div className="small d-flex flex-column">
                      <div className="d-flex">
                              <div className="form-group checkbox-wrapper filename">
                                <input checked={get(taxationIdentityCard, 'name', false)} disabled={true} type="checkbox" id="html" />
                                <label className="fileupload" for="html">Taxation Identity Card</label>                        
                              </div>
                              <div className="edit-aria d-flex">
                                  <input accept="image/*, application/pdf" type="file" id={'taxationIdentityCard'} onChange={(e) => uploadTaxationIdentityCard(e.target.files[0])} className="image-upload" />
                                  <div className="remove-btn" onClick={() => addCertificate('taxationIdentityCard')}>Edit</div>
                                  <div className="remove-btn" onClick={() => setTaxationIdentityCard({})}>Remove</div>
                              </div>
                      </div>                      

                      <div className="d-flex">
                      <input type="checkbox" checked={visibleTaxationIdentityCard} onChange={() => setVisibleTaxationIdentityCard(!visibleTaxationIdentityCard)} />
                        <p className="ml-3 visible">Visible to other users</p>                        
                      </div>
              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                      <div className="d-flex">
                              <div className="form-group checkbox-wrapper filename">
                                <input checked={get(certificate, 'name', false)} disabled={true} type="checkbox" id="html" />
                                <label className="fileupload" for="html">Certificate</label>                        
                              </div>
                              <div className="edit-aria d-flex">
                                  <input accept="image/*, application/pdf" type="file" id={'certificate'} onChange={(e) => uploadCertificate(e.target.files[0])} className="image-upload" />
                                  <div className="remove-btn" onClick={() => addCertificate('certificate')}>Edit</div>
                                  <div className="remove-btn" onClick={() => setCertificate({})}>Remove</div>
                              </div>
                      </div>                      

                      <div className="d-flex">
                      <input type="checkbox" checked={visibleCertificate} onChange={() => setVisibleCertificate(!visibleCertificate)} />
                        <p className="ml-3 visible">Visible to other users</p>                        
                      </div>
                      <span className="errormsg">{get(error, 'certificate', '')}</span>
              </div>
              <div className="small d-flex flex-column">
                      
                        <div className="d-flex">
                              <div className="filename">
                                  <input
                                      //value={anotherUpload}
                                      //onChange={(e) => setXing(e.target.value)}
                                      type="text"
                                      name="anotherUpload"
                                      className="input"
                                      placeholder="File Name"
                                    // onBlur={submitData}
                                    />                        
                              </div>
                              <div className="mt-3 edit-aria-1 d-flex">
                                  <input accept="image/*, application/pdf" type="file" id={'anotherUpload'} onChange={(e) => uploadOtherFile(e.target.files[0])} className="image-upload" />
                                  <div className="remove-btn" onClick={() => addCertificate('anotherUpload')}>Upload</div>                                  
                              </div>
                    </div>
              </div>
            </div>
            </>
            }

            { (get(props, 'user.handyman_application', null) != null && editButton) &&
              <>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>
              <div className="small-edit d-flex flex-column">
                      <div className="d-flex">
                              <div className="form-group checkbox-wrapper filename">
                                <input checked={get(workLicense, 'name', false)} disabled={true} type="checkbox" id="html" />
                                <label className="fileupload" for="html">Work License</label>                        
                              </div>                              
                      </div>
                      <div className="d-flex">
                      <input type="checkbox" checked={visibleWorkLicense} onChange={() => setVisibleWorkLicense(!visibleWorkLicense)} />
                        <p className="ml-3 visible">Visible to other users</p>                        
                      </div>
              </div>
              <div className="small-edit d-flex flex-column">
                      <div className="d-flex">
                              <div className="form-group checkbox-wrapper filename">
                                <input checked={get(certificate, 'name', false)} disabled={true} type="checkbox" id="html" />
                                <label className="fileupload" for="html">Certificate</label>                        
                              </div>                              
                      </div>
                      <div className="d-flex">
                      <input type="checkbox" checked={visibleCertificate} onChange={() => setVisibleCertificate(!visibleCertificate)} />
                        <p className="ml-3 visible">Visible to other users</p>                        
                      </div>
              </div>
              <div className="small-edit d-flex flex-column">
                      <div className="d-flex">
                              <div className="form-group checkbox-wrapper filename">
                                <input checked={get(taxationIdentityCard, 'name', false)} disabled={true} type="checkbox" id="html" />
                                <label className="fileupload" for="html">Taxation Identity Card</label>                        
                              </div>                              
                      </div>                      

                      <div className="d-flex">
                      <input type="checkbox" checked={visibleTaxationIdentityCard} onChange={() => setVisibleTaxationIdentityCard(!visibleTaxationIdentityCard)} />
                        <p className="ml-3 visible">Visible to other users</p>                        
                      </div>
              </div>
            </div>            
            </>
            }

            {/*PAYMENTS */}
              {get(props, 'user.handyman_application', null) != null &&
                <>
                  <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex mt-10 profl-center" : "d-flex mt-10 profl"}>
                    <h4 className="mt-2">{props.t("ProfileManagement.paymentSetting")}</h4>
                  </div>
                  <p className={((get(props, 'user.handyman_application', null) != null)) ? "mb-4 profl-center" : "mb-4 profl"}>
                    {props.t("ProfileManagement.paymentText")}
                  </p>
                </>
              }
              {get(props, 'user.handyman_application', null) != null &&
                <>
                  <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex mt-10 mb-4 profl-center flex-column" : "d-flex mt-10 mb-4 profl flex-column"}>
                    <h4 className="mt-2">{props.t("ProfileManagement.subscribtion")}</h4>
                    <p className="trialfree">You are using a free 30 days trial</p>
                    <p className="timefreetrial">Ends <span>{moment(get(props, 'handyman.freeTrial')).format('DD.MM.YYYY')}</span></p>
                    <p className="choose">Please choose a plan to continue using our platform</p>
                    <a className="settings-link cursur-pointer linked" onClick={choosePlan}>Choose a plan</a>
                  </div>                  
                </>
              }

              {/*BANK DETAILS*/}
            { get(props, 'user.handyman_application', null) == null &&
              <>
            <div className="d-flex mt-10 mb-4">      
            {get(props, 'user.handyman_application', null) === null ? 
                <img
                  src='/assets/images/number4.png'
                  alt="testimonial2"
                  layout="responsive"
                  className="imgnum"
                  //style={{ width: 118, height: 40, borderRadius: 75 }}
                /> : <p></p>	
              } 
              {get(props, 'user.handyman_application', null) === null ? 
              <h4 className="contactdet">{props.t("handyRegis.bDetails")}</h4>
              :
              <h4 className="contactdet">{props.t("handyRegis.bDetails")}</h4>
              }
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>
              <div className="small1 d-flex flex-column">
                <div className="d-flex mb-3">
                      <h4 className="mt-2 ml-20">{props.t("handyRegis.kontoinhaber")}</h4>
                  </div>
                            <input
                              value={kontoinhaber}
                              onChange={(e) => setKontoinhaber(e.target.value)}
                              type="text"
                              name="kontoinhaber"
                              className="input"
                              placeholder="Erika Hans"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />


              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                <div className="d-flex mb-3">
                    <h4 className="mt-2 ml-20">{props.t("handyRegis.iban")}</h4>
                </div>
              
                            <input
                              value={iban}
                              onChange={(e) => setIban(e.target.value)}
                              type="text"
                              name="iban"
                              className="mr-4 input"
                              placeholder="0000 0000 0000 0000 0000 00"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />

              </div>
              <div className="small d-flex flex-column">
                <div className="d-flex mb-3">
                      <h4 className="mt-2 ml-20">{props.t("handyRegis.bic")}</h4>
                  </div>
                            <input
                              value={bic}
                              onChange={(e) => setBic(e.target.value)}
                              type="text"
                              name="bic"
                              className="input"
                              placeholder="AAAAAAAA000"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />


              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "d-flex flexwrap profl-center" : "d-flex flexwrap profl"}>              
              <div className="small d-flex flex-column">
                <div className="d-flex mb-3">
                    <h4 className="mt-2 ml-20">{props.t("handyRegis.bankinstitut")}</h4>
                </div>
              
                            <input
                              value={bankinstitut}
                              onChange={(e) => setBankinstitut(e.target.value)}
                              type="text"
                              name="bankinstitut"
                              className="mr-4 input"
                              placeholder="Bank"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />

              </div>
              <div className="small d-flex flex-column">
                <div className="d-flex mb-3">
                      <h4 className="mt-2 ml-20">{props.t("handyRegis.steuer")}</h4>
                  </div>
                            <input
                              value={steuer}
                              onChange={(e) => setSteuer(e.target.value)}
                              type="text"
                              name="steuer"
                              className="input"
                              placeholder="000000000000"
                              disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />


              </div>
            </div>
          </>
          }
          {/*NOTIFICATIONS*/}

            <div className="d-flex mt-10 mb-4">      
            {get(props, 'user.handyman_application', null) === null ? 
                <img
                  src='/assets/images/number5.png'
                  alt="testimonial2"
                  layout="responsive"
                  className="imgnum"
                  //style={{ width: 118, height: 40, borderRadius: 75 }}
                /> : <p></p>	
              } 
              {get(props, 'user.handyman_application', null) === null ? 
                <h4 className="contactdet">{props.t("ProfileManagement.notification")}</h4>
                : 
                <h4 className={((get(props, 'user.handyman_application', null) != null)) ? "profl-center" : "profl"}>{props.t("ProfileManagement.notification")}</h4>	
              }
            </div>
            <p className={((get(props, 'user.handyman_application', null) != null)) ? "mb-4 profl-center" : "mb-4 profl"}>
              {props.t("ProfileManagement.notiText")}
            </p>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "notifications d-flex profl-center" : "notifications d-flex profl"} >             
              <h6 className="mr-3">
                <input type="checkbox" checked={activityUpdates} onChange={() => setActivityUpdates(!activityUpdates)} />
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.activityUpdates")}</h6>
                <p>
                  {props.t("ProfileManagement.activityText")}
                </p>
              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "notifications d-flex profl-center" : "notifications d-flex profl"} >                
              <h6 className="mr-3">
                <input type="checkbox" checked={dailySummaries} onChange={() => setDailySummaries(!dailySummaries)} />
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.dailySummaries")}</h6>
                <p>
                  {props.t("ProfileManagement.dailyText")}
                </p>
              </div>
            </div>
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "notifications d-flex profl-center" : "notifications d-flex profl"} >
              <h6 className="mr-3 fz18">
                <input type="checkbox" checked={promotionalEmails} onChange={() => setPromotionalEmails(!promotionalEmails)} />
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.promotionalEmails")}</h6>
                <p>
                  {props.t("ProfileManagement.promotionalText")}
                </p>
              </div>
            </div>
              {/*Account settings */}
              { get(props, 'user.handyman_application', null) != null &&
              <>
              <div className={((get(props, 'user.handyman_application', null) != null)) ? "profl-center settingsacc" : "profl settingsacc"} >
                  <h4 className="mt-5 mb-4">ACCOUNT SETTINGS</h4>
                  <a onClick={onDeactivate} className="settings-link cursur-pointer">{!isDeactivated? "Deactivate my Account" : "Activate my account" }</a>
                  <p>Temporarily deactivate your account</p>
                  <a onClick={() => setIsDeleteSec(!isDeleteSec)} className="settings-link cursur-pointer">Delete My Account</a>            
                  <p>Delete and remove all your data linked with Dein Hausman</p>
                  {isDeleteSec &&
                    
                        <div className="notifications d-flex">                
                          <h6 className="mr-3">
                            <input type="checkbox" checked={isDelete} onChange={() => setIsDelete(!isDelete)} />
                            <a onClick={onDelete} className="settings-link cursur-pointer">  Yes, Delete My Account</a>
                          </h6>
                        </div>
                  }
              </div>
            </>
              }
            {/*<h3 className="mt-5 mb-4">ACCOUNT SETTINGS</h3>
            <a className="settings-link cursur-pointer">Delete My Account</a>
            <p>Delete and remove all your data linked with Dein Hausman</p>
            <br />
            <a className="settings-link cursur-pointer">Deactivate my Account</a>
            <p>Temporarily deactivate your account</p> */}
            <div className={((get(props, 'user.handyman_application', null) != null)) ? "profl-center" : "profl"}>
            {get(props, 'user.handyman_application', null) === null ?
              <button onClick={onSubmit} className="btn primary-submit" >
                Confirm
              </button>
              : editButton ?
                  <span></span>
                  :
                  <button onClick={onSubmit} className="btn primary-submit" >
                    Save Changes
                  </button>              
              
            }
            {(get(props, 'user.handyman_application', null) === null) &&
                <>
              <br />
              {get(error, 'agreement', false) &&
                <span className="errormsg"> {get(error, 'agreement', false)}</span>
              } 
              <input className="input-check" type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)} /><span className="agreement">I hereby consent to the processing of my personal data.</span>
              <br />
              {get(error, 'confirmation', false) &&
                <span className="errormsg"> {get(error, 'confirmation', false)}</span>
              } 
              <input className="input-check" type="checkbox" checked={confirmation} onChange={() => setConfirmation(!confirmation)} /><span className="agreement">I confirm that I can act on behalf of the company.</span>
                </>
            }
            </div>
          </div>
        </div>
      </div>

      <NotificationContainer />

    </div>
  );
}
export default withTranslation('common')(HandymanRegistration)