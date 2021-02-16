import { Layout, Footer, SearchBar, PackingService } from "../component";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'next/router'
import { get } from "lodash"
export default withRouter (function Category(props) {
  const dispatch = useDispatch()
  const { detailLoading, serviceDetails } = useSelector(state => ({
    detailLoading: state.services.detailLoading,
    serviceDetails: state.services.serviceDetails,
  }));
  useEffect(()=>{
    const serId = get(props, 'router.query.id', '')
    dispatch({ type: 'SERVICE_DETAILS', payload: serId })
  },[])

  return (
    <Layout>
      <div className="products">
        <div className="container">
          <div className="home-section-padding text-center">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <PackingService data={serviceDetails}/>
          </div>
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
})
