import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useRouter } from 'next/router'
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { get } from 'lodash'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cookie from 'cookie-cutter';

const loginModal = (loginModel, closeModal, setSignUpModel, serverError) => {
  const dispatch = useDispatch()
  const { isLoading, emailLoginLoading, userData } = useSelector(state => ({
    isLoading: state.user.mobileLoginLoading,
    userData: state.user.mobileLoginData,
    emailLoginLoading: state.user.emailLoginLoading,
  }));
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginWith, setloginWith] = useState('phone');
  const [country, setCountry] = useState('+49')
  const [error, setError] = useState({})

  function openSignup() {
    close()
    setSignUpModel(true)
  }

  function close() {
    closeModal()
    setPhone('')
    setCountry('')
  }

  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  function onLogin(e) {
    e.preventDefault()
    let error = {}
    if (loginWith === 'phone') {
      if (phone === '') {
        error.phone = 'Phone number is required'
      } else if (phone.length < 6) {
        error.phone = 'Invalid phone number'
      }
      if (country === '') {
        error.phone = 'Phone number is required'
      }
      setError(error)
      if (!Object.keys(error).length) {
        dispatch({ type: 'LOGIN_REQUEST', payload: { "mobile": phone.replace(/[^0-9]/g, '') } })
      }
    } else {
      if (email === '') {
        error.email = 'Email is required'
      } else if (!ValidateEmail(email)) {
        error.phone = 'Invalid Email'
      } else if (password === '') {
        error.password = 'Password is required'
      } else if (password.length < 6) {
        error.password = 'minimum password length should 6 characters'
      }
      setError(error)
      if (!Object.keys(error).length) {
        dispatch({ type: 'LOGIN_EMAIL_REQUEST', payload: { email, password } })
      }
    }
  }

  return (
    <div>
      <div className="modal-wrapper">
        <Modal
          isOpen={loginModel}
          onRequestClose={close}
          ariaHideApp={false}
          // style={customStyles}
          contentLabel="Example Modal"
          className="modal-wrapper-sm"
        >
          <header>
            <button onClick={close} className="close-btn">
              <Image
                src="/assets/svg/close-modal.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
            <h4>Sign In</h4>
          </header>
          <div className="modalbody">

            {loginWith === 'phone' ?
              <form onSubmit={onLogin}>
                <div className="box">
                  <div className="form-group">
                    <div className="p-lr">
                      <div className="labels">Country/Region</div>
                      <select value={country} onChange={(e) => setCountry(e.target.value)} id="name" className="custom-select" required >
                        {/* <option disabled value=''></option> */}
                        <option value="+49">Germany</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-divider"></div>
                  <div className="form-group">
                    <div className="p-lr">
                      <div className="labels">Phone Number</div>
                      <InputMask mask="(999) 999 9999" value={phone} onChange={(e) => setPhone(e.target.value)}>
                        {(inputProps) => <input {...inputProps} className="field-input" type="tel" placeholder="(000) 000 0000" />}
                      </InputMask>
                    </div>
                  </div>
                </div>
                {get(error, 'phone', '') &&
                  <span className="errormsg">{get(error, 'phone', '')}</span>
                }{get(error, 'email', '') &&
                  <span className="errormsg">{get(error, 'email', '')}</span>
                }{get(error, 'password', '') &&
                  <span className="errormsg">{get(error, 'password', '')}</span>
                }{get(serverError, 'serverError', '') &&
                  <span >{get(serverError, 'serverError', '')}</span>
                }

                <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
                <button className="btn btn-continue" disabled={isLoading}>Continue</button>
              </form>
              :
              <form onSubmit={onLogin}>
                <div className="box">
                  <div className="form-group">
                    <div className="p-lr">
                      <div className="labels">Email</div>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="field-input" />
                    </div>
                  </div>
                  <div className="form-divider"></div>
                  <div className="form-group">
                    <div className="p-lr">
                      <div className="labels">Password</div>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="field-input" />

                    </div>
                  </div>
                </div>
                {get(error, 'phone', '') &&
                  <span className="errormsg">{get(error, 'phone', '')}</span>
                }{get(error, 'email', '') &&
                  <span className="errormsg">{get(error, 'email', '')}</span>
                }{get(error, 'password', '') &&
                  <span className="errormsg">{get(error, 'password', '')}</span>
                }{get(serverError, 'serverError', '') &&
                  <span className="errormsg">{get(serverError, 'serverError', '')}</span>
                }
                <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
                <button className="btn btn-continue" disabled={emailLoginLoading}>Continue</button>
              </form>
            }
            <div className="or">or</div>

            <div className="social-btns">
              <button>
                <Image
                  src="/assets/svg/ic-google.svg"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Continue with Google</span>
              </button>
              <button>
                <Image
                  src="/assets/svg/ic-facebook.svg"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Continue with Facebook</span>
              </button>
              {loginWith === 'phone' ?
                <button onClick={() => setloginWith('email')}>
                  <Image
                    src="/assets/svg/ic-email.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                  <span>Continue with E-Mail</span>
                </button>
                :
                <button onClick={() => setloginWith('phone')}>
                  <Image
                    src="/assets/svg/ic-email.svg"
                    alt=""
                    width={30}
                    height={30}
                  />
                  <span>Continue with Phone</span>
                </button>
              }
            </div>
            <p className="last-para">Don't Have An Account? <span onClick={openSignup}>Sign Up</span></p>

          </div>
        </Modal>
      </div>

      {/* request modal open */}
      {/* <div className="modal-wrapper">
      <Modal
        isOpen={loginModel}
        onRequestClose={close}
        ariaHideApp={false}
        contentLabel="Example Modal"
        className="modal-wrapper-sm modal-wrapper-md"
      >
        <header>
          <button onClick={close} className="close-btn">
            <Image
              src="/assets/svg/close-modal.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          <h4 className="blank"></h4>
        </header>
        <div className="modalbody">

        <div className="request-modal-wrapper">
          <div className="top-wrapper">
            <div className="profile-pic">
                <Image
                  src="/assets/images/profile-pic.png"
                  alt=""
                  width={128}
                  height={128}
                />
            </div>
            <div className="profile-txt">
                <h3>Service Request Sent</h3>
                <h5>user1234 sent you a service request</h5>
                <h6>12:57pm</h6>
            </div>
          </div>
            <div className="container down-details">
              <div className="row">
                <div className="col-md-12">
                  <h4>CUSTOMER DETAILS</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-details"><span>Name:</span>Kanak Dhotre</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-details"><span>EMail:</span>dhotrekanak@gmail.com</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="text-details"><span>Shifting From:</span>Berlin, 400607</div>
                </div>
                <div className="col-md-6">
                  <div className="text-details"><span>Shifting To:</span>Johanessburg, 400607</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-details"><span>Requested Date of Service:</span>23/12/2020</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="text-details"><span>Time of Service:</span>12:00pm</div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="btn-details">
                    <button className="outline-btn">Accept Request</button>
                    <button className="outline-btn">Decline Request</button>
                  </div>
                  <div className="note"><span>Note:</span>  Dein Hausman keeps 10% of your earnings as commision</div>
                </div>
              </div>
            </div>
        </div>



        </div>
      </Modal>
    </div> */}
      {/* request modal close */}
    </div>
  );
}

