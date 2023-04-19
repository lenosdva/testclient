import { useEffect, useState } from "react"
import { get } from "lodash"
import {
  Layout,
  Footer,
  SearchBar,
  OurServices,
  HandymenPagination,
  ServiceCards,
} from "../component";
import { withRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { relativeTimeRounding } from "moment";
import ReactPaginate from 'react-paginate';

function renderService(movingOutData) {
  let type = movingOutData && movingOutData.length && movingOutData.filter(card => card.status == 'active').map((data, key) => (
    <div key={key} className="col-md-4 col-sm-6 col-xs-12">
      <ServiceCards data={data}  userInfo={""} />
    </div>
  ))
  return type;
  }

function renderServiceBudget(movingOutData, maxBudget) {
  let type = []  
  type = movingOutData && movingOutData.length && movingOutData.filter(card => (card.status == 'active' && card.minPrice <= maxBudget)).map((data, key) => (
    <div key={key} className="col-md-4 col-sm-6 col-xs-12">
      <ServiceCards data={data}  userInfo={""} />
    </div>
  ))
  return type;
  }


function getItems(movingOutData) {
  let type = []
  if(movingOutData.length) {
    type = movingOutData && movingOutData.length && movingOutData.filter(card => (card.status == 'active'));
  }  
  console.log("TTTTTTTTYYYYYYYYYYYYYPE: ", type)
  return type;
}

function getItemsBudget(movingOutData, maxBudget) {
  let type = []
  if(movingOutData.length) {
    type = movingOutData && movingOutData.length && movingOutData.filter(card => (card.status == 'active' && card.minPrice <= maxBudget));
  }
  return type;
}

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((data, key) => (
          <div key={key} className={(currentItems.length > 2)? "col-lg-4 col-md-4 col-sm-6 col-xs-12" : "col-lg-6 col-md-6 col-sm-6 col-xs-12"}>
            <ServiceCards data={data}  userInfo={""} />
          </div>
        ))}
    </>
  );
}


function PaginatedItems({ renderData }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  
  const [itemOffset, setItemOffset] = useState(0);
  console.log("renderData ==========>", renderData)
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  
  const currentItems = renderData.slice(itemOffset, endOffset);
  
  const pageCount = Math.ceil(renderData.length / itemsPerPage);
  

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % renderData.length;    
    setItemOffset(newOffset);
  };
  console.log()

  return (
    <>
      <div className="flex-column">
      <div className="d-flex flex-wrap trrr">
        <Items currentItems={currentItems} />
      </div>
      {(renderData.length > 6) &&
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          //marginPagesDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="paginactive"
          activeLinkClassName="pagactive"
          previousLinkClassName="previous"
          nextLinkClassName="previous"
        />
        </div>
      }
      </div>
    </>
  );
}



function Category(props) {
  const dispatch = useDispatch()
  const [category, setCategory] = useState('')
  const [budgetOpen, setBudgetOpen] = useState(false)
  const [cancellation, setCancellation] = useState(true)
  const [ok, setOk] = useState(false)
  const [maxBudget, setMaxBudget] = useState("")
  const [renderData, setRenderData] = useState([])
  const [code, setCode] = useState("0")
  const { searchByIdData, searchByIdLoading, movingOutLoading, movingOutData, gigLoading } = useSelector(state => ({
    searchByIdData: state.services.searchByIdData,
    searchByIdLoading: state.services.searchByIdLoading,
    movingOutData: state.services.movingOutData,
    movingOutLoading: state.services.movingOutLoading,
    gigLoading: state.handyman.gigLoading
  }));


  const active = "btn btn-primary d-flex justify-content-center align-items-center"
  const passive = "btn in-active d-flex justify-content-center align-items-center"

  const cancelAll = () => {
    if(code == '0' || code == null || code == undefined || code == '') {
      setRenderData(getItems(get(movingOutData, 'gigs', [])))
    } else {
      setRenderData(getItems(get(movingOutData, 'gigs', []).filter(card => (card.pincode == code))))
    }
    
    setCancellation(true)
    setBudgetOpen(false)
    setOk(false)
      
  }

  const getBudgetOpen = () => {
    setCancellation(false)
    setBudgetOpen(!budgetOpen)
    setOk(!ok)
      
  }

  const okClick = () => {

    if(code == '0' || code == null || code == undefined || code == '') {
      setRenderData(getItemsBudget(get(movingOutData, 'gigs', []), maxBudget))
    } else {
      setRenderData(getItemsBudget(get(movingOutData, 'gigs', []).filter(card => (card.pincode == code)), maxBudget))
    }
    //setBudgetOpen(!budgetOpen)
    //setOk(false)
  }  

  useEffect(() => {
    const serId = get(props, 'router.query.id', '')
    const category = get(props, 'router.query.name', '')
    const code = get(props, 'router.query.code', "0")
    setCategory(category)
    setCode(code)
    const data ={}
    if(serId){
      data.serId = serId
    }else if(category){
      data.keywords = category
    }
    dispatch({ type: 'SEARCH_BY_ID', payload: data })    
  }, [props.router.query])

  useEffect(() => {
    if(code == '0' || code == null || code == undefined || code == '') {
      setRenderData(getItems(get(movingOutData, 'gigs', [])))
    } else {
      setRenderData(getItems(get(movingOutData, 'gigs', []).filter(card => (card.pincode == code))))
    }
  }, [movingOutLoading])

  
  

  console.log("movingOutData: ", renderData)
  return (
      <Layout setWebSoket={props.setWebSoket}>
        {(searchByIdLoading || movingOutLoading || gigLoading) &&
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      }
        <div className="category">
          <div className="container">
            <div className="home-section-padding text-center">
              <SearchBar category={category} />
            </div>
            <div className="home-section-padding">
              <div className="handyman-pagination">
                  <h4>{get(movingOutData, 'gigs', []) && get(movingOutData, 'gigs', []).length} Handymen found in your area</h4>
                  <h1>Handymen Near You</h1>
      
                  <div className="row">
                    <button className={cancellation? active: passive} onClick={cancelAll}>
                      <h4 className="add-icon mr-2">+</h4>
                      <h4>Cancellation</h4>
                    </button>
                    <button className={budgetOpen? active:passive} onClick={getBudgetOpen}>
                      <h4 className="add-icon mr-2">+</h4>
                      <h4>Budget</h4>
                    </button>
                    {/*<button className={passive}>
                      <h4 className="add-icon mr-2">+</h4>
                      <h4>Language</h4>
                    </button>
                    */}
                  </div>
                  {budgetOpen &&
                  <div className="row">
                    <div className="d-flex setbudget">
                          <input
                              value={maxBudget}
                              onChange={(e) => setMaxBudget(Number(e.target.value))}
                              type="text"
                              name="maxBudget"
                              className="input"
                              placeholder="Max budget"
                              //disabled={ editButton? "disabled" : "" }
                            // onBlur={submitData}
                            />
                            {ok && 
                            <button className={budgetOpen? active:passive} onClick={okClick}>
                            <h4>OK</h4>                            
                            </button>
                            }
                    </div>
                  </div>
                  }
                  <div className="row">
                    <div className="col-md-12">
                      <h5>{category}</h5>
                    </div>
                  </div>
              </div>
            </div>
            <div className="home-section-padding">
              <div className="row">
              <PaginatedItems renderData={renderData} />            
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