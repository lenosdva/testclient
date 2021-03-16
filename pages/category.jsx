import { useEffect, useState } from "react"
import { get } from "lodash"
import {
  Layout,
  Footer,
  SearchBar,
  OurServices,
  HandymenPagination,
  ServiceCard,
} from "../component";
import { withRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

const renderService = (movingOutData) => (
  movingOutData.map((data, key) => (
    <div key={key} className="col-md-4">
      <ServiceCard data={data} />
    </div>
  ))
)


function Category(props) {
  const dispatch = useDispatch()
  const [category, setCategory] = useState('')
  const { searchByIdData, searchByIdLoading, movingOutLoading, movingOutData } = useSelector(state => ({
    searchByIdData: state.services.searchByIdData,
    searchByIdLoading: state.services.searchByIdLoading,
    movingOutData: state.services.movingOutData,
    movingOutLoading: state.services.movingOutLoading,
  }));
  useEffect(() => {
    const serId = get(props, 'router.query.id', '')
    const category = get(props, 'router.query.name', '')
    setCategory(category)
    dispatch({ type: 'SEARCH_BY_ID', payload: { serId } })
  }, [props.router.query])
  console.log(searchByIdLoading, movingOutLoading)
  return (
    (searchByIdLoading || movingOutLoading) ?
      <div className="loading-wrapper">
        <div className="loader"></div>
      </div>
      :
      <Layout setWebSoket={props.setWebSoket}>
        <div className="category">
          <div className="container">
            <div className="home-section-padding text-center">
              <SearchBar category={category} />
            </div>
            <div className="home-section-padding">
              <HandymenPagination />
            </div>
            <div className="home-section-padding">
              <div className="row">
                {renderService(movingOutData)}
                {/* <div className="col-md-4">
                <ServiceCard />
              </div>
              <div className="col-md-4">
                <ServiceCard />
              </div>
              <div className="col-md-4">
                <ServiceCard />
              </div> */}
              </div>
            </div>
            <div className="home-section-padding">
              <OurServices data={searchByIdData} />
            </div>
          </div>
          <div className="home-section-padding">
            <Footer ws={props.ws}/>
          </div>
        </div>
      </Layout>
  );
}
export default withRouter(Category)