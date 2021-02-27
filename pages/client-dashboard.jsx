import { useEffect } from "react"
import { Layout, Footer, ClientDashboard, ClientMyOrders, FAQ } from "../component";
import { useDispatch, useSelector } from 'react-redux'

export default function Category() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => ({
    userData: state.user.user,
  }));

  useEffect(()=>{
    dispatch({type: "GET_ORDER"})
  }, [])

  return (
    <Layout>
      <div className="products">
        <div className="about-section-padding">
          <ClientDashboard />
        </div>
        <div className="section-padding">
          <ClientMyOrders />
        </div>
        <div className="about-section-padding">
          <FAQ />
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