const signUpModal = (signUpModel, closeModal, setLoginModel, serverError) => {
  const dispatch = useDispatch()
  const { isLoading, emailSignLoading, userData } = useSelector(state => ({
    isLoading: state.user.mobileSignLoading,
    userData: state.user.mobileSignData,
    emailSignLoading: state.user.emailSignLoading,
  }));
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginWith, setloginWith] = useState('phone');
  const [country, setCountry] = useState('+49')
  const [error, setError] = useState({})

  function openLogin() {
    close()
    setLoginModel(true)
  }

  // useEffect(() => {
  //   if(signUpModel === false){
  //     setError({})
  //     setPhone('')
  //     setCountry('')
  //   }
  // }, [signUpModel])

  function close() {
    closeModal()
    setError({})
    setPhone('')
    setCountry('')
  }

  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  function onSignUp(e) {
    e.preventDefault()
    let error = {}
    if (loginWith === 'phone') {
      if (phone === '') {
        error.phone = 'Phone number is required'
      } else if (phone.length < 6) {
        error.phone = 'Invalid phone number'
      }
      if (country === '') {
        error.phone = 'Phone number is required'
      }
      setError(error)
      if (!Object.keys(error).length) {
        dispatch({ type: 'SIGNUP_REQUEST', payload: { "mobile": phone.replace(/[^0-9]/g, '') } })
      }
    } else {
      if (email === '') {
        error.email = 'Email is required'
      } else if (!ValidateEmail(email)) {
        error.phone = 'Invalid Email'
      } else if (password === '') {
        error.password = 'Password is required'
      } else if (password.length < 6) {
        error.password = 'minimum password length should 6 characters'
      }
      setError(error)
      if (!Object.keys(error).length) {
        dispatch({ type: 'SIGNUP_EMAIL_REQUEST', payload: { email, password } })
      }
    }
  }
  console.log("serverError======>", serverError)
  return (

    // Open Finish Signing Up
    // <div className="modal-wrapper">
    //   <Modal
    //     isOpen={signUpModel}
    //     onRequestClose={close}
    //     ariaHideApp={false}
    //     // style={customStyles}
    //     contentLabel="Example Modal"
    //     className="modal-wrapper-sm"
    //   >
    //     <header>
    //       <button onClick={close} className="close-btn">
    //         <Image
    //           src="/assets/svg/close-modal.svg"
    //           alt=""
    //           width={24}
    //           height={24}
    //         />
    //       </button>
    //       <h4>Finish Signing Up</h4>
    //     </header>
    //     <div className="modalbody">
    //         <form>
    //           <div className="box">
    //             <div className="form-group">
    //               <div className="p-lr">
    //               <input type="text" className="field-input" placeholder="First name" />
    //               </div>
    //             </div>
    //             <div className="form-divider"></div>
    //             <div className="form-group">
    //               <div className="p-lr">
    //               <input type="text" className="field-input" placeholder="Last name" />
    //               </div>
    //             </div>
    //           </div>
    //           <p className="text-left mt5">Make sure it matches the name on your government ID.</p>

    //         <div className="fullwidth-inputs-wrapper">
    //           <div className="form-group">
    //             <input type="text" className="field-input" placeholder="Date of birth" />
    //             <p className="text-left mt5">To sign up, you need to at least 18. Your birthday won't be shared with other people who use Dein Hausman.</p>
    //           </div>

    //           <div className="form-group">
    //             <input type="text" className="field-input" placeholder="Email" />
    //             <p className="text-left mt5">We'll email you trip confirmations and receipts.</p>
    //           </div>

    //           <div className="form-group">
    //             <input type="password" className="field-input" placeholder="Password" />
    //             <p className="text-left mt5">By selecting Agree and continue below, I agree to Dein Hausman's <Link href={'/'}>Terms of Services</Link>,  
    //             <Link href={'/'}>Payment Terms of Services</Link>,  
    //             <Link href={'/'}>Privacy Policy</Link> and <Link href={'/'}>Nondiscrimination Policy</Link>.</p>
    //           </div>
    //         </div>

    //           <button className="btn btn-continue">Agree and continue</button>
    //         <div className="border-divider"></div>
    //         <p className="text-left mt5">
    //           Dein Hausman's will send members-only deals, inspiration, marketing emails, and push notifications. You
    //           can opt out of receiving these at any time in your accout settings or directly from the marketing notification.
    //         </p>

    //         <div className="form-group mt-2 mb-2 checkbox-wrapper">
    //           <input type="checkbox" id="html" />
    //           <label for="html">I don't want to reveive marketing messages from Dein Hausman.</label>
    //         </div>
    //         </form>
    //     </div>
    //   </Modal>
    // </div>
    // Close Finish Signing Up



    <div className="modal-wrapper">
      <Modal
        isOpen={signUpModel}
        onRequestClose={close}
        ariaHideApp={false}
        // style={customStyles}
        contentLabel="Example Modal"
        className="modal-wrapper-sm"
      >
        <header>
          <button onClick={close} className="close-btn">
            <Image
              src="/assets/svg/close-modal.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          <h4>Sign Up</h4>
        </header>
        <div className="modalbody">
          {loginWith === 'phone' ?
            <form onSubmit={onSignUp}>
              <div className="box">
                <div className="form-group">
                  <div className="p-lr">
                    <div className="labels">Country/Region</div>
                    <select value={country} onChange={(e) => setCountry(e.target.value)} id="name" className="custom-select" required >
                      <option value="+49">Germany(+49)</option>
                    </select>
                  </div>
                </div>
                <div className="form-divider"></div>
                <div className="form-group">
                  <div className="p-lr">
                    <div className="labels">Phone Number</div>
                    {/* <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" id="text" className="field-input" required /> */}
                    <InputMask mask="(999) 999 9999" value={phone} onChange={(e) => setPhone(e.target.value)}>
                      {(inputProps) => <input {...inputProps} className="field-input" type="tel" placeholder="(000) 000 0000" />}
                    </InputMask>
                    {/* <label className="form-control-placeholder">Phone Number</label> */}
                  </div>
                </div>
              </div>
              {get(error, 'phone', '') &&
                <span className="errormsg">{get(error, 'phone', '')}</span>
              }{get(serverError, 'serverError', '') &&
                <span className="errormsg">{get(serverError, 'serverError', '')}</span>
              }
              <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
              <button className="btn btn-continue" disabled={isLoading}>Continue</button>
            </form>
            :

            <form onSubmit={onSignUp}>
              <div className="box">
                <div className="form-group">
                  <div className="p-lr">
                    <div className="labels">Email</div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="field-input" />
                  </div>
                </div>
                <div className="form-divider"></div>
                <div className="form-group">
                  <div className="p-lr">
                    <div className="labels">Password</div>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="field-input" />
                    {/* <label className="form-control-placeholder">Phone Number</label> */}
                  </div>
                </div>
              </div>
              {get(error, 'phone', '') &&
                <span className="errormsg">{get(error, 'phone', '')}</span>
              }{get(error, 'email', '') &&
                <span className="errormsg">{get(error, 'email', '')}</span>
              }{get(error, 'password', '') &&
                <span className="errormsg">{get(error, 'password', '')}</span>
              }{get(serverError, 'serverError', '') &&
                <span className="errormsg">{get(serverError, 'serverError', '')}</span>
              }
              <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
              <button className="btn btn-continue" disabled={emailSignLoading}>Continue</button>
            </form>
          }
          <div className="or">or</div>

          <div className="social-btns">
            <button>
              <Image
                src="/assets/svg/ic-google.svg"
                alt=""
                width={30}
                height={30}
              />
              <span>Continue with Google</span>
            </button>
            <button>
              <Image
                src="/assets/svg/ic-facebook.svg"
                alt=""
                width={30}
                height={30}
              />
              <span>Continue with Facebook</span>
            </button>
            {loginWith === 'phone' ?
              <button onClick={() => setloginWith('email')}>
                <Image
                  src="/assets/svg/ic-email.svg"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Continue with E-Mail</span>
              </button>
              :
              <button onClick={() => setloginWith('phone')}>
                <Image
                  src="/assets/svg/ic-email.svg"
                  alt=""
                  width={30}
                  height={30}
                />
                <span>Continue with Phone</span>
              </button>
            }
          </div>

          <p className="last-para">Already Have An Account?  <span onClick={openLogin}>Log In</span></p>
        </div>
      </Modal>
    </div>
  );
}

