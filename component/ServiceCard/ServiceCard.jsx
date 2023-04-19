import Image from "next/image";
import Link from "next/link"
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
export default function ServiceCard(props) {
  const dispatch = useDispatch();
  console.log("props11========>", props)
  const [username, setUsername] = useState(get(props, 'userInfo.handyman_application.companyName', "", ""))
  const { userInfo, userInfoLoading, userData, userDataLoading, services, servicesLoading, users, usersLoading } = useSelector(state => ({
    userInfo: state.user.userInfo,
    userInfoLoading: state.user.userInfoLoading,
    userData: state.user.user,
    userDataLoading: state.user.userLoading,
    services: state.handyman.services,
    servicesLoading: state.handyman.servicesLoading,
    users: state.user.users,
    usersLoading: state.user.usersLoading,
  }));
const [saved1, setSaved1] = useState(get(userData, 'savedgigs', []).includes(get(props, 'data.id', "1")))

console.log("userInfo: ", userInfo)
  useEffect(() => {
    setUsername(get(userInfo, 'handyman_application.companyName', "", ""))
  }, [userInfoLoading])

  useEffect(() => {
    //const id = get(props, 'data.user', '')  
    //const data = {}    
    //data.id = id
    if(get(props, 'userInfo', '') == "") {
      //dispatch({ type: 'GET_USER_INFO', payload: data })
      dispatch({ type: 'GET_SERVICES' })
      dispatch({ type: 'GET_USERS' })
    }
  }, [])

  useEffect(() => {
    setSaved1(get(userData, 'savedgigs', []).includes(get(props, 'data.id', "1")))
  }, [userDataLoading])

  useEffect(() => {
    for(let i = 0; i < services.length; i++) {
      if(get(services[i], "id", "0") == get(props, 'data.id', "1")) {
        for(let j = 0; j < users.length; j++) {
          if(get(services[i], "user.id", "0") == get(users[j], 'id', "1")) {
            setUsername(get(users[j], 'handyman_application.companyName', ""))
            break
          }
        }
        break
      }
    }
    setSaved1(get(userData, 'savedgigs', []).includes(get(props, 'data.id', "1")))
  }, [servicesLoading, usersLoading])

  function Save(e) {
    e.preventDefault()
    const id = get(props, 'data.id', "")
    const userId = get(userData, 'id', "")
    const userSavedGigs = get(userData, 'savedgigs', [])
    if(userSavedGigs.includes(id)) {
      setSaved1(false)
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
      }
    } else {
      if(id != "" && userId != "") {
        userSavedGigs.push(id)
        const data = {}
        data.savedgigs = userSavedGigs
        data.id = userId
        dispatch({ type: 'UPDATE_USER', payload: data })  
        setSaved1(true)    
      }
    }    
  }
  
  return (
    <Link href={`/products/${get(props, 'data._id', '')}`}>
    <div className="service-card">
      <div className="image-area">
        <img
          src={get(props, 'data.gallery[0].document.url', "/assets/images/spotlight1.jpg")}
          alt="handyman1"
          layout="responsive"
          //width="90%"
          //height="90%"
        />
      </div>
      <div className="details">
        <h5 className="mb0">
          {get(props, 'data.title', '')} {/*| {get(props, 'data.rating', '5')} */}
        </h5>
        <div className="review">{/*(110 Reviews)*/}</div>
        <h5 className="name">
          <span>Handyman: </span>{username}
        </h5>
        <h5>
          <span>Price Range: </span> €{get(props, 'data.minPrice', '')}{get(props, 'data.maxPrice', '') == '' ?'':'- €'}{get(props, 'data.maxPrice', '')}
        </h5>
      </div>
      <div className="d-flex booking-section">
        <button className="btn btn-primary">Book Service</button>
        <div className="share">
                    <a className="" onClick={Save}>
                    { saved1 ?
                      <img
                        src='/assets/images/iconheartsaved.png'
                        alt="handyman1"
                        layout="responsive"
                        //width={600}
                        //height={550}
                      />
                      :
                      <img
                        src='/assets/images/iconheart.png'
                        alt="handyman1"
                        layout="responsive"
                        //width={600}
                        //height={550}
                      />
                    }
                    </a>
                  </div>
      </div>
    </div>
    </Link>
  );
}
