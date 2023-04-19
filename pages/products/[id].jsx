import { Layout, Footer, SearchBar, PackingService } from "../../component";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { get } from "lodash"
export default function Products(props) {
  const dispatch = useDispatch()
  const router = useRouter();
  const { gigLoading, gigData, gigsLoading, gigs, user, handyman, userInfoLoading, userInfo } = useSelector(state => ({
    gigLoading: state.handyman.gigLoading,
    gigData: state.handyman.gig,
    gigsLoading: state.handyman.gigsLoading,
    gigs: state.handyman.gigs,
    handymanLoading: state.handyman.handymanLoading,
    handyman: state.handyman.hyndyman,
    userLoading: state.user.userLoading,
    user: state.user.user,
    userInfoLoading: state.user.userInfoLoading,
    userInfo: state.user.userInfo,
  }));
  useEffect(() => {
    const gigId = get(router, 'query.id', '')    
    if(gigId != '') {
      const data = {}      
      data.id = gigId
      dispatch({ type: 'GET_GIG', payload: data })      
    }
  }, [router.query])

  useEffect(() => {
    const gigId = get(router, 'query.id', '')    
    if(gigId != '') {      
      const data1 = {}
      data1.id = get(gigData, 'user.id', '')
      console.log("USER ID: ", data1)
      dispatch({ type: 'GET_USER_INFO', payload: data1 })
    }
  }, [gigLoading])


  return (
    <Layout setWebSoket={props.setWebSoket}>
    {(userInfoLoading || gigLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }
      <div className="products">
        <div className="container">
          <div className="home-section-padding text-center">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <PackingService 
              gig={gigData} 
              user={userInfo}
              handyman={handyman}
            />
          </div>
        </div>
        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
}



