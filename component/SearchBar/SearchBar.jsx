import { useState } from "react"
import Image from "next/image";

export default function SearchBar() {
  const [showAddress, setAddress] = useState('hide')
  const [showService, setService] = useState('hide')
  return (
    <div className="searchbar d-flex justify-content-between align-items-center">
      <div className="search-area pl-4 d-flex justify-content-around align-items-center">
        <div className="postal-code mr-2">
          <h5 className="mb-0">Postal Code</h5>
          <input type="search" onBlur={()=> setAddress('hide')} onFocus={()=> setAddress('show')} className="input-search" placeholder="Munich, Germany 80331" />
          <div className={showAddress === 'hide' ? "searching-keywords" : "searching-keywords searching-keywords-show"}>
            <ul>
              <li>
                <div className="search-keywords-img">
                  <Image
                    src="/assets/images/search-img.png"
                    alt="search"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="search-keywords-txt">
                  <h5>80331</h5>
                  <h6>Munich, Germany</h6>
                </div>
              </li>
              <li>
                <div className="search-keywords-img">
                  <Image
                    src="/assets/images/search-img.png"
                    alt="search"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="search-keywords-txt">
                  <h5>80331</h5>
                  <h6>Munich, Germany</h6>
                </div>
              </li>
              <li>
                <div className="search-keywords-img">
                  <Image
                    src="/assets/images/search-img.png"
                    alt="search"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="search-keywords-txt">
                  <h5>80331</h5>
                  <h6>Munich, Germany</h6>
                </div>
              </li>
              <li>
                <div className="search-keywords-img">
                  <Image
                    src="/assets/images/search-img.png"
                    alt="search"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="search-keywords-txt">
                  <h5>80331</h5>
                  <h6>Munich, Germany</h6>
                </div>
              </li>
              <li>
                <div className="search-keywords-img">
                  <Image
                    src="/assets/images/search-img.png"
                    alt="search"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="search-keywords-txt">
                  <h5>80331</h5>
                  <h6>Munich, Germany</h6>
                </div>
              </li>
            </ul>
          </div>
          {/* <h5 className="postal-value">Munich, Germany 80331</h5> */}
        </div>
        <div className="vertical-bar mr-2"></div>
        <div className="service mr-2">
          <h5 className="mb-0">Pick a Service</h5>
          {/* <h5 className="service-value">What can we assist you with ?</h5> */}
          <input type="search" onBlur={()=> setService('hide')} onFocus={()=> setService('show')} className="input-search" placeholder="What can we assist you with?" />
          <div className={showService === 'hide' ? "searching-keywords": "searching-keywords searching-keywords-show"}>
            <ul>
              <li>Moving Out Service</li>
              <li>Transportation</li>
              <li>Electro Installation & Repair</li>
              <li>Kitchen Setup, Removal & Repair</li>
              <li>Bathroom Installation / Repair</li>
              <li>Restoration</li>
              <li>Home Heating & Cooling Solutions</li>
              <li>TV Setup, Installation & Repair</li>
              <li>Computer Setup, Installation & Repair</li>
              <li>Gardenwork</li>
              <li>Waste Disposal Solutions</li>
              <li>Cleaning Work</li>
              <li>Other Services</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="icon-area">
        <button className="btn btn-primary">
          <span className="hidemobile">
          <Image
            src="/assets/svg/ic-search.svg"
            alt="search"
            width={26}
            height={26}
          />
          </span>
          <span className="showmobile">Search</span>
        </button>
      </div>
    </div>
  );
}
