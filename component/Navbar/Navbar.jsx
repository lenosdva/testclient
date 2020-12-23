import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function Navbar() {
  const [userLogged, setLoggedStatus] = useState(false);
  const [userModel, setUserModel] = useState(true);

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
            <li className="align-self-center">
              <Link href="/">
                <a>About Us</a>
              </Link>
            </li>
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
      </div>
    </div>
  );
}
