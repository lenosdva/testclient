import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useRouter } from 'next/router'
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { get } from 'lodash'

const loginSubmit = (e) => {
  e.preventDefault()
  alert("call")
}

const loginModal = (loginModel, closeModal, setSignUpModel) => {
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')

  function openSignup() {
    close()
    setSignUpModel(true)
  }

  function close() {
    closeModal()
    setPhone('')
    setCountry('')
  }

  return (
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
          <form onSubmit={loginSubmit}>
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

            <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
            <button className="btn btn-continue">Continue</button>
          </form>
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
            <button>
              <Image
                src="/assets/svg/ic-email.svg"
                alt=""
                width={30}
                height={30}
              />
              <span>Continue with E-Mail</span>
            </button>
          </div>

          <p className="last-para">Don't Have An Account? <span onClick={openSignup}>Sign Up</span></p>

        </div>
      </Modal>
    </div>
  );
}

const signUpModal = (signUpModel, closeModal, setLoginModel) => {
  const dispatch = useDispatch()
  const { isLoading, userData } = useSelector(state => ({
    isLoading: state.user.mobileSignLoading,
    userData: state.user.mobileSignData
  }));
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('+49')
  const [error, setError] = useState({})

  function openLogin() {
    close()
    setLoginModel(true)
  }

  function close() {
    closeModal()
    setError({})
    setPhone('')
    setCountry('')
  }

  function onSignUp(e) {
    e.preventDefault()
    let error = {}
    if (phone === '') {
      error.phone = 'Phone number is required'
    } else if (phone.length < 6) {
      error.phone = 'Invalid phone number'
    }
    if (country === '') {
      error.phone = 'Phone number is required'
    }
    setError(error)
    if(!Object.keys(error).length){
      dispatch({ type: 'SIGNUP_REQUEST',  payload: {"mobile": phone.replace(/[^0-9]/g, '')}})
    }
  }

  return (
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
              <span>{get(error, 'phone', '')}</span>
            }
            <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
            <button className="btn btn-continue" disabled={isLoading}>Continue</button>
          </form>
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
            <button>
              <Image
                src="/assets/svg/ic-email.svg"
                alt=""
                width={30}
                height={30}
              />
              <span>Continue with E-Mail</span>
            </button>
          </div>

          <p className="last-para">Already Have An Account?  <span onClick={openLogin}>Log In</span></p>
        </div>
      </Modal>
    </div>
  );
}

const otp = (otpModel, closeModal) => {
  const [sotp, setOtp] = useState('')
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
            onChange={(e)=> setOtp(e)}
            numInputs={4}
            className="otp-inp"
            // separator={<span>-</span>}
          />
          {/* <input type="text" className="otp-inp" />
          <input type="text" className="otp-inp" />
          <input type="text" className="otp-inp"/>
          <input type="text" className="otp-inp" /> */}
        </div>
          <p className="last-para">Didn’t got the code?  <span>Resend</span></p>
        </div>
      </Modal>
    </div>
  );
}

export default function Navbar() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { userData } = useSelector(state => ({
    userData: state.user.mobileSignData
  }));
  const [userLogged, setLoggedStatus] = useState(false);
  const [loginModel, setLoginModel] = useState(false);
  const [signUpModel, setSignUpModel] = useState(false);
  const [otpModel, setOtpModel] = useState(false);
  const [UserModel, setUserModel] = useState(false);

 useEffect(()=>{

  if(get(userData, 'success', false)){
    dispatch({ type: 'RESET' })
    setLoginModel(false)
    setSignUpModel(false)
    setOtpModel(true)
  }
 },[userData])

  const closeModal = () => {
    setOtpModel(false)
    setLoginModel(false)
    setSignUpModel(false)
  }

  const menuClicked = () => {
    setUserModel(true);
    if (userLogged) {
      //show userdata
    } else {
      //showButtons
    }
  };

  return (
    <div className="container">
      <div className="navbar hide-mob">
        <div onClick={() => router.push('/')} className="logo">
          <Image
            src="/assets/svg/logo.svg"
            alt="company logo"
            width={276}
            height={48}
          />
        </div>
        <ul className="menu">
          <li className="align-self-center">
            <Link href="/">
              Become A Handyman
            </Link>
          </li>
          {userLogged ? (
            <React.Fragment>
              <li className="align-self-center">
                <Link href="/">
                  My Bookings
                </Link>
              </li>
              <li className="align-self-center">
                <Link href="/">
                  Support
                </Link>
              </li>
              <li className="align-self-center">
                <Link href="/">
                  Messages
                </Link>
              </li>
            </React.Fragment>
          ) : (
              <>
                <li className="align-self-center">
                  <Link href="/about">
                    About Us
                  </Link>
                </li>
                <li onClick={() => setLoginModel(true)} className="align-self-center">
                  Login
                </li>
                <li onClick={() => setSignUpModel(true)} className="align-self-center">
                  SignUp
                </li>
                <li onClick={() => setOtpModel(true)} className="align-self-center">
                  otp
                </li>
              </>
            )}

          <li>
            <button
              onClick={menuClicked}
              className="btn btn-primary btn-rounded login-button">
              <i className="fa fa-bars" aria-hidden="true"></i>
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </button>
          </li>
        </ul>
        {loginModal(loginModel, closeModal, setSignUpModel)}
        {signUpModal(signUpModel, closeModal, setLoginModel)}
        {otp(otpModel, closeModal)}
      </div>

      <div className="mob-menu-wrapper show-mob">
        <header>
          <Image
            src="/assets/svg/logo.svg"
            alt="company logo"
            width={180}
            height={31}
          />
          <Image
            src="/assets/svg/ic-menu.svg"
            alt="company logo"
            width={34}
            height={34}
          />
        </header>
        <ul className="hide">
          <li className="align-self-center">
            <Link href="/">
              <a>Become A Handyman</a>
            </Link>
          </li>
          <li className="align-self-center">
            <Link href="/">
              <a>My Bookings</a>
            </Link>
          </li>
          <li className="align-self-center">
            <Link href="/">
              <a>Support</a>
            </Link>
          </li>
          <li className="align-self-center">
            <Link href="/">
              <a>Messages</a>
            </Link>
          </li>
          <li onClick={() => setLoginModel(true)} className="align-self-center">
            <a>Login</a>
          </li>
          <li onClick={() => setSignUpModel(true)} className="align-self-center">
            <a>SignUp</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
