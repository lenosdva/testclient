import { Layout, Footer, SearchBar, PackingService } from "../component";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'next/router'
import { get } from "lodash"
export default withRouter(function Category(props) {
  const dispatch = useDispatch()
  const { detailLoading, serviceDetails, moreServiceData, moreServiceLoading } = useSelector(state => ({
    moreServiceLoading: state.services.moreServiceLoading,
    moreServiceData: state.services.moreServiceData,
    serviceDetails: state.services.serviceDetails,
    detailLoading: state.services.detailLoading,
  }));
  useEffect(() => {
    const serId = get(props, 'router.query.id', '')
    dispatch({ type: 'SERVICE_DETAILS', payload: serId })
  }, [props.router.query])
  useEffect(() => {
    console.log("serviceDetails", serviceDetails)
    if (get(serviceDetails, 'userId', false)) {
      const userId = get(serviceDetails, 'userId', '')
      dispatch({ type: 'MORE_SERVICE', payload: { userId } })
    }
  }, [serviceDetails])
  return (
    (detailLoading || moreServiceLoading) ?
      <div className="loading-wrapper">
        <div className="loader"></div>
      </div>
      :
      <Layout>
        <div className="products">
          <div className="container">
            <div className="home-section-padding text-center">
              <SearchBar />
            </div>
            <div className="home-section-padding">
              <PackingService moreService={moreServiceData} data={serviceDetails} />
            </div>
          </div>
          <div className="home-section-padding">
            <Footer />
          </div>
        </div>
      </Layout>
  );
})