const otp = (otpModel, closeModal, mobile) => {
  const dispatch = useDispatch()
  const [sotp, setOtp] = useState('')
  const [error, setError] = useState({})
  const { otpData, resendOtpData } = useSelector(state => ({
    otpData: state.user.otpData,
    resendOtpData: state.user.resendOtpData,
  }));

  function onChangeOtp(e) {
    setOtp(e)
    setError({})
    if (e.length === 6) {
      dispatch({ type: 'VERIFY_OTP', payload: { otp: e, mobile } })
    }
  }

  useEffect(() => {
    // 
    if (get(otpData, 'result.error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(otpData, 'result.message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(otpData, 'result.message', 'Please try again'))
    }
    if (get(resendOtpData, 'result.error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(resendOtpData, 'result.message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(resendOtpData, 'result.message', 'Please try again'))
    }
    if (get(resendOtpData, 'result.success', false)) {
      dispatch({ type: 'RESET_LOG' })
      // NotificationManager.success('Success message', get(resendOtpData, 'result.message', 'OTP sent to given number'));
    }

  }, [otpData, resendOtpData])

  return (
    <div className="modal-wrapper">
      <Modal
        isOpen={otpModel}
        onRequestClose={closeModal}
        ariaHideApp={false}
        // style={customStyles}
        contentLabel="Example Modal"
        className="modal-wrapper-sm otp-modal"
      >
        <header>
          <button onClick={closeModal} className="close-btn">
            <Image
              src="/assets/svg/close-modal.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
          <h4>Confirm your number</h4>
        </header>
        <div className="modalbody">
          {/* <div className="otp-wrapper"> */}
          <div>
            <OtpInput
              value={sotp}
              containerStyle="otp-wrapper"
              onChange={onChangeOtp}
              numInputs={6}
              className="otp-inp"
            // separator={<span>-</span>}
            />
            {get(error, 'serverError', '') &&
              <span className="errormsg">{get(error, 'serverError', '')}</span>
            }
            {/* <input type="text" className="otp-inp" />
          <input type="text" className="otp-inp" />
          <input type="text" className="otp-inp"/>
          <input type="text" className="otp-inp" /> */}
          </div>
          <p className="last-para">Didn’t got the code?  <span onClick={() => dispatch({ type: 'RESEND_OTP', payload: { mobile } })}>Resend</span></p>
        </div>
      </Modal>
    </div>
  );
}

