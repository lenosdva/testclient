import { useEffect } from "react"
import { Layout, Footer, ClientDashboard, ClientMyOrders, FAQ } from "../component";
import { useDispatch, useSelector } from 'react-redux'

export default function Category() {
  const dispatch = useDispatch()
  const { userData, orderLoading, userLoading, orders } = useSelector(state => ({
    userData: state.user.user,
    orderLoading: state.user.orderLoading,
    orders: state.user.orders,
    userLoading: state.user.userLoading,
  }));

  useEffect(() => {
    dispatch({ type: "GET_ORDER" })
  }, [])
  return (
    (orderLoading) ?
      <div className="loading-wrapper">
        <div className="loader"></div>
      </div>
      :
      <Layout>
        <div className="products">
          <div className="about-section-padding">
            <ClientDashboard />
          </div>
          <div className="section-padding">
            <ClientMyOrders orders={orders}/>
          </div>
          <div className="about-section-padding">
            <FAQ />
          </div>
          <Footer />
        </div>
      </Layout>
  );
}
