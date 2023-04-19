import { useEffect } from "react"
import { Layout, Footer, MyServices, ClientMyOrders, FAQ } from "../component";
import { useDispatch, useSelector } from 'react-redux'


export default function Services(props) {
  const dispatch = useDispatch()
  const { userLoading, user, updateGigLoading, deleteGigLoading, gigs } = useSelector(state => ({    
    userLoading: state.user.userLoading,
    user: state.user.user,
    updateGigLoading: state.handyman.updateGigLoading,
    deleteGigLoading: state.handyman.deleteGigLoading,
    gigs: state.handyman.gigs
  }));
  const { handymanLoading, handyman } = useSelector(state => ({
    handymanLoading: state.handyman.handymanLoading,
    handyman: state.handyman.hyndyman
  }));

  useEffect(() => {
    dispatch({ type: 'GET_GIGS' })
  }, [])

  useEffect(() => {
    dispatch({ type: 'GET_GIGS' })
  }, [updateGigLoading, deleteGigLoading])

  
  return (
    
      <Layout setWebSoket={props.setWebSoket}>      
        <div className="products">
          <div className="about-section-padding">
            <MyServices gigs={gigs} />
          </div>
          {/*<div className="section-padding">
            <ClientMyOrders orders={orders}/>
          </div>
          */}
          <div className="about-section-padding-dashboard">
            <FAQ />
          </div>
          <Footer ws={props.ws}/>
        </div>
      
  
      
      </Layout>

          
  );
}
