import { useEffect } from "react"
import { Layout, Footer, ClientDashboard, ClientMyOrders, FAQ, AddGig } from "../component";
import { useDispatch, useSelector } from 'react-redux'


export default function AddNewGig(props) {
  const dispatch = useDispatch()
  const { userLoading, user, gigs, uploadDocLoading } = useSelector(state => ({    
    userLoading: state.user.userLoading,
    user: state.user.user,
    gigs: state.handyman.gigs,
    uploadDocLoading: state.handyman.uploadDocLoading,
  }));
  const { handymanLoading, handyman } = useSelector(state => ({
    handymanLoading: state.handyman.handymanLoading,
    handyman: state.handyman.hyndyman
  }));

  const { services } = useSelector(state => ({
    services: state.services.searchByIdData
  }));


  useEffect(() => {
    dispatch({ type: 'GET_SERVICE' })
    dispatch({ type: 'GET_GIGS' })
  }, [])
  

 
  
  return (
    
      <Layout setWebSoket={props.setWebSoket}> 
      {(uploadDocLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }     
        <div className="products">
          <div className="about-section-padding">
            <AddGig user={user} handyman={handyman} services={services} gigs={gigs} />
          </div>
          {/*<div className="section-padding">
            <ClientMyOrders orders={orders}/>
          </div>
          */}
          
          <Footer ws={props.ws}/>
        </div>

      </Layout>

          
  );
}
