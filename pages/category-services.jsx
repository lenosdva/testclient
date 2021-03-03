import { useEffect } from "react"
import {
  Layout,
  Footer,
  SearchBar,
  OurServices,
  HandymenPagination,
  ServiceCard,
} from "../component";
import { useDispatch, useSelector } from 'react-redux'

export default function Category() {

  const dispatch = useDispatch()
  const { searchByIdData, searchByIdLoading } = useSelector(state => ({
    searchByIdData: state.services.searchByIdData,
    searchByIdLoading: state.services.searchByIdLoading,
  }));

  useEffect(() => {
    dispatch({ type: 'GET_SERVICE' })
  }, [])
  console.log("searchByIdLoading========>", searchByIdLoading)
  return (
    (searchByIdLoading) ?
      <div className="loading-wrapper">
        <div className="loader"></div>
      </div>
      :
    <Layout>
      <div className="category">
        <div className="container">
          <div className="home-section-padding text-center">
            <SearchBar />
          </div>
          <div className="home-section-padding">
            <OurServices data={searchByIdData}/>
          </div>
        </div>
        <div className="home-section-padding">
          <Footer />
        </div>
      </div>
    </Layout>
  );
}
