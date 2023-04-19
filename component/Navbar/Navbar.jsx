import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownButton } from 'reactstrap';
import Modal from 'react-modal';
import { useRouter } from 'next/router'
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { get } from 'lodash'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cookie from 'cookie-cutter';
import Moment from 'moment';
import { loginModal } from "../loginModal/loginModal"
import { signUpModal } from "../signUpModal/signUpModal"
import { PaySubModule } from "../PaySubModule/PaySubModule"
import { AprrovedNot } from "../AprrovedNot/AprrovedNot"
import { AprrovedFree } from "../AprrovedFree/AprrovedFree"
import {Dropdown as DropdownB} from 'react-bootstrap';
import {DropdownButton as DropdownButtonB} from 'react-bootstrap';


import { forgotPassword } from "../ForgetPassword/ForgetPassword"
import { otp } from "../otp/otp";

export default function Navbar(props) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [engMenu, setEngMenu] = useState(false);
  

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const engToggle = () => setEngMenu(prevState => !prevState);
  

  const dispatch = useDispatch()
  const router = useRouter()
  const { user, userLoading, needLogin, userData, otpData, emailSignData, mobileLoginData, emailLoginData, getNotification, mobileSignData, forgetPassword, handyman, updateHyndymanLoading, handymanLoading } = useSelector(state => ({
    userData: state.user.mobileSignData,
    otpData: state.user.otpData,
    user: state.user.user,
    emailSignData: state.user.emailSignData,
    mobileLoginData: state.user.mobileLoginData,
    emailLoginData: state.user.emailLoginData,
    mobileSignData: state.user.mobileSignData,
    needLogin: state.user.needLogin,
    getNotification: state.services.notification,
    forgetPassword: state.user.forgetPassword,
    handyman: state.handyman.hyndyman,
    updateHyndymanLoading: state.handyman.updateLoading,
    handymanLoading: state.handyman.hyndymanLoading,
    userLoading: state.user.userLoading
  }));
  const [userLogged, setLoggedStatus] = useState(false);
  const [loginModel, setLoginModel] = useState(false);
  const [signUpModel, setSignUpModel] = useState(false);
  const [otpModel, setOtpModel] = useState(false);
  const [paySubModel, setPaySubModel] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showMessage, setMessage] = useState(false);
  const [forgetModel, setForgetModel] = useState(false)
  const [error, setError] = useState({});
  const [handymanStatus, setHandymanStatus] = useState('');
  const [handymanApproved, setHandymanApproved] = useState('');
  const [handymanApprovedNotification, setHandymanApprovedNotification] = useState(false);
  const [approvedFree, setApprovedFree] = useState(false);

  const [isHandyman, setIsHandyman] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBecomeHandyman, setIsBecomeHandyman] = useState(false);

  const mobileMenuRef = useRef();

  function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setError({})
  }, [loginModel, signUpModel, otpModel, forgetModel])

  useEffect(() => {    
    if (get(user, 'code', false) === 401) {
      if (userLogged === true) {
        setLoggedStatus(false)
        localStorage.clear()
      }
    } else {
      dispatch({ type: 'GET_NOTIFICATION' })
      if(get(user, 'handyman_application', false)){  
        const data = {}
        data.id = get(user, 'handyman_application', null);        
        dispatch({ type: 'GET_HYNDYMAN', payload: data });
        setIsBuyer(get(user, 'buyer', false));
        console.log("USER: ", user)
      }
    }
  }, [user, updateHyndymanLoading, userLoading])

  useEffect(() => {    
    if (userLogged) {
      props.setWebSoket()
    }
    dispatch({ type: 'GET_USER' })
    setIsBuyer(get(user, 'buyer', false));
    
  }, [userLogged])

  useEffect(() => {
    if(get(handyman, 'status', false)){
      setHandymanStatus(get(handyman, 'status', ''));
      setHandymanApproved(get(handyman, 'sendNotification', ''));
      setIsHandyman(true);
      if(get(handyman, 'status', '') == "approved" && get(handyman, 'sendNotification', '') == "not") {          
        setHandymanApprovedNotification(true);
        const dataH = {};
        dataH.id = get(handyman, 'id', '')
        dataH.sendNotification = 'sent';
        dispatch({ type: "UPDATE_HYNDYMAN", payload: dataH });
      } else {
        pause(5000).then(console.log("HERE AM"))
                
        if(!approvedFree && !handymanApprovedNotification && (get(handyman, 'sendTrial', 'not') == "not") && (get(handyman, 'status', '') == "approved") && (get(handyman, 'freeTrial', '') == '' || get(handyman, 'freeTrial', '') == null || get(handyman, 'freeTrial', '') == undefined)) {
          const idI = get(handyman, 'id', '');
          if(idI != '') {
            let url = 'https://strapi.deinhausmann.com/handyman-applications/' + idI;
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                    if(data.freeTrial == '' || data.freeTrial == null || data.freeTrial == underfined) {
                      console.log("MY IDDDD1: ", data.freeTrial)
                      setPaySubModel(true)
                    }
                }
              )
          }
          
        }
      }
      

    }
    
  }, [handymanLoading])

  useEffect(() => {    
      setHandymanStatus(get(handyman, 'status', ''));
      setHandymanApproved(get(handyman, 'sendNotification', ''));
      if(get(handyman, 'status', false)){
        setIsHandyman(true);
      }
        
  }, [handymanStatus])

  useEffect(() => {

    if (localStorage.getItem('token') !== null) {
      setLoggedStatus(true)
    }
    dispatch({ type: 'GET_USER' })
    setIsHandyman(get(user, 'handyman_application', null) != null)
      
  }, [])

  useEffect(() => {
    if (needLogin === true) {
      dispatch({ type: 'LOGIN_RESET' })
      setLoginModel(true)
    }
  }, [needLogin])

  useEffect(() => {
    dispatch({ type: 'GET_USER' })
    setIsHandyman(get(user, 'handyman_application', null) != null)
    if (get(userData, 'success', false)) {
      dispatch({ type: 'RESET_LOG' })
      setLoginModel(false)
      setSignUpModel(false)
      if (get(userData, 'user.phone', false)) {
        setMobile(userData.user.phone)
        setOtpModel(true)
      }
    }
    if (get(userData, 'success', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(userData, 'message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(userData, 'message', 'Please try again'))
    }
    if (get(otpData, 'jwt', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(otpData, 'jwt', {})))
        localStorage.setItem('user', JSON.stringify(get(otpData, 'user', {})))
        setOtpModel(false)
        setLoggedStatus(true)
        if (get(otpData, 'user.fname', '') === '') {
          if(isBecomeHandyman) {
            router.push('/handyman-registration/')
          } else {
            router.push('/profilemanagement')
          }
          
        }
      }
    }

    if (get(emailSignData, 'error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(emailSignData, 'message[0].messages[0].message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(emailLoginData, 'message', 'Please try again'))
    }

    if (get(emailSignData, 'jwt', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(emailSignData, 'jwt', {})))
        localStorage.setItem('user', JSON.stringify(get(emailSignData, 'user', {})))
        setSignUpModel(false)
        setLoginModel(false)
        setLoggedStatus(true)
        if (get(emailSignData, 'user.name', '') === '') {
          if (get(emailSignData, 'user.socialLogin', false)) {
            if(isBecomeHandyman) {
              router.push('/handyman-registration/')
            } else {
              router.push('/profilemanagement')
            }
          } else {
            if(isBecomeHandyman) {
              router.push('/handyman-registration/')
            } else {
              router.push('/profilemanagement')
            }
          }
        }
      }
    }

    if (get(mobileLoginData, 'result.error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(mobileLoginData, 'result.message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(mobileLoginData, 'result.message', 'Please try again'))
    }

    if (get(mobileLoginData, 'error', false)) {
      dispatch({ type: 'RESET_LOG' })
      const error = {}
      error.serverError = get(mobileLoginData, 'message', 'Please try again')
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
      error.serverError = get(emailLoginData, 'message[0].messages[0].message', 'Please try again')
      setError(error)
      // NotificationManager.error('Error message', get(emailLoginData, 'message', 'Please try again'))
    }

    if (get(emailLoginData, 'jwt', false)) {
      dispatch({ type: 'RESET_LOG' })
      if (typeof window !== "undefined") {
        localStorage.setItem('token', JSON.stringify(get(emailLoginData, 'jwt', {})))
        localStorage.setItem('user', JSON.stringify(get(emailLoginData, 'user', {})))
        setLoginModel(false)
        setLoggedStatus(true)
        if (get(emailLoginData, 'user.fname', '') === '') {          
          if(isBecomeHandyman) {
            router.push('/handyman-registration/')
          } else {
            router.push('/profilemanagement')
          }
        } else {
          if(isBecomeHandyman) {
            router.push('/handyman-registration/')
          } else {
            router.push('/profilemanagement')
          }
        }
      }

    }    

  }, [userData, otpData, emailSignData, mobileLoginData, emailLoginData, mobileSignData])

  const closeModal = () => {
    setOtpModel(false)
    setLoginModel(false)
    setSignUpModel(false)
    setForgetModel(false)
  }

  function signOut() {
    localStorage.clear()
    cookie.set('token', '/')
    cookie.set('expires', '')
    cookie.set('path', '/')
    dispatch({ type: 'RESET_USER' })
    setLoggedStatus(false)
    router.push('/')
  }
  

  const renderNotification = () => (
    getNotification && getNotification.length && getNotification.map((data, key) => (
      <li key={key}>
        <div className="bell-bg">
          <Image
            src="/assets/svg/ic-bell.svg"
            alt=""
            height={40}
            width={46}
          />
        </div>
        <div className="bell-txt">
          <h4>{get(data, 'userId', '')}</h4>
          {get(data, 'contentType', '') === "customOrder" ?
            <p>{get(JSON.parse(get(data, 'description', {})), 'msg', '')}</p>
            :
            <p>{get(data, 'description', '')}</p>
          }
          <h6>{Moment(get(data, 'createdAt', null)).format('Do MMMM YYYY, hh:mm:ss a')}</h6>
        </div>
      </li>
    ))
  )
  //console.log("user", user)
  //console.log("user", user.profilePic.url)
  //console.log("PROPS: ", props)
  function myLocation() {
    //const location = useLocation();
    //console.log("LINK: ", location.pathname);
    //console.log("LINK1: ", (location.pathname === "/payments"));
    //return location.pathname;
  }
  function changeLang() {
    
  }

  function setAbecomeModel() {
    setSignUpModel(true) 
    setIsBecomeHandyman(true)
  }

  const closeOpenMenus = useCallback(
    (e) => {
      if (
        mobileMenuRef.current &&
        menu &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setMenu(false);
      }
    },
    [menu]
  );

  const closeNotification = useCallback(
    (e) => {
      if (
        mobileMenuRef.current &&
        menu &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setHandymanApprovedNotification(false);
      }
    },
    [handymanApprovedNotification]
  );


  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
  }, [closeOpenMenus]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = menu ? "hidden" : "auto";
    }
  }, [menu]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = engMenu ? "hidden" : "auto";
    }
  }, [engMenu]);

  const switchTo = (e) => {
      e.preventDefault();
      const data = {}
      let link = '/';
      data.id = get(user, 'id', '')
      if(isBuyer) {
        setIsBuyer(false);
        data.buyer = false;
        link = "/handyman-dashboard";        
      } else {
        setIsBuyer(true);
        data.buyer = true;
        link = "/category-services";  
      }      
      dispatch({ type: 'UPDATE_USER', payload: data })
      router.push(link)
  }

  
  

  return (
    <div className="container">
      <div className="navbar hide-mob">
        <div onClick={() => router.push('/')} className="logo pointer">
          <Image
            //src="/assets/svg/logo.svg"
            src="/assets/images/logo.png"
            alt="company logo"
            width={276}
            height={48}
          />
        </div>
        <ul className="menu">
          {(!isHandyman || isBuyer) &&
            <li className={"align-self-center " +  ((myLocation() == "/handyman-registration") ? "tl": "")}>
              {userLogged ?
                <Link href="/category-services">
                  Find a Handyman
                </Link>
                :
                <span onClick={() => setAbecomeModel()}> Become A Handyman</span>
              }
            </li>           
          }
          {userLogged ? (
            <React.Fragment>
              {(isHandyman && !isBuyer) &&
                  <li className={"align-self-center " +  ((myLocation() == "/handyman-registration-services") ? "tl": "")}>
                    <Link href="/my-services">
                      My Services
                  </Link>
                  </li>
              }
              <li className={"align-self-center " +  ((myLocation() == "/client-dashboard") ? "tl": "")}>
              {(isHandyman && !isBuyer) ?
                <Link href="/handyman-dashboard">
                  My Dashboard
                </Link>
                :
                <Link href="/client-dashboard">
                  My Dashboard
                </Link>
              }
              </li>
             {get(user, 'role', '') === "handyman" &&
                <li className={"align-self-center " +  ((myLocation() == "/handyman-registration-list") ? "tl": "")}>
                  <Link href="/earnings">
                    Earnings
                </Link>
                </li>
              }
              <li className={"align-self-center " +  ((myLocation() == "/payments") ? "tl": "")}>
                {userLogged ?
                  <Link href="/inbox">
                  Orders
                  </Link>
                  :
                  <Link href="/about">
                    About Us
                  </Link>
                }
              </li>              
            </React.Fragment>
          ) : (
            <>
              <li className="align-self-center">
                <Link href="/about">
                  About Us
                  </Link>
              </li>
            </>
          )} 

          <li>

          
          
          <div className="togglewrapper-lang">
            <DropdownButtonB id="" title="De" className="">
                  <DropdownB.Item onClick={changeLang}>Deutsch</DropdownB.Item>
                  <DropdownB.Item onClick={changeLang}>English</DropdownB.Item>
          </DropdownButtonB>
            </div>

          </li> 
            

          <li>
            <div className="togglewrapper">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle>
                  <i className="fa fa-bars menubar" aria-hidden="true"></i>
                  <img
                    src={get(user, 'profilePic.url', '') === '' ? '/assets/svg/ic-menu-profile.svg' : user.profilePic.url}
                    alt=""
                    width={34}
                    height={34}
                    className="profile-pic-circle"
                  />
                </DropdownToggle>

                {!userLogged &&
                  <>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setSignUpModel(true)}>Sign Up</DropdownItem>
                      <DropdownItem onClick={() => setLoginModel(true)}>Log In</DropdownItem>
                    </DropdownMenu>
                  </>
                }

                {(userLogged && (!isHandyman)) &&
                  <>
                    <DropdownMenu className="profilebox">
                      <DropdownItem>
                        <ul className="dd-menu1">
                          <li>
                            <div onClick={() => router.push('/profilemanagement')}>

                              <img
                                src={get(user, 'profilePic.url', '') === '' ? '/assets/svg/ic-menu-profile.svg' : user.profilePic.url}
                                alt=""
                                width={80}
                                height={80}
                                className="profile-pic-circle"
                              />
                            </div>
                            <h4 onClick={() => router.push('/profilemanagement')}>{get(user, 'fname', '')}</h4>
                            <h6 onClick={() => router.push('/profilemanagement')}>{get(user, 'email', '')}</h6>
                            <Link href='/profilesaved'><button className="btn btn-manage">Your Account</button></Link>
                            <div className="divi"></div>
                            <p className="text-center"><Link href='/payments'>My Payments</Link></p>
                            <p className="text-center"><Link href='/handyman-registration'>Become A Handyman</Link></p>
                            <p onClick={signOut} className="text-center mb-2"><Link href='/handyman-registration'>Sign Out</Link></p>
                            {/* <p className="text-center"><Link href='/index'>Switch To Selling</Link></p> */}                            
                          </li>
                        </ul>
                      </DropdownItem>
                    </DropdownMenu>
                  </>
                }

                {(userLogged && (isHandyman)) &&
                  <>
                    <DropdownMenu className="profilebox">
                      <DropdownItem>
                        <ul className="dd-menu1">
                          <li>
                            <div onClick={() => router.push('/profilemanagement')}>

                              <img
                                src={get(user, 'profilePic.url', '') === '' ? '/assets/svg/ic-menu-profile.svg' : user.profilePic.url}
                                alt=""
                                width={80}
                                height={80}
                                className="profile-pic-circle"
                              />
                            </div>
                            <h4 onClick={() => router.push('/profilemanagement')}>{get(user, 'fname', '')}</h4>
                            <h6 onClick={() => router.push('/profilemanagement')}>{get(user, 'email', '')}</h6>
                            <Link href='/handyman-registration'><button className="btn btn-manage">Your Account</button></Link>
                            <div className="divi"></div>
                            {(userLogged && (isBuyer)) ?
                            <p className="text-center"><Link href='/payments'>My Payments</Link></p>
                            :
                            <p className="text-center"><Link href='/earnings'>My Earnings</Link></p>
                            }
                            {(userLogged && (!isBuyer)) &&
                            <p className="text-center"><Link href='/archive'>Archive</Link></p>
                            }
                            <p className="text-center"><a href='' onClick={switchTo}>{isBuyer ? "Switch to Selling" : "Switch to Buying"}</a></p>
                            <p onClick={signOut} className="text-center mb-2"><Link href='/'>Sign Out</Link></p>
                            {/* <p className="text-center"><Link href='/index'>Switch To Selling</Link></p> */}                            
                          </li>
                        </ul>
                      </DropdownItem>
                    </DropdownMenu>
                  </>
                }

              </Dropdown>
            </div>
          </li>
          <li>
          </li>
        </ul>
        {loginModal(loginModel, closeModal, setSignUpModel, error, setForgetModel)}
        {signUpModal(signUpModel, closeModal, setLoginModel, error)}
        {PaySubModule(paySubModel, setPaySubModel, approvedFree, setApprovedFree)}
        {AprrovedNot(handymanApprovedNotification, setHandymanApprovedNotification, paySubModel, setPaySubModel)}
        {AprrovedFree(approvedFree, setApprovedFree)}
        {otp(otpModel, closeModal, mobile, error)}
        {forgotPassword(forgetModel, closeModal, error, setForgetModel)}
      </div>

      <div className="mob-menu-wrapper show-mob">
        <header>
          <div onClick={() => router.push('/')} className="pointer">
            <Image
              //src="/assets/svg/logo.svg"
              src="/assets/images/logo.png"
              alt="company logo"
              width={180}
              height={31}
            />
          </div>         
          
          <div className="togglewrapper-lang">              
                  <DropdownButtonB id="" title="De" className="">
                        <DropdownB.Item onClick={changeLang}>Deutsch</DropdownB.Item>
                        <DropdownB.Item onClick={changeLang}>English</DropdownB.Item>
                  </DropdownButtonB>
            </div>

               
          <div onClick={() => setMenu(!menu)} className="mymenu pointer">
                  <i className="fa fa-bars menubar" aria-hidden="true"></i>
                  <img
                    src={get(user, 'profilePic.url', '') === '' ? '/assets/svg/ic-menu-profile.svg' : user.profilePic.url}
                    alt=""
                    width={24}
                    height={24}
                    className="profile-pic-circle"
                  />
          </div>
        </header>        
          {(userLogged && (!isHandyman)) && (
            <ul className={menu ? "dd-menu1-mob text-center" : 'hide'} ref={mobileMenuRef}>
            <li>
              <button onClick={() => setMenu(!menu)} className="close-btn">
                  <Image
                    src="/assets/svg/close-modal.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
            </li>
            <>
              <li>
              <Link href='/profilesaved'><button className="btn btn-manage">Your Account</button></Link>
              </li>           
              {get(user, 'role', '') !== "handyman" &&
                    <li className="align-self-center">
                      {userLogged ?
                        <Link href="/category-services">
                          Find a Handyman
                        </Link>
                        :
                        <span onClick={() => setLoginModel(true)}> Become A Handyman</span>
                      }
                    </li>
              }              
              {(isHandyman && handymanStatus == "approved") &&
                <li className="align-self-center">
                  <Link href="/my-services">
                    My Services
                </Link>
                </li>
              }{(isHandyman && handymanStatus == "approved") &&
                <li className="align-self-center">
                  <Link href="/earnings">
                    Earnings
                </Link>
                </li>
              }
              <li className="align-self-center">
                <Link href="/client-dashboard">
                  My Dashboard
                  </Link>
              </li>
              <li className="align-self-center">
                <Link href="/inbox">
                  Orders
                </Link>
              </li>
              <li className="align-self-center">
                <Link href="/payments">
                  <a>My Payments</a>
                </Link>
              </li>              
              {get(user, 'role', '') !== "handyman" &&
                <li className="align-self-center">
                  {userLogged ?
                    <Link href="/handyman-registration">
                      <a>Become A Handyman</a>
                    </Link>
                    :
                    <span onClick={() => setLoginModel(true)}> Become A Handyman</span>
                  }
                </li>
              }              
              <li className="align-self-center">
              <Link href="/"><a onClick={signOut}>Sign Out</a></Link>
              </li>
            </>
            </ul>
          )          
          }

          {(userLogged && (isHandyman)) && (
            <ul className={menu ? "dd-menu1-mob text-center" : 'hide'} ref={mobileMenuRef}>
            <li>
              <button onClick={() => setMenu(!menu)} className="close-btn">
                  <Image
                    src="/assets/svg/close-modal.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
            </li>
            <>
              <li>
              <Link href='/handyman-registration'><button className="btn btn-manage">Your Account</button></Link>
              </li>           
              <li className="align-self-center">
              {(userLogged && (!isBuyer)) ?
                  <Link href="/my-services">
                    My Services
                </Link>
                :
                <Link href="/category-services">
                  Find a Handyman
                </Link>
              }
                </li>
                <li className="align-self-center">
                {(userLogged && (!isBuyer)) ?
                  <Link href="/handyman-dashboard">
                    My Dashboard
                </Link>
                :
                <Link href="/client-dashboard">
                    My Dashboard
                </Link>
                }
                </li>
                <li className="align-self-center">
                {(userLogged && (!isBuyer)) ?
                  <Link href="/inbox">
                    Orders
                </Link>
                :
                <Link href="/inbox">
                    Orders
                </Link>
                }
                </li>
                <li className="align-self-center">
                {(userLogged && (!isBuyer)) ?
                  <Link href="/earnings">
                    My Earnings
                </Link>
                :
                <Link href="/payments">
                    My Payments
                </Link>
                }
                </li>
                {(userLogged && (!isBuyer)) &&
                <li className="align-self-center">
                  <Link href="/archive">
                    Archive
                </Link>
                </li>
                }
                <li className="align-self-center">
                  <a href=''  onClick={switchTo}>
                  {isBuyer ? "Switch to Selling" : "Switch to Buying"}
                </a>
                </li>     
              <li className="align-self-center">
              <Link href="/"><a onClick={signOut}>Sign Out</a></Link>
              </li>
            </>
            </ul>
          )          
          }
                    
          {!userLogged &&
            <ul className={menu ? "dd-menu1-mob text-center tt" : 'hide'} ref={mobileMenuRef}>
            <li>
            <button onClick={() => setMenu(!menu)} className="close-btn">
                <Image
                  src="/assets/svg/close-modal.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </li>
            <>   
                  
                  <li></li>
                    <li onClick={() => setSignUpModel(true)} className="align-self-center cursur-pointer ">
                      <a>Sign Up</a>
                    </li>
                    <li onClick={() => setLoginModel(true)} className="align-self-center cursur-pointer">
                      <a>Log In</a>
                    </li>
              
            </>
            </ul>
          }          
        
        <div className="sidebar-overlay"></div>
      </div>
    </div>
  );
}
