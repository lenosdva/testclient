import Reviews from "../Reviews/Reviews";
import Image from "next/image";
import ServiceCard from "../ServiceCard/ServiceCard";
import { withTranslation } from "../../constent/i18n/i18n"
import { get } from "lodash"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useCallback } from "react";
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const renderService = (movingOutData, user) => (
  movingOutData && movingOutData.length && movingOutData.filter(card => card.status == 'active').map((data, key) => (
    <div key={key} className="col-md-6">
      <ServiceCard data={data} userInfo={user} />
    </div>
  ))
)

function getExtension(filename) {
  return filename.split('.').pop()
}

function ProfileGigsWithReview(props) {
  console.log("PROPS=======>", props)
  const [certificate, setCertificate] = useState(false)
  const [workingLicence, setWorkingLicence] = useState(false)
  const [openCertificate, setOpenCertificate] = useState(false)
  const [openWorkingLicence, setOpenWorkingLicence] = useState(false)

  const { userData, handyman } = useSelector(state => ({
    userData: state.user.user,
    handyman: state.handyman.hyndyman
  }));


  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  useEffect(() => {
    setCertificate(get(props, 'user.handyman_application.proof[1].visible', false))
    setWorkingLicence(get(props, 'user.handyman_application.proof[0].visible', false))
  }, [props])

  function OpenCert() {
    if(workingLicence && openWorkingLicence) {
      setOpenWorkingLicence(false)
    }    
    setOpenCertificate(!openCertificate)
  }
  function OpenWorking() {
    if(certificate && openCertificate) {
      setOpenCertificate(false)
    }    
    setOpenWorkingLicence(!openWorkingLicence)
  }
  return (
    <div className="profile-gigs col">
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <div className="profile-card m-2 p-4 d-flex flex-column align-items-center ">
            <div className="report d-flex align-items-center justify-content-end mb-3">
              <img
                src='/assets/images/report.png'
                alt="handyman1"
                layout="responsive"
                //width={200}
                //height={200}
              />
              <h5 className="ml-2 title">{props.t("profileGig.title")}</h5>
            </div>
            <div className="image-area mb-3">
              <img
                src={get(props, 'user.profilePic.url', '/assets/images/profile-pic.png')}
                alt="handyman1"
                layout="responsive"
                width={200}
                height={200}
              />
            </div>
            <div className="certificated d-flex"><h3>{get(props, 'user.handyman_application.companyName', '')}</h3>
            {certificate && 
            <img
                src='/assets/images/sertificated.png'
                alt="handyman1"
                layout="responsive"
                className="cert"
                //width={200}
                //height={200}
              />
            }</div>
            <p>{get(props, 'user.handyman_application.description', 'Your very own python geek')}</p>
            {/*
            <div className="rating-star d-flex ">
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <div className="mr-2">
                <i className="fa fa-star " aria-hidden="true"></i>
              </div>
              <p>
                4.3<span>(140 Reviews)</span>
              </p>
            </div>
            */}
            <button className="btn btn-primary h5">{props.t("profileGig.contactMe")}</button>
          
            <div className="d-flex mt-4 social">
            {get(props, 'user.handyman_application.facebook', '') &&
              <a href={`https://facebook.com/${get(props, 'user.handyman_application.facebook', '')}`}>
                    <img
                      src='/assets/images/facebook.png'
                      alt="facebook"
                      layout="responsive"
                      style={{ width: 40, height: 40, borderRadius: 75 }}
                    />
              </a>
            }
            {get(props, 'user.handyman_application.instagram', '') &&
              <a href={`https://instagram.com/${get(props, 'user.handyman_application.instagram', '')}`}>
                    <img
                      src='/assets/images/inst.png'
                      alt="facebook"
                      layout="responsive"
                      style={{ width: 40, height: 40, borderRadius: 75 }}
                    />
              </a>
            }
            {get(props, 'user.handyman_application.linkedin', '') &&
              <a href={`https://linkedin.com/${get(props, 'user.handyman_application.linkedin', '')}`}>
                    <img
                      src='/assets/images/linkedin.png'
                      alt="facebook"
                      layout="responsive"
                      style={{ width: 40, height: 40, borderRadius: 75 }}
                    />
              </a>
            }
            {get(props, 'user.handyman_application.xing', '') &&
              <a href={`https://xing.com/${get(props, 'user.handyman_application.xing', '')}`}>
                    <img
                      src='/assets/images/xing.png'
                      alt="facebook"
                      layout="responsive"
                      style={{ width: 40, height: 40, borderRadius: 75 }}
                    />
              </a>
            }
            {get(props, 'user.handyman_application.youtube', '') &&
              <a href={`https://youtube.com/${get(props, 'user.handyman_application.youtube', '')}`}>
                    <img
                      src='/assets/images/youtube.png'
                      alt="facebook"
                      layout="responsive"
                      style={{ width: 40, height: 40, borderRadius: 75 }}
                    />
              </a>
            }
            </div>
            <div className="mb-3 mt-3 horizontal-line"></div>
            <div className="d-flex flex-column">
              <div className="mr-2 d-flex">
                <p className="light left-title">{props.t("profileGig.from")}</p>
                <h5>{get(props, 'user.handyman_application.location', '')}</h5>
              </div>
              <div className="d-flex align-items-start justify-content-center">
                <p className="light left-title">{props.t("profileGig.memberSince")}</p>
                <h5>{moment(get(props, 'user.handyman_application.createdAt', '')).format('MMM YYYY')}</h5>
              </div>
            </div>
            <div className="mt-3 mb-3 horizontal-line"></div>
            <div className="licence">
              {certificate && <a onClick={() => OpenCert()}>Sertificate</a>} {workingLicence && <a onClick={() => OpenWorking()}>License</a>}
                <div>
                  {openCertificate && 
                    (getExtension(get(props, 'user.handyman_application.proof[1].document.url', '')).toLowerCase() === "pdf" ?
                      <Document file={get(props, 'user.handyman_application.proof[1].document.url', '')} onLoadSuccess={onDocumentLoadSuccess} className="pdf">
                        <Page pageNumber={pageNumber} />
                      </Document>
                    :
                    <img
                      src={get(props, 'user.handyman_application.proof[1].document.url', '')}
                      alt="handyman1"
                      layout="responsive"
                      //width={200}
                      //height={200}
                    />)
                    
                  }
                  {openWorkingLicence &&
                    (getExtension(get(props, 'user.handyman_application.proof[0].document.url', '')).toLowerCase() === "pdf" ?
                    <Document file={get(props, 'user.handyman_application.proof[0].document.url', '')} onLoadSuccess={onDocumentLoadSuccess} className="pdf">
                        <Page pageNumber={pageNumber}  className="pdf" />
                      </Document>
                    :
                    <img
                    src={get(props, 'user.handyman_application.proof[0].document.url', '')}
                    alt="handyman1"
                    layout="responsive"
                    //width={200}
                    //height={200}
                  />)
                  }
                </div>
            </div>            
            {(certificate || workingLicence) && <div className="mt-3 mb-3 horizontal-line"></div>}
            <p className="text-justify mt-3">
              {props.t("profileGig.text")}
            </p>
          </div>
        </div>

        <div className="col-lg-8 col-md-12 col-sm-12">
          <div className="gigs pl-5 gigsp">
            <div className="gigs-title d-flex align-items-center justify-content-between flexwrap">
              <h3 className="secondary">{get(handyman, 'companyName', '')}'s Gigs</h3>
{/*
              <div className="d-flex align-items-center justify-content-end flex-wrap">
                <div>
                  <button className="btn m-2 d-flex align-items-center justify-content-center">
                    <i className="fa fa-share-square" aria-hidden="true"></i>
                    <h4 className="ml-2">Share</h4>
                  </button>
                </div>
                <div>
                  <button className="btn m-2 d-flex align-items-center justify-content-center">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <h4 className="ml-2">Save</h4>
                  </button>
                </div>
              </div>
*/}
            </div>
            <div className="row">
              {renderService(get(props, 'moreServiceData', []), get(props, 'user', []))}
              {/* <div className="col-md-6">
                <ServiceCard />
              </div>
              <div className="col-md-6">
                <ServiceCard />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ServiceCard />
              </div>
              <div className="col-md-6">
                <ServiceCard />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/*
      <div className="row">
        <div className="reviews p-5 col">
          <div className="row ">
            <div className="col">
              <Reviews />
            </div>
            <div className="col">
              <Reviews />
            </div>
          </div>
          <div className="row ">
            <div className="col">
              <Reviews />
            </div>
            <div className="col">
              <Reviews />
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
export default withTranslation('common')(ProfileGigsWithReview)