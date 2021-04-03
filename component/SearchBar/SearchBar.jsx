import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Image from "next/image";
import _, { get } from "lodash"
import PostalCode from "../../constent/postal"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useRouter } from 'next/router'

export default function SearchBar(props) {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [filterCode, setFilterCode] = useState([])
  const [code, setCode] = useState('')
  const [id, setId] = useState('')
  const [showAddress, setAddress] = useState('hide')
  const [showService, setService] = useState('hide')
  const dispatch = useDispatch()
  const { searchData, searchByIdLoading, searchByIdData } = useSelector(state => ({
    searchData: state.services.searchData,
    searchByIdLoading: state.services.searchByIdLoading,
    searchByIdData: state.services.searchByIdData,
  }));

  useEffect(() => {
    const category = get(props, 'category', '')
    setKeyword(category)
  }, [props.category])

  useEffect(() => {
    if (get(searchData, 'error', false)) {
      if (showService !== 'hide') {
        setService('hide')
      }
    } else {
      if (searchData.length) {
        setService('show')
      } else {
        setService('hide')
      }
    }
  }, [searchData])

  useEffect(() => {
    console.log("searchByIdData", searchByIdData)
  }, [searchByIdData])



  function onSearch(e) {
    setId('')
    setKeyword(e.target.value)
    dispatch({ type: 'SEARCH_REQUEST', payload: e.target.value })
  }

  function onBlurInput() {
    // setKeyword('')
    // setCode('')
    setTimeout(() => {
      setFilterCode([])
      setAddress('hide')
      setService('hide')
    }, 500)
    // dispatch({ type: 'SEARCH_REQUEST', payload: '' })
  }

  function onSearchService() {
    if (id === '') {
      NotificationManager.error('Please Pick a Service')
    } else {
      // dispatch({ type: 'SEARCH_BY_ID', payload: id })
      router.push({ pathname: '/category', query: { id, code, name: keyword } })
    }
  }

  function onSelectSearch(value, id) {
    dispatch({ type: 'RESET_SERVICE' })
    setService('hide')
    setKeyword(value)
    setId(id)
  }

  const renderSearchResult = () => (
    searchData.length && searchData.map((data, key) => (
      <li key={key} onClick={() => onSelectSearch(get(data, 'name', ''), get(data, '_id', ''))}>{get(data, 'name', '')}</li>
    ))
  )

  function onSearchPostalCode(e) {
    setCode(e.target.value)
    const result = _.filter(PostalCode, _.flow(
      _.identity,
      _.values,
      _.join,
      _.toLower,
      _.partialRight(_.includes, e.target.value)
    ));
    setFilterCode([...result])
    if (!result.length) {
      setAddress('show')
    } else {
      if (e.target.value === '') {
        setFilterCode([])
        setAddress('hide')
      } else {
        setAddress('show')
      }
    }
  }

  function onSelctCode(data) {
    setCode(data.code)
    setFilterCode([])
    setAddress('hide')
  }

  const renderPostalCode = () => (
    filterCode.length && filterCode.map((data, key) => (

      key < 4 && <li key={key} onClick={() => onSelctCode(data)}>
        <div className="search-keywords-img">
          <Image
            src="/assets/images/search-img.png"
            alt="search"
            width={50}
            height={50}
          />
        </div>
        <div className="search-keywords-txt">
          <h5>{data.code}</h5>
          <h6>{data.city}, Germany</h6>
        </div>
      </li>
    ))
  )



  return (
    <div className="searchbar d-flex justify-content-between align-items-center">
      <div className="search-area pl-4 d-flex justify-content-around align-items-center">
        <div className="postal-code mr-2">
          <h5 className="mb-0">Postal Code</h5>
          <input type="search" value={code} onChange={onSearchPostalCode} onBlur={onBlurInput} className="input-search" placeholder="Munich, Germany 80331" />
          {filterCode.length ?
            <div className={showAddress === 'hide' ? "searching-keywords search-lg" : "searching-keywords search-lg searching-keywords-show"}>
              <ul>
                {renderPostalCode()}
              </ul>
            </div>
            :<></>
          }
          {/* <h5 className="postal-value">Munich, Germany 80331</h5> */}
        </div>
        <div className="vertical-bar mr-2"></div>
        <div className="service ml-4">
          <h5 className="mb-0">Pick a Service</h5>
          {/* <h5 className="service-value">What can we assist you with ?</h5> */}
          <input type="search" onChange={onSearch} value={keyword} onBlur={() => onBlurInput()} className="input-search input-search-lg" placeholder="What can we assist you with?" />
          <div className={showService === 'hide' ? "searching-keywords search-xl" : "searching-keywords search-xl searching-keywords-show"}>
            <ul>
              {renderSearchResult()}
            </ul>
          </div>
        </div>
      </div>
      <div className="icon-area">
        <button onClick={onSearchService} className="btn btn-primary">
          <span className="hidemobile iconsearch">
            <Image
              src="/assets/svg/ic-search.svg"
              alt="search"
              width={26}
              height={26}
            />
          </span>
          <span className="showmobile">Search</span>
        </button>
      </div>
      {/* <NotificationContainer/> */}
    </div>
  );
}
