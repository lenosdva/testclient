import Image from "next/image";
import Link from "next/link"
import Reviews from "../Reviews/Reviews";
import ServiceCard from "../ServiceCard/ServiceCard";
import { get } from "lodash"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useCallback } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from "moment"
import { useRouter } from 'next/router'
import {FacebookShareButton , WhatsappShareButton ,   TwitterShareButton, EmailShareButton } from "react-share"
import {EmailIcon, FacebookIcon, WhatsappIcon, FacebookMessengerIcon, TwitterIcon} from "react-share";

const questions = [{
  type: "field",
  accept: "text",
  name: "What is your age?",
  required: true
}, {
  type: "option",
  options: ["India", "Germany"],
  name: "Select Country",
  required: true
}]

export default function PackingService(props) {
  const dispatch = useDispatch()
  const [formSubmit, setForm] = useState(false)
  const [wishList, setWishList] = useState(false)
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  

  
  const { inqueryForm, inqueryData, userData, userDataLoading } = useSelector(state => ({
    inqueryForm: state.services.inqueryForm,
    inqueryData: state.services.inqueryData,
    userData: state.user.user,
    userDataLoading: state.user.userLoading,
  }));

  const router = useRouter();
console.log("TUTUUUU: ", props)
const [saved, setSaved] = useState(get(userData, 'savedgigs', []).includes(get(props, 'gig.id', "1")))

  useEffect(() => {
    
}, [])

useEffect(() => {
  setSaved(get(userData, 'savedgigs', []).includes(get(props, 'gig.id', "1")))
}, [userDataLoading])


  const moreService = (user) => (
    get(props, 'gig.related', []).filter(card => (card.status == 'active' && card.id != get(props, 'gig.id', ''))).map((data, key) => (
      <div key={key} className="col-md-4">
        <ServiceCard data={data} userInfo={user} />
      </div>
    ))
  )

  function renderInputs() {
    const data = get(props, 'user', '')
    const form = (
      <>
          <input type="text" className="input small" placeholder="Name" />
              <input type="email" className="input small" placeholder="Email" />
              <div className="d-flex flexwrap">
                <input
                  type="text"
                  className="input mr-2"
                  placeholder="Shifting From?"
                />
                <input
                  type="text"
                  className="input ml-2"
                  placeholder="Shifting To?"
                />
              </div>
              <input
                type="text"
                className="input large"
                placeholder="Date of Service"
              />
              <input
                type="text"
                className="input large"
                placeholder="Time of Service"
              />
      </>      
    )
    return form
  }




  function submitForm(e) {
    e.preventDefault()
    setForm(true)
    const allInput = e.target.querySelectorAll('input, select, textarea')
    const input = Array.prototype.slice.call(allInput)
    const answers = {}
    input.map((data) => {
      answers[data.name] = (data.value)
    })
    //dispatch({ type: 'FORM_REQUEST', payload: { gig: get(props, 'gig._id', ''), initiate: answers } })
  }

  function Share(e) {
    e.preventDefault()
    const id = get(props, 'gig.id', "")
    if(id != "") {

      router.push(
        {
          pathname: '/share-gig',
          query: { id: id }
        }
      )
      
    }
  }

  

  function Save(e) {
    e.preventDefault()
    const id = get(props, 'gig.id', "")
    const userId = get(userData, 'id', "")
    const userSavedGigs = get(userData, 'savedgigs', [])
    if(userSavedGigs.includes(id)) {
      setSaved(false)
      const tempSavedGigs = []
      if(id != "" && userId != "") {
        userSavedGigs.forEach((item) => {
          if(item != id) {
            tempSavedGigs.push(item)
            console.log("ITEM: ", item)
          }
        });
        const data = {}
        data.savedgigs = tempSavedGigs
        data.id = userId
        dispatch({ type: 'UPDATE_USER', payload: data })  
        setSaved(false)
      }
    } else {
      if(id != "" && userId != "") {
        userSavedGigs.push(id)
        const data = {}
        data.savedgigs = userSavedGigs
        data.id = userId
        dispatch({ type: 'UPDATE_USER', payload: data })  
        setSaved(true)    
      }
    }    
  }
  

  useEffect(() => {
    if (get(inqueryData, 'error', false)) {
      dispatch({ type: 'RESET_FORM' })
      if (get(inqueryData, 'message', 'Please try again') === "No Auth Token") {
        NotificationManager.error('Please login')
        dispatch({ type: 'LOGIN_REQUIRED' })
      } else {
        dispatch({ type: 'RESET_FORM' })
        NotificationManager.error(get(inqueryData, 'message', 'Please try again'))
      }
    } else if (get(inqueryData, 'code', false) == 401) {
      dispatch({ type: 'RESET_FORM' })
      NotificationManager.error('Please login')
      dispatch({ type: 'LOGIN_REQUIRED' })
    } else if (get(inqueryData, 'success', false)) {
      dispatch({ type: 'RESET_FORM' })
      setForm(true)
    }
  }, [inqueryData])


  useEffect(() => {
    const getWish = get(userData, 'wishlist', [])
    const wish = getWish.includes(get(props, 'data._id', false))
    setWishList(wish)
  }, [userData.wishlist])


  function setWish() {
    const wish = !wishList
    setTimeout(()=>{
    if (wish) {
      dispatch({ type: 'ADD_WISH', payload: { gigId: get(props, 'data._id', '') } })
    } else {
      dispatch({ type: 'REMOVE_WISH', payload: { gigId: get(props, 'data._id', '') } })
    }
    }, 500)
    setWishList(wish)
  }
  
  
  return (
    <div className="packing-service">
      <div className="heading align-items-start">
        <div className="d-flex">
                  <div className="service-image">
                    <img
                      src={get(props, 'user.profilePic.url', '/assets/images/profile-pic.png')}
                      alt="image"
                      //layout="responsive"
                      //width={90}
                      //height={90}
                    /> 
                  </div>
                  <div className="title-section align-top">
                    <h2>{get(props, 'gig.title', '')}</h2>
                    <h4 className="secondary"><Link href={`/sellerprofile?id=${get(props, 'gig.user.id', '')}`}>{get(props, 'user.handyman_application.companyName', '')}</Link></h4>{" "}
                  </div>
        </div>

        <div className="body d-flex flexwrap">
          <div className="image">
            <div className="image-area">
              <img
                src={get(props, 'gig.gallery[0].document.url', '')}
                alt="handyman1"
                layout="fill"
                //width={600}
                //height={550}
              />
            </div>
          </div>
          <div className="d-flex form">
            {formSubmit ?
              <><div className="d-flex flex-column justify-content-center flexwrap mt-5">Your details have been submitted, once the handyman confirms you will receive a notification in the Orders tab on the menu.</div></>
              :
              <div className="form p-5 form-full">
                <p className="mb-3 h5 font-weight-bold">
                  Fill This Form & Get A Free Price Quote
              </p>
                <form onSubmit={submitForm}>
                  {renderInputs()}             

                <div className="d-flex align-items-center justify-content-start mt-5">
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={formSubmit} onClick={submitForm}>Submit</button>
                  </div>
                  <div className="d-flex share">
                    <a className="" onClick={Share}>
                    <img
                        src='/assets/images/share.png'
                        alt="handyman1"
                        layout="responsive"
                        //width={600}
                        //height={550}
                      />
                      <span className="ml-2">Share</span>
                    </a>
                  </div>
                  <div className="d-flex share">
                    <a className="" onClick={Save}>
                    { saved ?
                      <img
                        src='/assets/images/saved.png'
                        alt="handyman1"
                        layout="responsive"
                        //width={600}
                        //height={550}
                      />
                      :
                      <img
                        src='/assets/images/save.png'
                        alt="handyman1"
                        layout="responsive"
                        //width={600}
                        //height={550}
                      />
                    }
                      <span className="ml-2">Save</span>
                    </a>
                  </div>


                </div>                 
              
              

                </form>
              </div>
            }
          </div>
        </div>

      </div>


      <div className="row about-services">
        <div className="col-lg-6 col-sm-12">
          <h3>About This Service</h3>
          <p>
            {get(props, 'gig.description', '')}
          </p>
          {/* <p>
              We aim at customer satisfaction and continual quality improvement. Therefore all our services are modified to suit client’s needs and requirements. 
            </p> */}
        </div>
        <div className="col-lg-6 col-sm-12">
          <h3>About The Seller</h3>
          <ul>
            <li>
              <h5>From :</h5>
              <h4>{get(props, 'user.handyman_application.location', '')}</h4>
            </li>
            <li>
              <h5>Member Since :</h5>
              <h4>{moment(get(props, 'user.handyman_application.createdAt', '')).format('MMM YYYY')}</h4>
            </li>
          </ul>
          <p>{get(props, 'user.handyman_application.description', '')}</p>
        </div>
      </div>

{/*
      <div className="rating-section p-5">
        <h3 className="text-center mb-5">Customer Reviews and Ratings</h3>
        <div className="row">
          <div className="col">
            <Reviews />
          </div>
          <div className="col">
            <Reviews />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Reviews />
          </div>
          <div className="col">
            <Reviews />
          </div>
        </div>
        <div className="mt-4">
          <Link href='/sellerprofile'><button className="btn btn-primary-rd">Read all 112+ Reviews</button></Link>
        </div>
      </div>

*/}
      <div className="more-services mt-5">
        <h1 className="mb-5 span-cursur">
          More Services by <Link href={`/sellerprofile?id=${get(props, 'gig.user.id', '')}`}><span className="name">{get(props, 'user.handyman_application.companyName', '')}</span></Link>
        </h1>
        <div className="row ">
          {moreService(get(props, 'user', ''))}
          {/* <div className="col-md-4">
            <ServiceCard />
          </div>
          <div className="col-md-4">
            <ServiceCard />
          </div> */}
        </div>
      </div>
    </div>
  );
}
