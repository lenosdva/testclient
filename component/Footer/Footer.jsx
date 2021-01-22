import Image from "next/image";
import Link from 'next/link'

export default function Footer() {
    return (
        <div className='footer d-flex flex-column'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="left-sec">
                            <Image
                                src="/assets/svg/logo-white.svg"
                                alt="company logo"
                                width={276}
                                height={75}
                            />
                            <h3>For the best handymen service experiences in Deutschland.</h3>
                        </div>
                        <div className="right-sec">
                            <ul>
                                <li>
                                    <h5>Services</h5>
                                    <a href="">Cleaning</a>
                                    <a href="">Electronic</a>
                                    <a href="">Restoration</a>
                                    <a href="">Computer Setup</a>
                                    <a href="">Other Services</a>
                                </li>
                                <li>
                                    <h5>Follow Us</h5>
                                    <a href="">Facebook</a>
                                    <a href="">Twitter</a>
                                    <a href="">Instagram</a>
                                    <a href="">Linkedln</a>
                                </li>
                                <li>
                                    <h5>Contact Us</h5>
                                    <a href="">contact@deinhausman.de</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 footer-btm">
                        <div className="left-sec">
                            <p>Service with love © Dein Hausman 2021. All Rights Reserved</p>
                        </div>
                        <div className="right-sec">
                            <a href="">Claim</a>
                            <a href="">Privacy</a>
                            <a href="">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}