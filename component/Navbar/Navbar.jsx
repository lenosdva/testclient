import Link from 'next/link';
import Image from 'next/image';

// import "./Navbar.scss";

export default function Navbar() {
  return (
    <div className="container">
      <div className="navbar d-flex justify-content-between">
        <div className="logo">
        <Image
          src="/assets/svg/logo.svg"
          alt="company logo"
          // layout="responsive"
          width={276}
          height={48}
        />
        </div>
        <ul className="menu d-flex text-center justify-content-end">
          <li className="align-self-center">
            <Link href="/">
              <a>Become A Handyman</a>
            </Link>
          </li>
          <li className="align-self-center">
            <Link href="/">
              <a>About Us</a>
            </Link>
          </li>
          <li>
            <button className="login-button">
              <i className="fa fa-bars" aria-hidden="true"></i>
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
};