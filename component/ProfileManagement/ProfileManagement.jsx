import Image from "next/image";
import { useState, useEffect } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PaymentCard from "../PaymentCard/PaymentCard";
import { withTranslation } from "../../constent/i18n/i18n"
import { get, update } from "lodash"
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const { NEXT_PUBLIC_STRIP_KEY } = process.env
const stripePromise = loadStripe(NEXT_PUBLIC_STRIP_KEY);

function ProfileManagement(props) {
  const [fullName, setName] = useState('')
  const [companyName, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [about, setAbout] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState({})
  const [isChange, changePayment] = useState(false)
  const dispatch = useDispatch()


  const { getCardLoading, getCardData, updateUserLoading, updateUser } = useSelector(state => ({
    getCardLoading: state.user.getCardLoading,
    getCardData: state.user.getCardData,
    updateUserLoading: state.user.updateUserLoading,
    updateUser: state.user.updateUser,

  }));
  useEffect(() => {
    setName(get(props, 'user.fname', ''))
    setCompany(get(props, 'user.company', ''))
    setPhone(get(props, 'user.mobile', ''))
    setAbout(get(props, 'user.description ', ''))
    setAddress(get(props, 'user.address ', ''))
  }, [props.user])

  useEffect(() => {
    dispatch({ type: "GET_CARD" })
  }, [])


  useEffect(() => {

    if (get(updateUser, 'message', false)) {
      NotificationManager.success(get(updateUser, 'message', false));
      dispatch({ type: "RESETUPDATED_USER" })
    }
    console.log(updateUser, "updateUser")
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
    console.log("error", error, phone, fullName)

    setError(error)
    if (!Object.keys(error).length) {
      dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, "mobile": phone.replace(/[^0-9]/g, ''), description: about } })
    }

  }



  function submitData(e) {
    const error = {}
    if (e.target.name === "fullName") {
      if (fullName) {
        dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, mobile: phone.replace(/[^0-9]/g, '') } })
      } else {
        error.fullName = "Please enter full name"
      }
    } else if (e.target.name === "phone") {
      if (phone) {
        if (phone.length < 6) {
          error.phone = 'please enter valid phone'
        } else {
          dispatch({ type: 'UPDATE_USER', payload: { fname: fullName, mobile: phone.replace(/[^0-9]/g, '') } })
        }
      } else {
        error.phone = "Please enter phone"
      }
    } else if (e.target.name === "about") {
      if (about) {
        dispatch({ type: 'UPDATE_USER', payload: { description: about } })
      } else {
        error.about = "Please enter about me"
      }
    }
    setError(error)
  }
  console.log("issssss", isChange)

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
            <h3 className="thin mb-3">{props.t("ProfileManagement.linkedAccounts")}</h3>

            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>GOOGLE</h5>
            </button>
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>FACEBOOK</h5>
            </button>
            {/* <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Twitter</h5>
            </button>
            <button className="btn d-flex align-items-center justify-content-start">
              <h5 className="add mr-3">+</h5>
              <h5>Email</h5>
            </button> */}
          </div>
        </div>
        <div className="col-md-9">
          <div className="profile-manager m-3">
            <h3 className="mb-3">{props.t("ProfileManagement.yourProfile")}</h3>
            <p>
              {props.t("ProfileManagement.info")}.{" "}
              <a href="#" className="find-more">
                {props.t("ProfileManagement.findOutMore")}
              </a>
            </p>
            <div className="d-flex flexwrap">
              <div className="small d-flex flex-column">
                <h3 className="label">{props.t("ProfileManagement.fullName")}</h3>
                <input
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="fullName"
                  className="input mr-3"
                  placeholder="Erika Hans"
                // onBlur={submitData}
                />
                {get(error, 'fullName', false) &&
                  <span className="errormsg"> {get(error, 'fullName', false)}</span>
                }
              </div>
              <div className="small d-flex flex-column">
                <h3 className="label">{props.t("ProfileManagement.phoneNumber")}</h3>
                <InputMask mask="(999) 999 9999" value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} >
                  {(inputProps) => <input {...inputProps} name="phone" className="input" type="tel" placeholder="(000) 000 0000" />}
                </InputMask>
                {get(error, 'phone', false) &&
                  <span className="errormsg"> {get(error, 'phone', false)}</span>
                }

              </div>
            </div>
            <h3 className="label">{props.t("ProfileManagement.aboutMe")}</h3>
            <textarea name="about" type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input large mr-2" placeholder="" />
            {get(error, 'about', false) &&
              <span className="errormsg"> {get(error, 'about', false)}</span>
            }
            <div className="horizontal-line"></div>
            <h3 className="label">{props.t("ProfileManagement.emailAddress")}</h3>
            <p className="email mb-3">{get(props, 'user.email',)}</p>
            <button onClick={onSubmit} classname="btn d-flex align-item-center justify -content-start">
              <h5 className="add mr-6">SUBMIT</h5>
            </button>


            <div className="horizontal-line"></div>
            <h3 className="label">{props.t("ProfileManagement.currentPassword")}</h3>
            <div className="d-flex">
              <p className="mr-3">***********</p>
              <p>(last changed 27 Feb 2020)</p>
            </div>

            <h3 className="mt-5">{props.t("ProfileManagement.notification")}</h3>
            <p className="mb-4">
              {props.t("ProfileManagement.notiText")}
            </p>
            <div className="notifications d-flex">
              <h6 className="icon mr-3">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.activityUpdates")}</h6>
                <p>
                  {props.t("ProfileManagement.activityText")}
                </p>
              </div>
            </div>
            <div className="notifications d-flex">
              <h6 className="icon mr-3">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.dailySummaries")}</h6>
                <p>
                  {props.t("ProfileManagement.dailyText")}
                </p>
              </div>
            </div>
            <div className="notifications d-flex">
              <h6 className="icon mr-3 fz18">
                <i className="fa fa-check-square" aria-hidden="true"></i>
              </h6>
              <div>
                <h6>{props.t("ProfileManagement.promotionalEmails")}</h6>
                <p>
                  {props.t("ProfileManagement.promotionalText")}
                </p>
              </div>
            </div>
            <h3 className="mt-5">{props.t("ProfileManagement.paymentSetting")}</h3>
            <p className="mb-4">
              {props.t("ProfileManagement.paymentText")}
            </p>
            <div className="payment-details d-flex flexwrap">
              {!isChange &&
                <div className="payment-method">
                  <h3 className="label">Payment Method</h3>
                  <span onClick={() => changePayment(true)} className="link cursur-pointer">
                    Change
                </span>
                  <p className="mt-4">
                    {get(getCardData, `cards.data[${get(getCardData, 'cards.data', []).length - 1}].funding`, 'Credit')} Card Ending <span>{get(getCardData, `cards.data[${get(getCardData, 'cards.data', []).length - 1}].last4`, '')}</span>
                  </p>
                </div>
              }
            </div>
            <div className="horizontal-line"></div>
            {isChange === true &&
              <>
                <h3 className="label">Add a new Payment Method</h3>
                <Elements stripe={stripePromise}>
                  <PaymentCard changePayment={changePayment} edit={true} />
                </Elements>
              </>
            }
            <h3 className="mt-5 mb-4">ACCOUNT SETTINGS</h3>
            <a className="settings-link cursur-pointer">Delete My Account</a>
            <p>Delete and remove all your data linked with Dein Hausman</p>
            <br />
            <a className="settings-link cursur-pointer">Deactivate my Account</a>
            <p>Temporarily deactivate your account</p>
          </div>
        </div>
      </div>

      <NotificationContainer />

    </div>
  );
}
export default withTranslation('common')(ProfileManagement)