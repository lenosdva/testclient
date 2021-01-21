import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Modal from 'react-modal';

const loginModal = (loginModel, closeModal) => (
  <div className="modal-wrapper">
    <Modal
      isOpen={loginModel}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Example Modal"
      className="modal-wrapper-sm"
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
        <h4>Sign In</h4>
      </header>
      <div className="modalbody">
        <form>
          <div className="box">
            <div className="form-group">
              <div className="p-lr">
                <input type="text" id="name" className="field-input" required />
                <label className="form-control-placeholder" for="name">Country/Region</label>
              </div>
            </div>
            <div className="form-divider"></div>
            <div className="form-group">
              <div className="p-lr">
                <input type="text" id="text" className="field-input" required />
                <label className="form-control-placeholder" for="text">Phone Number</label>
              </div>
            </div>
          </div>

          <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
          <button className="btn btn-continue">Continue</button>

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

          <p className="last-para">Don’t Have An Account? <a href="">Sign Up</a></p>
        </form>
      </div>
    </Modal>
  </div>
);

const signUpModal = (signUpModel, closeModal) => (
  <div className="modal-wrapper">
  <Modal
    isOpen={signUpModel}
    onRequestClose={closeModal}
    // style={customStyles}
    contentLabel="Example Modal"
    className="modal-wrapper-sm"
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
        <h4>Sign Up</h4>
      </header>
      <div className="modalbody">
        <form>
          <div className="box">
            <div className="form-group">
              <div className="p-lr">
                <input type="text" id="name" className="field-input" required />
                <label className="form-control-placeholder" for="name">Country/Region</label>
              </div>
            </div>
            <div className="form-divider"></div>
            <div className="form-group">
              <div className="p-lr">
                <input type="text" id="text" className="field-input" required />
                <label className="form-control-placeholder" for="text">Phone Number</label>
              </div>
            </div>
          </div>

          <p>We will call you to confirm your number. Standard message and data rates may apply.</p>
          <button className="btn btn-continue">Continue</button>

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

          <p className="last-para">Already Have An Account?  <a href="">Log In</a></p>
        </form>
      </div>
  </Modal>
  </div>
);

export default function Navbar() {
  const [userLogged, setLoggedStatus] = useState(false);
  const [loginModel, setloginModel] = useState(false);
  const [signUpModel, setSignUpModel] = useState(false);
  const [UserModel, setUserModel] = useState(false);

  const closeModal = () => {
    setloginModel(false)
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
      <div className="navbar">
        <div className="logo">
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
              <a>Become A Handyman</a>
            </Link>
          </li>
          {userLogged ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : (
              <>
                <li className="align-self-center">
                  <Link href="/">
                    <a>About Us</a>
                  </Link>
                </li>
                <li onClick={() => setloginModel(true)} className="align-self-center">
                  <a>Login</a>
                </li>
                <li onClick={() => setSignUpModel(true)} className="align-self-center">
                  <a>SignUp</a>
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
        {loginModal(loginModel, closeModal)}
        {signUpModal(signUpModel, closeModal)}
      </div>
    </div>
  );
}