export default function Navbar(props) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user, needLogin, userData, otpData, emailSignData, mobileLoginData, emailLoginData } = useSelector(state => ({
    userData: state.user.mobileSignData,
    otpData: state.user.otpData,
    user: state.user.user,
    emailSignData: state.user.emailSignData,
    mobileLoginData: state.user.mobileLoginData,
    emailLoginData: state.user.emailLoginData,
    needLogin: state.user.needLogin,
  }));
  const [userLogged, setLoggedStatus] = useState(false);
  const [loginModel, setLoginModel] = useState(false);
  const [signUpModel, setSignUpModel] = useState(false);
  const [otpModel, setOtpModel] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showMessage, setMessage] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setError({})
  }, [loginModel, signUpModel, otpModel])

  useEffect(() => {
    if (get(user, 'code', false) === 401) {
      if (userLogged === true) {
        setLoggedStatus(false)
        localStorage.clear()
      }
    }
  }, [user])

  useEffect(() => {
    if (userLogged) {
      props.setWebSoket()
    }
  }, [userLogged])

  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      setLoggedStatus(true)
    }
    dispatch({ type: 'GET_USER' })
    dispatch({ type: 'GET_NOTIFICATION' })
  }, [])

  useEffect(() => {
    if (needLogin === true) {
      dispatch({ type: 'LOGIN_RESET' })
      setLoginModel(true)
    }
  }, [needLogin])

  useEffect(() => {
    dispatch({ type: 'GET_USER' })
    if (get(userData, 'success', false)) {

      dispatch({ type: 'RESET_LOG' })
      setLoginModel(false)
      setSignUpModel(false)
      if (get(userData, 'mobile', false)) {
        setMobile(userData.mobile)
        setOtpModel(true)
      }
    }
    if (get(userData, 'error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(userData, 'message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(userData, 'message', 'Please try again'))
    }
    if (get(otpData, 'token', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(otpData, 'token', {})))
        localStorage.setItem('user', JSON.stringify(get(otpData, 'user', {})))
        setOtpModel(false)
        setLoggedStatus(true)
      }
    }
    if (get(emailSignData, 'token', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(emailSignData, 'token', {})))
        // localStorage.setItem('user', JSON.stringify(get(otpData, 'user', {})))
        setSignUpModel(false)
        setLoggedStatus(true)
      }
    }

    if (get(mobileLoginData, 'result.error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(mobileLoginData, 'result.message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(mobileLoginData, 'result.message', 'Please try again'))
    }

    if (get(mobileLoginData, 'success', false)) {
      dispatch({ type: 'RESET_LOG' })
      setLoginModel(false)
      if (get(mobileLoginData, 'mobile', false)) {
        setMobile(mobileLoginData.mobile)
        setOtpModel(true)
      }
    }

    if (get(emailLoginData, 'error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(emailLoginData, 'message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(emailLoginData, 'message', 'Please try again'))
    }

    if (get(emailLoginData, 'token', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(emailLoginData, 'token', {})))
        localStorage.setItem('user', JSON.stringify(get(emailLoginData, 'user', {})))
        setLoginModel(false)
        setLoggedStatus(true)
      }

    }

  }, [userData, otpData, emailSignData, mobileLoginData, emailLoginData])

  const closeModal = () => {
    setOtpModel(false)
    setLoginModel(false)
    setSignUpModel(false)
  }

  function signOut() {
    localStorage.clear()
    cookie.set('token', '/')
    cookie.set('expires', '')
    cookie.set('path', '/')
    setLoggedStatus(false)
    router.push('/')
  }

  return (
    <div className="container">
      <div className="navbar hide-mob">
        <div onClick={() => router.push('/')} className="logo pointer">
          <Image
            src="/assets/svg/logo.svg"
            alt="company logo"
            width={276}
            height={48}
          />
        </div>
        <ul className="menu">
          <li className="align-self-center">
            {userLogged ?
              <Link href="handyman-registration">
                Become A Handyman
            </Link>
              :
              <span onClick={() => setLoginModel(true)}> Become A Handyman</span>
            }
          </li>
          {userLogged ? (
            <React.Fragment>
              <li className="align-self-center">
                <Link href="/client-dashboard">
                  My Bookings
                </Link>
              </li>
              <li className="align-self-center">
                <Link href="/about">
                  Support
                </Link>
              </li>
              <li className="align-self-center">
                <span onClick={() => setMessage(!showMessage)} className="posi-rel">
                  Messages
                  <span className={showMessage ? "message-list" : "message-list message-list-hide"}>
                    <ul>
                      <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>
                        <div className="bell-txt">
                          <h4>Moving Out Services</h4>
                          <p>Your request for a quotation for <a href="">Moving Out Services</a> has been sent to u<a href="">ser1234</a>...</p>
                          <h6>12:58pm 29-09-2020</h6>
                        </div>
                      </li>
                      <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>
                        <div className="bell-txt">
                          <h4>user123456</h4>
                          <p>Can you send me a photo of the lawn that is supposed to be mowed so that ...</p>
                          <h6>12:58pm 29-09-2020</h6>
                        </div>
                      </li>
                      <li>
                        <div className="bell-bg">
                          <Image
                            src="/assets/svg/ic-bell.svg"
                            alt=""
                            height={40}
                            width={46}
                          />
                        </div>
                        <div className="bell-txt">
                          <h4>user123456</h4>
                          <p>Can you send me a photo of the lawn that is supposed to be mowed so that ...</p>
                          <h6>12:58pm 29-09-2020</h6>
                        </div>
                      </li>
                    </ul>
                    <button className="btn btn-primary">View My Inbox</button>
                  </span>
                </span>

              </li>
            </React.Fragment>
          ) : (
            <>
              <li className="align-self-center">
                <Link href="/about">
                  About Us
                  </Link>
              </li>
              {/* <li onClick={() => setLoginModel(true)} className="align-self-center">
                  Login
                </li>
                <li onClick={() => setSignUpModel(true)} className="align-self-center">
                  SignUp
                </li> */}
              {/* <li onClick={() => setOtpModel(true)} className="align-self-center">
                  otp
                </li> */}
            </>
          )}

          {/* <li>
            <button
              onClick={menuClicked}
              className="btn btn-primary btn-rounded login-button">
              <i className="fa fa-bars" aria-hidden="true"></i>
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </button>
          </li> */}
          <li>



            <div className="togglewrapper">
              <label className="dropdown">
                <div className="dd-button d-flex">
                  <i className="fa fa-bars" aria-hidden="true"></i>
                  <Image
                    src="/assets/svg/ic-menu-profile.svg"
                    alt=""
                    width={34}
                    height={34}
                  />
                </div>


                {/* login modal wrapper open */}
                {!userLogged &&
                  <>
                    <input type="checkbox" className="dd-input" id="test" />
                    <ul className="dd-menu">
                      <li onClick={() => setSignUpModel(true)} className="align-self-center">Sign Up</li>
                      <li onClick={() => setLoginModel(true)} className="align-self-center">Log In</li>
                    </ul>
                  </>
                }
                {/* login modal wrapper close */}



                {/* profile modal wrapper open */}
                {userLogged &&
                  <>
                    <input type="checkbox" className="dd-input1" id="test1" />
                    <ul className="dd-menu1">
                      <li>
                        <div>
                          <Image
                            src="/assets/images/profile-pic.png"
                            alt=""
                            width={80}
                            height={80}
                          />
                        </div>
                        <h4>Marie Antoinette</h4>
                        <h6>marieantoinette99@gmail.com</h6>
                        <Link href='/profilemanagement'><button className="btn btn-manage">Manage Your Account</button></Link>
                        <div className="divi"></div>
                        <p onClick={signOut} className="text-center mb-2">Sign Out</p>
                        <p className="text-center"><Link href='/index'>Switch To Selling</Link></p>
                        <p className="text-center"><Link href='/client-dashboard'>My Dashboard</Link></p>
                      </li>
                    </ul>
                  </>
                }
                {/* profile modal wrapper close */}

              </label>
            </div>

          </li>
        </ul>
        {loginModal(loginModel, closeModal, setSignUpModel, error)}
        {signUpModal(signUpModel, closeModal, setLoginModel, error)}
        {otp(otpModel, closeModal, mobile, error)}
      </div>

      <div className="mob-menu-wrapper show-mob">
        <header>
          <div onClick={() => router.push('/')} className="pointer">
          <Image
            src="/assets/svg/logo.svg"
            alt="company logo"
            width={180}
            height={31}
          />
          </div>
          <div onClick={() => setMenu(!menu)}>
            <Image
              src="/assets/svg/ic-menu.svg"
              alt=""
              width={34}
              height={34}
            />
          </div>
        </header>
        <ul className={menu ? "" : 'hide'}>
          <li className="align-self-center">
          {userLogged ?
            <Link href="/handyman-registration">
              <a>Become A Handyman</a>
            </Link>
            :
            <span onClick={() => setLoginModel(true)}> Become A Handyman</span>
          }
          </li>
          {userLogged && (
            <>
              <li className="align-self-center">
                <Link href="/client-dashboard">
                  <a>My Bookings</a>
                </Link>
              </li>
              <li className="align-self-center">
                <Link href="/about">
                  <a>Support</a>
                </Link>
              </li>
              <li className="align-self-center">
                <span onClick={() => onClick={signOut}}>Logout</span>
              </li>
              {/* <li className="align-self-center">
                <Link href="/">
                  <a>Messages</a>
                </Link>
              </li> */}
            </>
          )
        }
          {!userLogged &&
            <>
              <li onClick={() => setLoginModel(true)} className="align-self-center">
                <a>Log In</a>
              </li>
              <li onClick={() => setSignUpModel(true)} className="align-self-center">
                <a>Sign Up</a>
              </li>
            </>
          }
        </ul>
      </div>
      <NotificationContainer />
    </div>
  );
}
