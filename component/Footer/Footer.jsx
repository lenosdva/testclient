import Image from "next/image";
import Link from 'next/link'

export default function Footer() {
    return (
        <div className='footer d-flex flex-column'>
            <div className='p-5 d-flex justify-content-center'>
                <div className='branding p-3'>
                    <div className="logo">
                        <Image
                            src="/assets/svg/logo.svg"
                            alt="company logo"
                            width={276}
                            height={48}
                        />
                    </div>
                    <h3>For the best Handymen service experience in Deutschland.</h3>
                </div>
                <div className='services d-flex justify-content-between align-item-start'>
                    <div className='mr-2 ml-2 d-flex align-items-start flex-column'>
                        <h4 className='title mb-5'>Services</h4>
                        <p>Cleaning</p>
                        <p>Electronics</p>
                        <p>Restoration</p>
                        <p>Computer Setup</p>
                        <p>Other Services</p>
                    </div>
                    <div className='mr-2 ml-2 d-flex align-items-start flex-column'>
                        <h4 className='title mb-5'>Follow Us</h4>
                        <a href="/" target="_blank" className="links">Facebook</a>
                        <a href="/" target="_blank" className="links">Twitter</a>
                        <a href="/" target="_blank" className="links">Instagram</a>
                        <a href="/" target="_blank" className="links">LinkedIn</a>
                    </div>
                    <div className='mr-2 ml-2 d-flex align-items-start flex-column'>
                        <h4 className='title mb-5'>Contact Us</h4>
                        <p>contact@deinhausman.de</p>
                    </div>
                </div>
            </div>
            <div className='copyright-policy d-flex justify-content-around align-item-center'>
                <p>Service with love &#169; Dein Hausman 2020. All Rights Reserved.</p>
                <div>
                    <a href="/" target="_blank" className="links" className="links mr-5 ml-5">Claim</a>
                    <a href="/" target="_blank" className="links" className="links mr-5 ml-5">Privacy</a>
                    <a href="/" target="_blank" className="links" className="links mr-5 ml-5">Terms</a>
                </div>
            </div>
        </div>
    );
}