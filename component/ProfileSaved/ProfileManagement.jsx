import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
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

const { NEXT_PUBLIC_STRIP_KEY } = process.env
const stripePromise = loadStripe(NEXT_PUBLIC_STRIP_KEY);

function ProfileManagement(props) {
  const [fullName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [isChangePassword, changePassword] = useState(false);
  const [lastPassChanged, setLastPassChanged] = useState('');
  const [activityUpdates, setActivityUpdates] = useState('');
  const [dailySummaries, setDailySummaries] = useState('');
  const [promotionalEmails, setPromotionalEmails] = useState('');
  const [error, setError] = useState({});
  const [isChange, changePayment] = useState(false);
  const [picture, setPicture] = useState('');
  const [isSocialLogin, setSocialLogin] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteSec, setIsDeleteSec] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onDrop = useCallback(acceptedFiles => {
    const image = acceptedFiles[0]
    image.url = URL.createObjectURL(image)
    var formData = new FormData();
    formData.append('files', image)
    dispatch({ type: 'UPLOAD_REQUEST', payload: {files: formData} })
    setPicture(image)
    // console.log("acceptedFiles", )
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const { uploadDoc, getCardData, uploadDocLoading, updateUser } = useSelector(state => ({
    getCardLoading: state.user.getCardLoading,
    getCardData: state.user.getCardData,
    updateUserLoading: state.user.updateUserLoading,
    updateUser: state.user.updateUser,
    uploadDocLoading: state.handyman.uploadDocLoading,
    uploadDoc: state.handyman.uploadData,
  }));
  useEffect(() => {
    setName(get(props, 'user.fname', ''))
    setLastName(get(props, 'user.lname', ''))
    setCompany(get(props, 'user.company', ''))
    setPhone(get(props, 'user.phone', ''))
    setAbout(get(props, 'user.aboutMe', ''))
    setAddress(get(props, 'user.address ', ''))
    setLastPassChanged(get(props, 'user.lastPassChanged', ''))
    setActivityUpdates(get(props, 'user.ActivityUpdates', true))
    setDailySummaries(get(props, 'user.DailySummaries', false))
    setPromotionalEmails(get(props, 'user.PromotionalEmails', false))
    setIsDeactivated(get(props, 'user.deactivatedaccount', false))
  }, [props.user])

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
      //error.success = get(updateUser, 'message', 'Data saved')
      setError(error)
      setTimeout(() => {
        setError(error)
      }, 5000)
      dispatch({ type: "RESETUPDATED_USER" })
    }
  }, [updateUser])


  function onSubmit(e) {
    e.preventDefault()
    let error = {}
    if (phone == '') {
      error.phone = 'Phone number is required'
    } else if (phone.length < 6) {
      error.phone = 'Invalid phone number'
    }
    if (fullName == '') {
      error.fullName = 'Full Name is required'
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
      if(uploadDocLoading === true){
        error.image = 'Image upload in progress'
      }
    }


    setError(error)
    if (!Object.keys(error).length) {
      var formData = new FormData();
      // formData.append('fname', fullName)
      // formData.append('mobile', phone.replace(/[^0-9]/g, ''))
      // formData.append('description', about)
      const data = {}
      data.id = get(props, 'user._id', '')
      data.fname = fullName
      data.lname = lastName
      // data.company=
      data.phone = phone.replace(/[^0-9]/g, '')
      data.aboutMe = about
      if(get(uploadDoc, 'data[0]._id', false)){
        data.profilePic = get(uploadDoc, 'data[0]._id', '')
      }
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
        // dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, "mobile": phone.replace(/[^0-9]/g, ''), description: about, password } })
      } else {
        dispatch({ type: 'UPDATE_USER', payload: data })
        // dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, "mobile": phone.replace(/[^0-9]/g, ''), description: about } })
      }
    }

  }


  function onDeactivate(e) {
    setIsDeactivated(!isDeactivated);
    e.preventDefault();

    //setIsDeactivated(!isDeactivated);
    
    let error = {};
    const data = {};
    data.id = get(props, 'user._id', '');
    data.deactivatedaccount = !isDeactivated;
    console.log(data);
    dispatch({ type: 'UPDATE_USER', payload: data });


  }


  function onDelete(e) {
    e.preventDefault()
    if(!isDelete) {
      setIsDeleteSec(false);
      return;
    }
    const data = {}
    data.id = get(props, 'user._id', '')
    dispatch({ type: 'DELETE_USER', payload: data })
    localStorage.clear()
    dispatch({ type: 'RESET_USER' })
    router.push('/')

  }

  function onEdit(e) {
    router.push('/profilemanagement')
  }



  // function submitData(e) {
  //   const error = {}
  //   if (e.target.name === "fullName") {
  //     if (fullName) {
  //       dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, mobile: phone.replace(/[^0-9]/g, '') } })
  //     } else {
  //       error.fullName = "Please enter full name"
  //     }
  //   } else if (e.target.name === "phone") {
  //     if (phone) {
  //       if (phone.length < 6) {
  //         error.phone = 'please enter valid phone'
  //       } else {
  //         dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, mobile: phone.replace(/[^0-9]/g, '') } })
  //       }
  //     } else {
  //       error.phone = "Please enter phone"
  //     }
  //   } else if (e.target.name === "about") {
  //     if (about) {
  //       dispatch({ type: 'UPDATE_USER', payload: { description: about } })
  //     } else {
  //       error.about = "Please enter about me"
  //     }
  //   }
  //   setError(error)
  // }

  console.log("uploadDoc", get(props, 'user.profilePic.url', ''))
  return (
    <div className="profile-managements">
      <div className="row">        
          <div className="col-lg-6 col-md-12 first">
            <h3 className="mb-3">{props.t("ProfileManagement.yourProfile")}</h3>
                    <p>
                      {props.t("ProfileManagement.info")}
                      {/* <a href="#" className="find-more">
                        {props.t("ProfileManagement.findOutMore")}
                      </a> */}
                    </p>
                    
          </div>
          <div className="col-lg-3 col-md-12 second">            
                    <button onClick={onEdit} className="btn primary-submit" >
                      Edit Profile
                  </button>
          </div>
      </div>
      <div className="row">      
{/*        <div className="col-lg-3 col-md-6">
          <div className="linked-accounts m-3">
            <div className="col-md-12 mb-3">
              <div {...getRootProps()}>
                <input {...getInputProps()} disabled="disabled" />
                {picture === '' ?
                  <img
                    src={get(props, 'user.profilePic.url', '') === '' ? '/assets/images/profile-pic.png' : props.user.profilePic.url}
                    alt="testimonial2"
                    layout="responsive"
                    style={{ width: 240, height: 240, borderRadius: 75 }}
                  />
                  :
                  <img
                    src={get(picture, 'url', '/assets/images/profile-pic.png')}
                    alt="testimonial2"
                    layout="responsive"
                    style={{ width: 240, height: 240, borderRadius: 75 }}
                  />
                }
              </div>
            </div>{/*
            <h3 className="thin mb-3">{props.t("ProfileManagement.linkedAccounts")}</h3>
            {get(props, 'user.services.google', true) &&
              <button className="btn d-flex align-items-center justify-content-start">
                <h5 className="add mr-3">+</h5>
                <h5>GOOGLE</h5>
              </button>
            }
            {get(props, 'user.services.facebook', true) &&
              <button className="btn d-flex align-items-center justify-content-start">
                <h5 className="add mr-3">+</h5>
                <h5>FACEBOOK</h5>
              </button>
            }
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Twitter</h5>
            </button> */}
            {/*<button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Email</h5>
            </button> */}
{/*          </div>
        </div>

*/}
        <div className="col-lg-9 col-md-12">
          <div className="profile-managers">      
                  {isDeactivated && 
                        <h3 className="mr-5 isdeactive">
                        {props.t("ProfileManagement.deactivatedAccount")}
                        </h3>                      
                  }      
            <h4 className="mt-5">{props.t("ProfileManagement.ContactDetails")}</h4>
            <br/>
            <br/>
            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column justify-content-center">

              
              <div className="col-md-6 timg">
                <div {...getRootProps()}>
                  <input {...getInputProps()} disabled="disabled" className="timg"/>                
                    <img
                      src={get(props, 'user.profilePic.url', '') === '' ? '/assets/images/profile-pic.png' : props.user.profilePic.url}
                      alt="testimonial2"
                      layout="responsive"
                      style={{ width: 200, height: 200, borderRadius: 75 }}
                    />
                </div>
              </div>


                
              </div>
              <div className="names d-flex flex-md-row flex-md-column">
                    <div>
                        <h3 className="label">{props.t("ProfileManagement.fullName")}</h3>
                          <input
                            value={fullName}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="fullName"
                            className="input"
                            placeholder="Erika"
                            disabled="disabled"
                          // onBlur={submitData}
                          />
                          {get(error, 'fullName', false) &&
                            <span className="errormsg"> {get(error, 'fullName', false)}</span>
                          }
                    </div>
                    <div>
                        <h3 className="label">{props.t("ProfileManagement.lastName")}</h3>
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          name="lastName"
                          className="input"
                          placeholder="Hans"
                          disabled="disabled"
                        // onBlur={submitData}
                        />
                        {get(error, 'lastName', false) &&
                          <span className="errormsg"> {get(error, 'lastName', false)}</span>
                        }
                  </div>
                
              </div>              
            </div>
            <div className="d-flex flexwrap">              
              <div className="small d-flex flex-column">
                <h3 className="label">{props.t("ProfileManagement.emailAddress")}</h3>
                <span className="span mr-3 email-readonly">{get(props, 'user.email',)}</span>
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">{props.t("ProfileManagement.phoneNumber")}</h3>
                <InputMask mask="(+99) 999 999 9999" disabled="disabled" value={phone} name="phone"  onChange={(e) => setPhone(e.target.value)} >
                  {(inputProps) => <input {...inputProps} name="phone" className="input" type="tel" placeholder="(+49) 597 567 1235" />}
                </InputMask>
                {get(error, 'phone', false) &&
                  <span className="errormsg"> {get(error, 'phone', false)}</span>
                }

              </div>
            </div>
            <h3 className="label">{props.t("ProfileManagement.aboutMe")}</h3>
            <textarea name="about" type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input large mr-2" disabled="disabled" placeholder="" />
            {get(error, 'about', false) &&
              <span className="errormsg"> {get(error, 'about', false)}</span>
            }
            {isSocialLogin &&
              <div className="d-flex flexwrap">
                <div className="small d-flex flex-column">
                  <h3 className="label">Password</h3>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    className="input mr-3"
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
                    className="input mr-3"
                  // placeholder="Erika Hans"
                  // onBlur={submitData}
                  />
                  {get(error, 'cPassword', false) &&
                    <span className="errormsg"> {get(error, 'cPassword', false)}</span>
                  }
                </div>
              </div>

            }
            
            {get(error, 'image', false) &&
              <span className="errormsg"> {get(error, 'image', false)}</span>
            } 
            {get(error, 'success', false) &&
              <span className="errormsg" style={{ color: 'green' }}> {get(error, 'success', false)}</span>
            }

            
            {/*
            <div className="horizontal-line"></div>
            <h3 className="label">{props.t("ProfileManagement.emailAddress")}</h3>
            <span className="mb-3 email-readonly">{get(props, 'user.email',)}</span>
            */}
            {!isSocialLogin && !isChangePassword &&
              <>
                <h3 className="label">{props.t("ProfileManagement.currentPassword")}</h3>
                <div className="d-flex">
                  <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          className="input mr-3"
                          placeholder="************"
                        // onBlur={submitData}
                        />
                  <p>Last Changed {get(props, 'user.lastPassChanged', "never") !== "never" ? moment(get(props, 'user.lastPassChanged', null)).format('DD MMM YYYY') : "Never"}</p>
                </div>
                {/* <span onClick={() => changePassword(true)} className="link cursur-pointer">
                    Change
                </span>
                */}
              </>
            }
            {isChangePassword &&
              <div className="d-flex flexwrap">
                <div className="small d-flex flex-column">
                  <h3 className="label">New Password</h3>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    className="input mr-3"
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
                    className="input mr-3"
                  // placeholder="Erika Hans"
                  // onBlur={submitData}
                  />
                  {get(error, 'cPassword', false) &&
                    <span className="errormsg"> {get(error, 'cPassword', false)}</span>
                  }
                </div>
              </div>

            }
            
            <h4 className="mt-5">{props.t("ProfileManagement.paymentSetting")}</h4>
            <p className="mb-4">
              {props.t("ProfileManagement.paymentText")}
            </p>
            <div className="payment-details d-flex flexwrap">
              {!isChange &&
                <div className="payment-method">
                  <h3 className="label">Payment Method</h3>
                  {/* <span onClick={() => changePayment(true)} className="link cursur-pointer">
                    Change
                </span>
                */}
                  <p className="mt-4">
                    {/* {get(getCardData, `cards.data[${get(getCardData, 'cards.data', []).length - 1}].funding`, 'Credit')} Card Ending <span>{get(getCardData, `cards.data[${get(getCardData, 'cards.data', []).length - 1}].last4`, '')}</span>
                    */}
                  </p>
                </div>
              }
            </div>
            <div className=""></div>
            {isChange === true &&
              <>
                <h3 className="label">Add a new Payment Method</h3>
                <Elements stripe={stripePromise}>
                  <PaymentCard changePayment={changePayment} edit={true} />
                </Elements>
              </>
            }
             <h3 className="mt-5">{props.t("ProfileManagement.notification")}</h3>
            <p className="mb-4">
              {props.t("ProfileManagement.notiText")}
            </p>
            <div className="notifications d-flex">              
              <h6 className="mr-3">
                <input type="checkbox" checked={activityUpdates} />
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.activityUpdates")}</h6>
                <p>
                  {props.t("ProfileManagement.activityText")}
                </p>
              </div>
            </div>
            <div className="notifications d-flex">                
              <h6 className="mr-3">
                <input type="checkbox" checked={dailySummaries} />
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.dailySummaries")}</h6>
                <p>
                  {props.t("ProfileManagement.dailyText")}
                </p>
              </div>
            </div>
            <div className="notifications d-flex">
              <h6 className="mr-3 fz18">
                <input type="checkbox" checked={promotionalEmails} />
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.promotionalEmails")}</h6>
                <p>
                  {props.t("ProfileManagement.promotionalText")}
                </p>
              </div>
            </div>


            <h3 className="mt-5 mbrrr">ACCOUNT SETTINGS</h3>
            <a onClick={onDeactivate} className="settings-link cursur-pointer mttrs">{!isDeactivated? "Deactivate my Account" : "Activate my account" }</a>
            <p className="mttrs">Temporarily deactivate your account</p>
            <p></p>
            <a onClick={() => setIsDeleteSec(!isDeleteSec)} className="settings-link cursur-pointer mttrs">Delete My Account</a>            
            <p className="mttrs">Delete and remove all your data linked with Dein Hausman</p>
            {isDeleteSec &&
              
                  <div className="notifications d-flex">                
                    <h6 className="mr-3">
                      <input type="checkbox" checked={isDelete} onChange={() => setIsDelete(!isDelete)} />
                      <a onClick={onDelete} className="settings-link cursur-pointer">  Yes, Delete My Account</a>
                    </h6>
                  </div>
            }
            
            
            {/* <button onClick={onSubmit} className="btn primary-submit" >
              Save Changes
            </button>
            */}
          </div>
        </div>
      </div>

      <NotificationContainer />

    </div>
  );
}
export default withTranslation('common')(ProfileManagement)