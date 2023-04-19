import { useEffect, useState } from "react"
import { Layout, Footer, SearchBar, ProfileGigsWithReview } from "../component";
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'next/router'
import { get } from "lodash"

export default withRouter(function Category(props) {
  const dispatch = useDispatch()
  const { gigLoading, gig, gigs, gigsLoading, userInfoLoading, userInfo, userGigs, userGigsLoading } = useSelector(state => ({
    gigLoading: state.handyman.gigLoading,
    gigsLoading:state.handyman.gigsLoading,
    gig: state.handyman.gig,
    gigs: state.handyman.gigs,
    userInfoLoading: state.user.userInfoLoading,
    userInfo: state.user.userInfo,
    userGigsLoading:state.handyman.userGigsLoading,
    userGigs: state.handyman.userGigs,
  }));

  const [userID, setUserID] = useState(get(props, 'router.query.id', '')) 

  useEffect(() => {
    setUserID(get(props, 'router.query.id', ''))
    console.log("ROUTER: ", userID)
    const data = {}
    const data1 = {}
    data.id = userID
    data1.id = userID  
    dispatch({ type: 'GET_USER_GIGS', payload: data })
    dispatch({ type: 'GET_USER_INFO', payload: data1 })
    // dispatch({ type: 'MORE_SERVICE', payload: { userId: serId } })
  }, [props.router.query])

  useEffect(() => {
    if (get(gig, 'sellerPersonalInfo._id', false)) {
      const userId = get(gig, 'sellerPersonalInfo._id', '')
      dispatch({ type: 'MORE_SERVICE', payload: { userId } })
    }
  }, [get(gig, 'sellerPersonalInfo._id', '')])

  return (
    <Layout setWebSoket={props.setWebSoket}>
      { (userInfoLoading || gigsLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }
      <div className="products">
        <div className="container">
          <div className="home-section-padding">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <ProfileGigsWithReview moreServiceData={userGigs} user={userInfo} />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
})
